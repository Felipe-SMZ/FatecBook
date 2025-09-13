const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

//Importação do sequelize
const sequelize = require('./config/database');
const User = require('./models/User');
const Post = require('./models/Post');
const Like = require('./models/Like');
const Comment = require('./models/Comment');

// Definir relacionamentos
User.hasMany(Like);
Like.belongsTo(User);

Post.hasMany(Like);
Like.belongsTo(Post);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasMany(Comment);
Comment.belongsTo(User);

// Criar app
const app = express();

// Configurar Handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        nl2br: function (text) {
            if (text) {
                return text.replace(/\n/g, '<br>');
            }
            return '';
        },
        formatDate: function (date) {
            if (!date) return '';
            const d = new Date(date);
            const dia = String(d.getDate()).padStart(2, '0');
            const mes = String(d.getMonth() + 1).padStart(2, '0');
            const ano = d.getFullYear();
            const hora = String(d.getHours()).padStart(2, '0');
            const min = String(d.getMinutes()).padStart(2, '0');
            return `${dia}/${mes}/${ano} ${hora}:${min}`;
        },
        eq: function (a, b) { return a === b; }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configurar Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar sessão
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

// Servir arquivos estáticos (CSS, imagens)
app.use(express.static('public'));

// Rota da página inicial
app.get('/', (req, res) => {
    res.render('home');
});

// Usar rotas
app.use('/', userRoutes);
app.use('/posts', postRoutes);

// Sincronizar modelos com o banco
sequelize.sync({ force: false }) // force: true recria tabelas do zero
    .then(() => {
        console.log('Banco de dados sincronizado!');
        // Iniciar servidor após sincronização
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:3000`);
        });
    })
    .catch(err => console.error('Erro ao sincronizar banco:', err));


//Iniciar servidor
const PORT = 3000; 