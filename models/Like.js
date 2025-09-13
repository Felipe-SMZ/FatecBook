const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define('Like', {
    // O Sequelize já cria id, createdAt, updatedAt
});

module.exports = Like;