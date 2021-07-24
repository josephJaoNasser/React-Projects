const router = require('express').Router()
const passport = require('passport')

// ROUTE: GET /auth/google
// DESCRIPTION: use passport google OAuth 2.0
router.get('/google', passport.authenticate('google',{scope: ['profile', 'email']}))



// ROUTE: GET /auth/google/callback
// DESCRIPTION: Callback from auth
router.get('/google/callback', 
  passport.authenticate('google', {failureRedirect: '/api/auth/auth-fail'}),
  (req, res) => {
    res.redirect('http://localhost:3000')
  }
)



// ROUTE: GET /auth/auth-fail
// DESCRIPTION: Callback from auth if the auth failed
router.get('/auth-fail', (req,res) => {
  return res.send('Login failed')
})


// ROUTE: GET /auth/logout
// DESCRIPTION: Logout the user
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('http://localhost:3000');
});


module.exports = router