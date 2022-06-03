const { Sequelize, DataTypes } = require("sequelize");
const sequelizeDB = require("../database/db");

const modelFiles = sequelizeDB.define('Files', {
    fileId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departamentId: {
        type: DataTypes.INTEGER, 
    }, 
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    file: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: true,
    },
     createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    publicationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
},{
    timestamps: false,
    tableName: "Files"
});


module.exports = modelFiles;