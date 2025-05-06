const express = require('express');
const {
  createPost,
  getPosts,
  getPost,
  toggleLike,
  addComment,
  removeComment
} = require('../controllers/posts');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(protect, getPost);

router.route('/:id/like')
  .put(protect, toggleLike);

router.route('/:id/comments')
  .post(protect, addComment);

router.route('/:id/comments/:comment_id')
  .delete(protect, removeComment);

module.exports = router; 