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

// Editar publicação (formulário)
router.get('/:id/edit', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    console.log('Post:', post);
    if (!post) {
        return res.redirect('/posts');
    }
    res.render('editPost', { post: post.get({ plain: true }) });
});

// Editar publicação (submit)
router.post('/:id/edit', async (req, res) => {
    await Post.update(
        { content: req.body.content },
        { where: { id: req.params.id } }
    );
    res.redirect('/posts');
});

// Deletar publicação
router.post('/:id/delete', async (req, res) => {
    await Post.destroy({ where: { id: req.params.id } });
    res.redirect('/posts');
});

module.exports = router;
