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


// Criar app
const app = express();

// Configurar Handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
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


// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});
