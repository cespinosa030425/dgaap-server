const { Sequelize, DataTypes } = require("sequelize");
const sequelizeDB = require("../database/db");

const modelDepartament = sequelizeDB.define('Departament', {
    departamentId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false
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
      modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    modifiedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    }
},{
    timestamps: false,
    tableName: "Departament"
});

module.exports = modelDepartament;