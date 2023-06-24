var express = require('express');
var upload = require('../middleware/multerConfig')
var router = express.Router();
const { getAllPosts, postPost, getPost, deletePost, updatePost } = require('../controllers/admin')

router.route('/').get(getAllPosts)
router.post('/', upload.single('file'), postPost);
router.route('/post/:postid').get(getPost).delete(deletePost).put(updatePost)
module.exports = router;
