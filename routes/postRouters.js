const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Mostrar postagens
router.get('/', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const posts = await Post.findAll({ include: User, order: [['createdAt', 'DESC']] });
    res.render('posts', { posts, user: req.session.user });
});

// Criar nova postagem
router.post('/create', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const { content } = req.body;
    await Post.create({ content, UserId: req.session.user.id });
    res.redirect('/posts');
});

module.exports = router;
