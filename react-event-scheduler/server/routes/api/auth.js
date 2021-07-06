const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const path = require('path')

// @desc google auth
// @route GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile','email'] }))

// @desc google auth callback
// @route GET /auth/google/callback
router.get(
  '/google/callback', 
  passport.authenticate('google', { failureRedirect: '/api/auth/auth-fail' }), 
  (req,res) => {
    console.log(path.dirname(require.main.filename))
    //res.sendFile('client/public/index.html')
    return 
  }
)

router.get('/logout', (req, res) => {
  req.logOut()
  //res.redirect(`http://${req.headers.host}${req.url}`)
})

router.get('/auth-fail', (req,res) => {
  return res.send('Login failed')
})


module.exports = router