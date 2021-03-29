const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { validateUser } = require('./validateUser')
const config = require('config')
const jwt = require('jsonwebtoken')

//user model
const User = require('../../models/User')

// @route GET api/users
// @desc get all users
// @access public
// router.get('/', async(req, res)=> {
//   User.find()
//     .sort({ date: -1 })
//     .then(users => res.json(users))
// })

// @route POST api/users
// @desc create a user
// @access public
router.post('/register', async(req, res)=> {

  const { 
    username, 
    displayName, 
    password, 
    email, 
    filename, 
    bio 
  } = req.body
  
  const validationStatus = await validateUser(req.body)

  if(!validationStatus?.success){
    return res.status(400).json(validationStatus)
  }

  const newUser = new User({
    uname: username,
    dname: displayName,
    pwd: password,
    email: email,
    profile_image: filename,
    bio: bio, 
  })

  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
      if(err) throw err
      newUser.pwd = hash
      newUser.save().catch(err=>{
        if(err) throw err
        return res.status(400).json({
          msg: "Something went wrong!",
          error: err
        })
      }).then(user => {

        jwt.sign(
          { id: user._id },
          config.get('jwtSecret'),
          (err, token) =>{
            if(err) throw err
            res.status(201).json({
              token,
              user:{
                username: user.uname,
                displayName: user.dname,
                email: user.email
              }
            })
          }
        )
      })    
    })
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