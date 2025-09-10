const { Sequelize } = require('sequelize');

// Conexão com PostgreSQL
const sequelize = new Sequelize('fatecbookdb', 'postgres', 'felipe', {
    host: 'localhost',
    dialect: 'postgres'
});

// Testar conexão
sequelize.authenticate()
    .then(() => console.log('Conexão com PostgreSQL OK!'))
    .catch(err => console.error('Erro ao conectar:', err));

module.exports = sequelize;
