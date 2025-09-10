const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Post = sequelize.define('Post', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// Relacionamento: Um usuário tem muitas postagens
User.hasMany(Post);
Post.belongsTo(User);

module.exports = Post;
