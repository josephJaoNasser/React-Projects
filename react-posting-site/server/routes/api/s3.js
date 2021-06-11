require('dotenv/config')
const streamifier = require('streamifier');
const S3 = require('aws-sdk/clients/s3')

const bucketRegion = process.env.AWS_BUCKET_REGION
const awsId = process.env.AWS_ID
const awsSecret = process.env.AWS_SECRET

const s3 = new S3({
  accessKeyId: awsId,
  secretAccessKey: awsSecret,
  region: bucketRegion
})

// upload
const uploadFiles = async (files, bucket) => {
  const params =[]

  files.forEach(file => {
    const fileStream = streamifier.createReadStream(file.buffer)
    const uploadParams = {
      Bucket: bucket,
      Body: fileStream,
      Key: file.filename
    }

    params.push(uploadParams)
  })  

  const res = await Promise.all(
    params.map(param => s3.upload(param).promise())
  ).catch(err=> {
    if(err) throw err
  })

  return res
}

// get images
const getFile = async (fileKey, bucket) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucket
  }
  
  const res = await s3.getObject(downloadParams).createReadStream()
  return res
}


//delete multiple files
const deleteFiles = async(fileKeys, bucket) => {
  if(!Array.isArray(fileKeys)){
    fileKeys = [fileKeys]
  }

  const objects = fileKeys.map(key => (
    [{ Key: key },
    { Key: key.replace(/(\.[\w\d_-]+)$/i, '_tiny$1')},
    { Key: key.replace(/(\.[\w\d_-]+)$/i, '_small$1')},
    { Key: key.replace(/(\.[\w\d_-]+)$/i, '_medium$1')},
    { Key: key.replace(/(\.[\w\d_-]+)$/i, '_large$1')}]
  ))

  const deleteParams ={ 
    Bucket: bucket,
    Delete: {
      Objects: objects.flat(),
      Quiet: false
    }
  }
  const res = await s3.deleteObjects(deleteParams)
              .promise().catch(err=> {if(err) throw err})

  return res
}

exports.uploadFiles = uploadFiles
exports.getFile = getFile
exports.deleteFiles = deleteFiles