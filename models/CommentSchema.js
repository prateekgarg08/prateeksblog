const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: [true, "proivde msg"]
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
  addedBy: {
    username: {
      type: String,
      required: [true, "proivde username"]
    },
    email: {
      type: String,
      required: [true, "proivde email"]
    }
  },
  addedOn: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: [true, 'Please provide user'],

  },

}, { timestamps: true })

module.export = CommentSchema