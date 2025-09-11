const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Mostrar postagens
router.get('/', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    const posts = await Post.findAll({
        include: {
            model: User,
            attributes: ['nome', 'username']
        },
        order: [['createdAt', 'DESC']]
    });

    // Converter os objetos Sequelize em plain objects
    const plainPosts = posts.map(post => post.get({ plain: true }));

    res.render('posts', { posts: plainPosts, user: req.session.user });
});

// Criar nova postagem
router.post('/create', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const { content } = req.body;
    await Post.create({ content, UserId: req.session.user.id });
    res.redirect('/posts');
});

module.exports = router;
