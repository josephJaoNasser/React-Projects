const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create schema
const UserSchema = new Schema({
  uname:{
    type: String,
    required: true,
    unique: true
  },
  dname:{
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  profile_image:{
    type: String,
    default:''
  },
  profile_image_url: {
    type: String,
    default:''
  },
  bio:{
    type: String,
    default: ''
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  joinedOn:{
    type: Date,
    default: Date.now
  }
},{ collection : 'users' })

module.exports = User = mongoose.model('user', UserSchema)