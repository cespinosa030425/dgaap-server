const { Sequelize, DataTypes } = require("sequelize");
const sequelizeDB = require("../database/db");
const modelUserRole = require("../models/userRole.model");

const modelRole = sequelizeDB.define('Role', {
    roleId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    roleName: {
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
},
{
    timestamps: false,
    tableName: "Role"
});

modelRole.hasMany(modelUserRole,{
    foreignKey: 'roleId'
});

modelUserRole.belongsTo(modelRole,{
    foreignKey: 'roleId'
});

module.exports = modelRole;