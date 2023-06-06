var express = require('express');
var router = express.Router();

const { getPublishedPosts, getPost, pushComment } = require('../controllers/posts')
/* GET home page. */
router.route('/').get(getPublishedPosts);
router.route('/post/:postid').get(getPost)
router.route('/post/:postid/comment').put(pushComment)
module.exports = router;
