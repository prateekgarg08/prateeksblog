const mongoose = require('mongoose')
const CommentSchema = require('./CommentSchema')
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "proivde title"]
  },
  description: {
    type: String,
    required: [true, "proivde description"]
  },
  image_public_id: {
    type: String,
    required: [true, "proivde image public id"]
  },
  comments: {
    type: [CommentSchema],
    default: []
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
  isPublished: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("Post", PostSchema)