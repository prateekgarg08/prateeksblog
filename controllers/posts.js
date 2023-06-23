const Post = require('../models/Post')
const getPublishedPosts = async function (req, res) {
  const page = Number(req.query.page) || 1
  const limit = 10
  const skip = (page - 1) * limit
  const posts = await Post.find({ isPublished: true }).select("title description commentCount addedAt").skip(skip).limit(limit)
  const totalPages = Math.ceil(await Post.countDocuments({ isPublished: true }) / limit)

  res.status(200).json({
    posts,
    nBits: posts.length,
    totalPages,
    page
  })
}

const getPost = async function (req, res) {
  const id = req.params.postid
  const post = await Post.findOne({ _id: id })
  if (!post) {
    res.status(404).send("error 404")
  }
  else {

    res.status(200).json({ post })
  }
}

const pushComment = async function (req, res) {
  const postId = req.params.postid
  console.log(req.body)
  const comment = {
    msg: req.body.msg,
    addedBy: {
      username: req.body.username,
      email: req.body.email
    },
    addedOn: postId,
  }
  const post = await Post.findOneAndUpdate({ _id: postId }, {
    "$push": { "comments": comment, }, "$inc": { "commentCount": 1 }
  }, { new: true })
  res.json({ post }).status(201);


}

module.exports = { getPublishedPosts, getPost, pushComment }