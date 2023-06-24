const CommentSchema = require('./CommentSchema')

module.exports = mongoose.model("Comment", CommentSchema);