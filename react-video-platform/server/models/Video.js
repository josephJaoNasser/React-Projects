const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  uploadedOn: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  duration: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true,
    immutable: true
  },
  key: {
    type: String,
    required: true,
    immutable: true
  },
  author: {
    type: Object
  }
})

module.exports = Video = mongoose.model('videos', VideoSchema)