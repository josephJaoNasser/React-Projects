require('dotenv/config')
const express = require('express')
const multer = require('multer');
const { uploadFiles, getFile } = require('./s3')
const crypto = require('crypto')
const path = require('path')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { validateUser } = require('./validateUser')
const jwt = require('jsonwebtoken')
const imageCompressor = require('./image-compressor')

//user model
const User = require('../../models/User')

//profile image bucket
const profileImageBucket = process.env.AWS_PROFILE_IMAGE_BUCKET

//check if the user input is an e-mail or a username
const isEmail = (input) =>{
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;   
  if(emailRegex.test(input)){
    return true
  }
  return false
}

//multer upload to memory
const memoryStorage = new multer.memoryStorage()
const uploadToMemory = multer({storage:memoryStorage}).single('profile-image')


// @route GET api/users
// @desc get one user using either username or email
// @access public
router.get('/',(req, res)=> {
  User.findOne(
    req.query.username &&
      !isEmail(req.query.username) ? 
        { uname: req.query.username } :
      req.query.email ? 
        { email: req.query.email } : { email: req.query.username }  
  ).select('-pwd')
  .then( user => {
    if(user){
      return res.status(200).json({
        user: user
      })
    }
    else{
      return res.status(404).json({
        msg: 'User not found'
      })
    }
  })
})

// @route GET api/users/profile_image
// @desc get a user's profile image
// @access public
router.get('/:userId/profile-image/:mediaKey', async(req, res)=> {

  let readStream;
  const mediaKey = req.params.mediaKey
  const userId = req.params.userId
  
  if(userId.length != 24){
    return res.status(404).json({
        msg: 'User not found!'
    })
  }

  const user = await User.findOne({_id: userId}).select('-pwd')  
  if(!user){
    return res.status(404).json({
      msg: 'User not found!'
    })
  }
  else if(user.profile_image !== mediaKey){
    return res.status(404).json({
      msg: 'File not found!'
    })              
  }

  switch(req.query.size){
    case 'original':
      readStream = await getFile(`${mediaKey}`, profileImageBucket)
      readStream.on('error', (err)=> {
        return res.status(err.statusCode).json({
          msg: err.code,
          errorInfo: err
        })
      })
      break;

    case 'tiny':
      readStream = await getFile(`${mediaKey.replace(/(\.[\w\d_-]+)$/i, '_tiny$1')}`, profileImageBucket)
      readStream.on('error', (err)=> {
        return res.status(err.statusCode).json({
          msg: err.code,
          errorInfo: err
        })
      })
      break;

    case 'small':
      readStream = await getFile(`${mediaKey.replace(/(\.[\w\d_-]+)$/i, '_small$1')}`, profileImageBucket)
      readStream.on('error', (err)=> {
        return res.status(err.statusCode).json({
          msg: err.code,
          errorInfo: err
        })
      })
      break;

    case 'medium':
      readStream = await getFile(`${mediaKey.replace(/(\.[\w\d_-]+)$/i, '_medium$1')}`, profileImageBucket)
      readStream.on('error', (err)=> {
        return res.status(err.statusCode).json({
          msg: err.code,
          errorInfo: err
        })
      })
      break;

    case 'large':
      readStream = await getFile(`${mediaKey.replace(/(\.[\w\d_-]+)$/i, '_large$1')}`, profileImageBucket)
      readStream.on('error', (err)=> {
        return res.status(err.statusCode).json({
          msg: err.code,
          errorInfo: err
        })
      })
      break;

    default:
      readStream = await getFile(`${mediaKey}`, profileImageBucket)
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

// @function uploadProfileImage()
// @desc uploads a profile image for a user
// @access public
const uploadProfileImage = async (file) => {
  const images = await imageCompressor.compressSingle(file)

  if(images.error){
    return res.status(404).json({
      msg: 'An error has occurred while uploading an image',
      error: images.error
    })
  }
  
  const res = await uploadFiles(images, profileImageBucket)
  
  return res
}

// @route POST api/users
// @desc create a user
// @access public
router.post('/register', uploadToMemory, async(req, res)=> { 
  
  const parsedBody = JSON.parse(req.body.newUserData)  
  const { 
    username, 
    displayName, 
    password, 
    email, 
    bio 
  } = parsedBody
  
  const validationStatus = await validateUser(parsedBody)

  if(!validationStatus?.success){
    return res.status(400).json(validationStatus)
  }

  //create filename for profile image
  req.file.filename = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname)

  //declare new user
  const newUser = new User({
    uname: username,
    dname: displayName,
    pwd: password,
    email: email,
    profile_image: req.file.filename,
    profile_image_url: null,
    bio: bio, 
  })
  
  //hash the password
  const passwordSalt = await bcrypt.genSalt(10).catch(err=> { if(err) throw err })
  const hashedPassword = await bcrypt.hash(password, passwordSalt).catch(err=> { if(err) throw err })    

  //upload the profile image
  const uploadResult = await uploadProfileImage(req.file)
  const profileImageUrl = uploadResult.find(o => o.key === req.file.filename).Location

  //add the hashed password and image url
  newUser.pwd = hashedPassword
  newUser.profile_image_url = profileImageUrl

  //save to db
  const user = await  newUser.save().catch(err=>{
    if(err) throw err
    return res.status(400).json({
      msg: "Something went wrong!",
      error: err
    })
  })  

  //sign the token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)   
  
  //return!
  return res.status(201).json({
    token,
    user:{
      username: user.uname,
      displayName: user.dname,
      email: user.email
    }
  })

})
  

// @route DELETE api/users
// @desc delete a user
// @access public
// router.delete('/:id',async(req, res)=> {
//   User.findById(req.params.id)
//     .then(user => user.remove().then(()=> res.json({success:true, msg:'Item successfully deleted'})))
//     .catch(err=>{
//       res.status(404).json({
//         success: false,
//         msg: "Error when deleting item"
//       })
//     })
// })


module.exports = router