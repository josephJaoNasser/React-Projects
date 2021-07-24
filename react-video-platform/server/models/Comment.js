const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  author: {
    type: Object
  },
  commentTo: {
    type: String,
    isRequired: true,
    immutable: true
  },
  body: {
    type: String,
    isRequired: true
  },
  postedOn: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  editedOn: {
    type: Date
  },
})

module.exports = Comment = mongoose.model('comments', CommentSchema)