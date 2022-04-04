const { Sequelize, DataTypes } = require("sequelize");
const sequelizeDB = require("../database/db");
const modelUserRole = require('./userRole.model');
const modelPerson = require("./person.model");
//const modelRole = require("../models/role.model");

const modelUser = sequelizeDB.define('User', {
    userId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    personId: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
            len: {
                args:[4,16],
                msg: "El Username debe contener 4 a 16 caracteres"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: {
                args:[8,100],
                msg: "El Password debe contener 8 o mas caracteres" 
            }
        }  
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
    tableName: "User"
});

modelUser.hasOne(modelPerson,{
    foreignKey: 'personId'
});

modelUser.hasMany(modelUserRole,{
    foreignKey: 'userId'
});

// modelRole.hasMany(modelUserRole,{
//     foreignKey: 'roleId'
// });

module.exports = modelUser;