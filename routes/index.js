const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Home page route
router.get('/', async (req, res) => {
  const posts = await Post.findAll();
  res.render('index', { posts });
});

// Create post route
router.post('/create', async (req, res) => {
  const { title, content } = req.body;
  await Post.create({ title, content });
  res.redirect('/');
});

module.exports = router;
