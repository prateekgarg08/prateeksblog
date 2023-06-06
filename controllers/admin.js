const Post = require('../models/Post')
const getAllPosts = async function (req, res) {
  const posts = await Post.find({}).select('-comments');
  res.json({ posts, nBits: posts.length }).status(200)
}

const postPost = async function (req, res) {
  const userInput = req.body.post
  const post = await Post.create(userInput)
  res.json({ post }).status(201)
}

const getPost = async function (req, res) {
  const postid = req.params.postid
  const post = await Post.findOne({ _id: postid })
  if (!post) {
    res.status(404).send("post not found")
  }
  else {

    res.json({ post }).status(200)
  }
}

const deletePost = async function (req, res) {
  const postid = req.params.postid
  const post = await Post.findOneAndDelete({ _id: postid })
  if (!post) {
    res.status(404).send("post not found")
  }
  else {

    res.json({ post }).status(200)
  }
}
const updatePost = async function (req, res) {
  const postid = req.params.postid
  const userInput = req.body.post
  const post = await Post.findByIdAndUpdate({ _id: postid }, userInput, { new: true })
  if (!post) {
    res.status(404).send("post not found")
  }
  else {

    res.json({ post }).status(200)
  }
}

module.exports = { getAllPosts, getPost, postPost, deletePost, updatePost }