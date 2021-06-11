const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create schema
const PostSchema = new Schema({
  text:{
    type: String
  },
  media:{
    type: Array,
    default: []
  },
  createdAt:{
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt:{
    type: Date,
    default: Date.now
  },
  user:{
    type: Object,
    required: true
  }
},{ collection : 'posts' })

module.exports = Post = mongoose.model('post', PostSchema)