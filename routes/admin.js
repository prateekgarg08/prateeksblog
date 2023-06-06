var express = require('express');
var router = express.Router();

const { getAllPosts, postPost, getPost, deletePost, updatePost } = require('../controllers/admin')

router.route('/').get(getAllPosts).post(postPost);
router.route('/:postid').get(getPost).delete(deletePost).put(updatePost)
module.exports = router;
