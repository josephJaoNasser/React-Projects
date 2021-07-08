require('dotenv/config')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { validateUser } = require('./validateUser')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

module.exports = router

//user model
const User = require('../../models/User')

const isEmail = (input) =>{
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;   
  if(emailRegex.test(input)){
    return true
  }
  return false
}

// @route POST v1/auth/login
// @desc authenticate the user
// @access public
router.post('/login', (req, res)=>{
  User.findOne(
    req.body.username &&
      !isEmail(req.body.username) ? 
        { uname: req.body.username } :
      req.body.email ? 
        { email: req.body.email } : { email: req.body.username }
  )
  .then( user => {
    if(!user) return res.status(400).json({ msg: `User isn't registered` })

    //validate password
    bcrypt.compare(req.body.password, user.pwd).then(isMatch => {
      if(!isMatch){
        return res.status(400).json({
          msg: "Password is incorrect",
          field: 'password'
        })
      }

      const payload = {
        _id: user._id,
        username: user.uname,
        displayName: user.dname,
        profile_image:user.profile_image,
        bio: user.bio,
        email: user.email
      }
      
      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        (err, token) =>{
          if(err) throw err
          res.status(201).json({
            token,
            success: true,
            user: payload,
            msg: 'You are now logged in!'
          })
        }
      )
    })
  }).catch(err => (res.status(404).send({...err})))
})

// @route GET v1/auth/user
// @desc get user data
// @access private
router.get('/user',auth,(req,res)=>{
  User.findById(req.user.id)
    .select('-pwd -joinedOn')
    .then(user => {
      return res.json(user)
    }).catch(err => (res.status(404).send(err)))
})