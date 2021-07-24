const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')


module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },async (accessToken, refreshToken, profile, done) => {

    const userData = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      image: profile.photos[0].value
    }

    try{
      let user = await User.findOne({googleId: profile.id})

      if(user){
        done(null, user)
      }
      else{
        user = await User.create(userData)
        done(null, user)
      }
    }
    catch(err){
      console.error(err)
    }

  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((user, done)=> {
    User.findById(user.id, (err, user) => done(err, user)) 
  })
}