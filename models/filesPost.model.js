const { Sequelize, DataTypes } = require("sequelize");
const sequelizeDB = require("../database/db");
const modelPost = require("./post.model");

const modelFilesPost = sequelizeDB.define('FilesPost', {
    filesId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }, 
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    file: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
},{
    timestamps: false,
    tableName: "FilesPost"
});

modelFilesPost.hasMany(modelPost,{
    foreignKey: 'postId'
});

module.exports = modelFilesPost;