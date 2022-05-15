const { Sequelize, DataTypes } = require("sequelize");
const sequelizeDB = require("../database/db");
const modelPost = require("../models/post.model");

const modelFiles = sequelizeDB.define('Files', {
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
    tableName: "Files"
});

modelFiles.hasMany(modelPost,{
    foreignKey: 'postId'
});

module.exports = modelFiles;