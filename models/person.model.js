const { Sequelize, DataTypes } = require("sequelize");
const sequelizeDB = require("../database/db");

const modelPerson = sequelizeDB.define('Person', {
    personId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    employeeCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
                  
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true      
        }
    },
    documentId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING
    },
    celNumber: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate:{
            isEmail:{
                msg: "Formato de Email incorrecto incorrecto"
            }
        }
    },
     departament: {
        type: DataTypes.STRING,
        allowNull: true
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
    tableName: "Person"
});

module.exports = modelPerson;