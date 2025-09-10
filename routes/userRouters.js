const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Tela de registro
router.get('/register', (req, res) => res.render('register'));

// Processar registro
router.post('/register', async (req, res) => {
    const { nome, email, username, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    await User.create({ nome, email, username, senha: hashedPassword });
    res.redirect('/login');
});

// Tela de login
router.get('/login', (req, res) => res.render('login'));

// Processar login
router.post('/login', async (req, res) => {
    const { username, senha } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(senha, user.senha)) {
        req.session.user = user;
        res.redirect('/posts');
    } else {
        res.send('Usuário ou senha incorretos');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
