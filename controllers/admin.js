// import formidable from 'formidable';
const Multer = require("multer");
const Post = require('../models/Post')
const cloudinary = require('../middleware/cloudinaryConfig')
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});




const getAllPosts = async function (req, res) {
  const posts = await Post.find({}).select('-comments');
  res.json({ posts, nBits: posts.length }).status(200)
}

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}


const postPost = async function (req, res) {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    const { public_id: image_public_id } = cldRes
    const userInput = {
      ...req.body,
      image_public_id
    }
    const post = await Post.create(userInput)
    res.json({ post }).status(201)
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }

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

    res.json({ sucess: true }).status(200)
  }
}
const updatePost = async function (req, res) {
  const postid = req.params.postid
  const userInput = req.body
  const post = await Post.findByIdAndUpdate({ _id: postid }, userInput, { new: true })
  if (!post) {
    res.status(404).send("post not found")
  }
  else {

    res.json({ post }).status(200)
  }
}

module.exports = { getAllPosts, getPost, postPost, deletePost, updatePost }