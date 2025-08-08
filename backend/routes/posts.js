const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts (feed)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'username avatar');

    const total = await Post.countDocuments();

    res.json({
      posts,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        hasNext: skip + posts.length < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/posts/:id
// @desc    Get single post
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('userId', 'username avatar bio');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post('/', [
  auth,
  [
    body('imageUrl').notEmpty().withMessage('Image URL is required'),
    body('mood').isIn(['happy', 'sad', 'excited', 'peaceful', 'contemplative', 'energetic', 'calm', 'curious'])
      .withMessage('Invalid mood'),
    body('story').isLength({ min: 10, max: 1000 })
      .withMessage('Story must be between 10 and 1000 characters')
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { imageUrl, mood, story } = req.body;
    const user = await User.findById(req.user.id);

    const newPost = new Post({
      userId: req.user.id,
      username: user.username,
      userAvatar: user.avatar,
      imageUrl,
      mood,
      story
    });

    const post = await newPost.save();
    await post.populate('userId', 'username avatar');

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/posts/:id/like
// @desc    Like/unlike a post
// @access  Private
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(req.user.id);
    
    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(req.user.id);
    }

    await post.save();
    res.json({ likes: post.likes, likeCount: post.likes.length });
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/posts/:id/comments
// @desc    Add comment to post
// @access  Private
router.post('/:id/comments', [
  auth,
  [
    body('text').isLength({ min: 1, max: 500 })
      .withMessage('Comment must be between 1 and 500 characters')
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const user = await User.findById(req.user.id);
    
    const newComment = {
      userId: req.user.id,
      username: user.username,
      text: req.body.text
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json(post.comments[0]);
  } catch (error) {
    console.error('Error adding comment:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user owns the post
    if (post.userId.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (error) {
    console.error('Error deleting post:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/posts/user/:userId
// @desc    Get posts by user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'username avatar');

    const total = await Post.countDocuments({ userId: req.params.userId });

    res.json({
      posts,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        hasNext: skip + posts.length < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
