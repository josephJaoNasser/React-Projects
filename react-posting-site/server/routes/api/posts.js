require('dotenv/config')
const auth = require('../../middleware/auth')
const express = require('express')
const multer = require('multer');
const { uploadFiles, getFile, deleteFiles } = require('./s3')
const crypto = require('crypto')
const router = express.Router()
const path = require('path')
const imageCompressor = require('./image-compressor')
const imageCompressorV2 = require('./image-compressor_v2')

//post model
const Post = require('../../models/Post');

//aws bucket
const postMediaBucket = process.env.AWS_POST_MEDIA_BUCKET

//multer storage
const memoryStorage = new multer.memoryStorage()
const uploadToMemory = multer({storage: memoryStorage}).array('post-media',4)

// @route GET api/posts
// @desc get all posts
// @access public
router.get('/', async(req, res)=> {  
  const username = req.query.user

  Post.find(username?.length ? {"user.uname": username} : {})
    .sort({ createdAt: -1 })
    .then(posts => res.json(posts))
})

// @route GET api/posts/:postId/media/:mediaKey
// @desc get all posts
// @access public
router.get('/:postId/media/:mediaKey', async(req, res)=> {  
  let readStream;
  const postId = req.params.postId
  const mediaKey = req.params.mediaKey

  if(postId.length != 24){
    return res.status(404).json({
        msg: 'User not found!'
    })
  }

  const post = await Post.findOne({_id: postId}).select('-pwd')  
  if(!post){
    return res.status(404).json({
      msg: 'User not found!'
    })
  }

  switch(req.query.size){
    case 'original':
      readStream = await getFile(`${mediaKey}`, postMediaBucket)
      readStream.on('error', (err)=> {
        return res.status(err.statusCode).json({
          msg: err.code,
          errorInfo: err
        })
      })
      break;

    case 'tiny':
      readStream = await getFile(`${mediaKey.replace(/(\.[\w\d_-]+)$/i, '_tiny$1')}`, postMediaBucket)
      readStream.on('error', (err)=> {
        return res.status(err.statusCode).json({
          msg: err.code,
          errorInfo: err
        })
      })
      break;

    case 'small':
      readStream = await getFile(`${mediaKey.replace(/(\.[\w\d_-]+)$/i, '_small$1')}`, postMediaBucket)
      readStream.on('error', (err)=> {
        return res.status(err.statusCode).json({
          msg: err.code,
          errorInfo: err
        })
      })
      break;

    case 'medium':
      readStream = await getFile(`${mediaKey.replace(/(\.[\w\d_-]+)$/i, '_medium$1')}`, postMediaBucket)
      readStream.on('error', (err)=> {
        return res.status(err.statusCode).json({
          msg: err.code,
          errorInfo: err
        })
      })
      break;

    case 'large':
      readStream = await getFile(`${mediaKey.replace(/(\.[\w\d_-]+)$/i, '_large$1')}`, postMediaBucket)
      readStream.on('error', (err)=> {
        return res.status(err.statusCode).json({
          msg: err.code,
          errorInfo: err
        })
      })
      break;

    default:
      readStream = await getFile(`${mediaKey}`, postMediaBucket)
      readStream.on('error', (err)=> {
        return res.status(err.statusCode).json({
          msg: err.code,
          errorInfo: err
        })
      })
      break;
  }

  readStream.pipe(res)
})


// @function uploadPostMedia()
// @desc uploads a profile image for a user
// @access public
const uploadPostMedia = (files) => { 
  return new Promise((resolve, reject)=> {
    imageCompressorV2.compressMultiple(files, 1, 4).then(images => {
      try{        
        uploadFiles([...images,...files], postMediaBucket).then(res => resolve(res))        
      }catch(err){
        return reject(err)
      }
    }).catch(err => reject(err))   
  })
  
}

// @route POST api/posts
// @desc create a post
// @access private
router.post('/', auth, uploadToMemory, async(req, res)=> {
  
  const parsedBody = JSON.parse(req.body.postData)

  let uploadResult
  let mediaKeys =[]

  if(req.files){
    //create a filename for each uploaded file
    mediaKeys = req.files.map(file => {
      file.filename = crypto.randomBytes(16).toString('hex') + path.extname(file.originalname)
      return file.filename
    })   
  
    //upload the files
    uploadResult = await uploadPostMedia(req.files)
    .catch(err => {
        return res.status(404).json({
        msg: 'An error has occurred while uploading an image/s',
        error: err
      })
    })
  }

  User.findById(req.user.id)
    .select('-pwd -joinedOn')
    .then(user => {
      const newPost = new Post({
        text: parsedBody.text,
        user: user,
        media: mediaKeys
      })

      newPost.save().then(post => res.status(201).json({post}))
    }).catch(err => {
      return res.status(400).json({
        msg: 'Something went wrong while creating the post',
        error: err
      })
    })
  

  return res.status(200)

})

// @route PUT api/posts
// @desc edit a post
// @access private
router.put('/:id', auth, async(req, res)=> {
  Post.findById(req.params.id)
    .then(post => {
      if(req.user.id != post.user._id){
        return res.status(401).json({
          msg: "You are not allowed to edit this post because you are not the author."
        })
      }
 
      post.text = req.body.changes
      post.updatedAt = Date.now()

      post.save().then(updatedPost => {
        return res.status(200).json({post: updatedPost})
      }) 
      
    }).catch(err => {
      return res.status(404).json({
        success: false,
        msg: "An error has occured while editing the post",
        error: err
      })
    })

  return res.status(200)
})


// @route DELETE api/posts
// @desc delete a post
// @access private
router.delete('/:id',auth,async(req, res)=> {
  
  Post.findById(req.params.id)
    .then(post => {
      if(req.user.id != post.user._id){
        return res.status(401).json({
          msg: "You are not allowed to delete this post because you are not the author."
        })
      }
      
      if(post.media.length){
        deleteFiles(post.media, postMediaBucket)
      }

      post.remove().then(()=> {
        return res.json({
          success:true, 
          msg:'Item successfully deleted'
        })
      })
    })
    .catch(err=>{
      return res.status(404).json({
        success: false,
        msg: "An error has occured while deleting the post",
        error: err
      })
    })
})


module.exports = router