const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String, 
    required: true
  },
  displayName: {
    type: String,
    required: true    
  },
  givenName: {
    type: String,
    required:true
  },
  familyName: {
    type: String,
    required:true
  },  
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('users', UserSchema)