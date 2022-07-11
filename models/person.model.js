const { Sequelize, DataTypes } = require("sequelize");
const sequelizeDB = require("../database/db");
const modelDepartament = require('../models/departament.model');

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
        // validate: {
        //     isAlpha: true,
                  
        // }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     isAlpha: true      
        // }
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
     departamentId: {
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
        // defaultValue: DataTypes.NOW,
        allowNull: true,
    },
    photo: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    birthdayDate: {
      type: DataTypes.DATE,
      allowNull: true
  },
  position: {
    type: DataTypes.STRING
},
  career: {
    type: DataTypes.STRING
},
  reportsTo: {
    type: DataTypes.INTEGER
},
healthInsurance: {
    type: DataTypes.STRING,
},
startedOn: {
    type: DataTypes.DATE,
},
bloodType: {
    type: DataTypes.STRING
},
emergencyName: {
    type: DataTypes.STRING
},
emergencyNumber: {
    type: DataTypes.STRING
},
emergencyRelationship: {
    type: DataTypes.STRING
},
contractType: {
    type: DataTypes.STRING
},
contractExpiration: {
    type: DataTypes.DATE
},
isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
}

},{
    timestamps: false,
    tableName: "Person"
});

modelPerson.belongsTo(modelDepartament,{
    foreignKey: 'departamentId'
});

module.exports = modelPerson;