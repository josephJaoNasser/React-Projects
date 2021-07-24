require('dotenv/config')
const router = require('express').Router()
const multer = require('multer')
const fs = require('fs')
const util = require('util')
const S3 = require('aws-sdk/clients/s3')
const s3Functions = require('../../s3')
const Video = require('../../models/Video')

const io = require('socket.io')(3002, {
  cors:{
    origin: ['http://localhost:3000']
  } 
})

//socket io so to keep track of upload progress and send back to the client
io.on('connection', socket => {
  console.log(`client with id of "${socket.id}" has connected to the server!`)
})

//multer memory storage
//const memoryStorage = new multer.memoryStorage()
const uploadToTempStorage = multer({dest: 'server/uploads'}).any()

//function to delete file once uploaded
const unlinkFile = util.promisify(fs.unlink)

//function to validate file
const isValidVideo = (files) => {
  console.log('Validating file...')
  if(files?.length){    
    
    for(let i = 0; i < files.length; i++){
      if(!files[i].mimetype.match(/video\/\w*/)){
        console.error(files[i].originalname,'is not a valid video file')        
        return false
      }
    }

    return true
  }

  return false  
}

//********************************************************** */
// ROUTE: POST /upload/video
// DESCRIPTION: upload files
//********************************************************* */
router.post('/video', uploadToTempStorage, async(req, res) => {
  
  const file = req.files[0]

  //validate if valid video type
  if(!isValidVideo(req.files)){
    return res.status(400).json({
      msg: 'Not a valid video file'
    })
  }  

  console.log('started upload...')
  // process.stdout.write(`\r${"░".repeat(20)} 0%`)

  //create upload params
  const uploadParams = 
    await s3Functions.createUploadParams(file)
    .catch(err => {
      console.error(err)
      return res.status(404).json({
        msg: 'Failed to create upload. Please try again...',
        error: {...err}
      })
    })


  if(req.body.clientSocketId){
    io.to(req.body.clientSocketId).emit(`upload-started`, uploadParams)
  }

  //upload the files
  const s3 = new S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_BUCKET_REGION
  })

  s3.uploadPart({
    ...uploadParams,
    PartNumber: 1,
    Body: fs.createReadStream(file.path),
  })
  .on('httpUploadProgress', progress => {
    if(!progress.total){
      progress.total = file.size
    }
      
    let progressPercent = (progress.loaded/progress.total)*100  
           
    if(req.body.clientSocketId){
      io.to(req.body.clientSocketId).emit(`upload-progressed`, {progress: progressPercent, Key: file.filename, loaded: progress.loaded})
    }
  })
  .promise()
  .then(data => {
    return s3.completeMultipartUpload({
      ...uploadParams,
      MultipartUpload: {
        Parts: [{
          ...data,
          PartNumber: 1
        }]
      }
    }).promise()
  })
  .then(async uploadResult => {
    req.files.forEach(async file => await unlinkFile(file.path))

    const newVideo = {
      ...JSON.parse(req.body.videoDetails),
      key: uploadResult.Key,
      url: uploadResult.Location
    }
    
    await Video.create(newVideo).catch(err => {
      console.error(err)
      return res.status(404).json({
        msg: 'Failed to store information to database',
        error: {...err}
      })
    })
      
    console.log('\nUpload successful!!')    
  
    return res.status(201).json({
      msg: 'Uploaded successfully!'    
    })
  })
  .catch(err => {
    req.files.forEach(async file => await unlinkFile(file.path))
    
    if(err.code == "NoSuchUpload"){
      return console.log(err.message)
    }

    return res.status(404).json({
      msg: 'An error has occured, please try again...',
      error: {
        code: err.code,
        message: err.message
      }
    })
  })
})



//********************************************************** */
// ROUTE: POST /upload/video/cancel
// DESCRIPTION: upload files
//********************************************************* */
router.post('/video/cancel', (req, res) => {
  const uploadParams = req.query

  if(!uploadParams){
    return res.status(404).json({
      msg: 'Nothing to abort!'
    })
  }
  
  s3Functions.abortUpload(uploadParams).then(data => {
    return res.status(200).json({
      msg: 'Upload aborted',
      result: data
    })
  }).catch(err => {
    return res.status(404).json({
      msg: 'Failed to abort upload!',
      error: err
    })
  })
})


module.exports = router