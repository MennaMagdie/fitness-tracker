const Post = require('../models/Post');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res, next) => {
  try {
    const { content, media, tags } = req.body;

    const post = await Post.create({
      author: req.user.id,
      content,
      media,
      tags
    });

    await post.populate('author', 'name profilePhoto');

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const posts = await Post.find()
      .populate('author', 'name profilePhoto')
      .populate('comments.user', 'name profilePhoto')
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);

    const total = await Post.countDocuments();

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: posts
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Private
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name profilePhoto')
      .populate('comments.user', 'name profilePhoto');

    if (!post) {
      return next(new ErrorResponse('Post not found', 404));
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Like/Unlike post
// @route   PUT /api/posts/:id/like
// @access  Private
exports.toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorResponse('Post not found', 404));
    }

    // Check if post has already been liked by user
    const likeIndex = post.likes.indexOf(req.user.id);

    if (likeIndex === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
exports.addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorResponse('Post not found', 404));
    }

    post.comments.unshift({
      user: req.user.id,
      text
    });

    await post.save();

    await post.populate('comments.user', 'name profilePhoto');

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove comment from post
// @route   DELETE /api/posts/:id/comments/:comment_id
// @access  Private
exports.removeComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorResponse('Post not found', 404));
    }

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return next(new ErrorResponse('Comment not found', 404));
    }

    // Check user
    if (comment.user.toString() !== req.user.id && post.author.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to delete this comment', 401));
    }

    // Get remove index
    const removeIndex = post.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
}; 