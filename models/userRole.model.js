const { Sequelize, DataTypes } = require("sequelize");
const sequelizeDB = require("../database/db");
// const modelRole = require("../models/role.model");

const modelUserRole = sequelizeDB.define('UserRole', {
    userRoleId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
},
{
    timestamps: false,
    tableName: "UserRole"
});

// modelRole.hasMany(modelUserRole,{
//     foreignKey: 'roleId'
// });

module.exports = modelUserRole;