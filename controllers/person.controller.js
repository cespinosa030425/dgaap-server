const personModel = require('../models/person.model');
const departamentModel = require('../models/departament.model');
const sequelizeDB = require('../database/db');

//funcion para crear persona
const createPerson = async (req, res) => {

     try {

          const newPerson = await  personModel.create({
               employeeCode: req.body.employeeCode,
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               documentId: req.body.documentId,
               phoneNumber: req.body.phoneNumber,
               celNumber: req.body.celNumber,
               email: req.body.email.toUpperCase(),
               departament: req.body.departament,
               createdBy: req.body.createdBy,
               modifiedBy: req.body.modifiedBy
          })     
     
          res.json({
               newPerson: newPerson
          });
     } catch (err) {
          res.status(500).json(err);
     }
}

//funcion para traer todas personas de la tabla person, que esten activo y el role sea null en la tabla de user
const getAllPerson = async (req, res) => {
     try {
          const persons = await personModel.findAll({
             attributes:[[sequelizeDB.fn('concat', sequelizeDB.col('firstName'),' ', sequelizeDB.col('lastName')),"fullName"],'personId','birthdayDate', 'position', 'photo','career', 'reportsTo','startedOn','departamentId','email','phoneNumber','healthInsurance'],
               where: {
                    isActive: true
               },
               include: {
                    model: departamentModel,
                    attributes: ['name']
                },
               order: [
                    ['firstName', 'ASC']
               ]
          })
          res.json(persons)
     } catch (err) {
          res.status(500).json(err);     
     }
}

//funcion para traer todas personas de la tabla person, que esten activo y cumplan ano en el mes actual
const getbirthday = async (req, res) => {
     try {
          const persons = await personModel.findAll({
                attributes:['personId', 'firstName', 'lastName','birthdayDate', 'position', 'photo', 'isActive'],
               where: {
                    isActive: true
               },
               order: [
                    ['birthdayDate', 'DESC']
               ],
          })
          res.json(persons)
     } catch (err) {
          res.status(500).json(err);     
     }
}

//funcion para traer un usuario de la tabla person, que esten activo y el role sea null en la tabla de user
const getOnePerson = async (req, res) => {

     const {id} = req.body;
     try {
          const person = await personModel.findOne({
               attributes:['personId', 'firstName', 'lastName','birthdayDate', 'position', 'photo','career', 'reportsTo','startedOn','departamentId','email','phoneNumber'],         
               where:{
                   personId: id
               },
               include: {
                    model: departamentModel,
                    attributes: ['name']
                },
          })
          
          res.json(person)
     } catch (err) {
          res.status(500).json(err);     
     }
}

//funcion para traer un usuarios que estan por debajo de 
const getFollowers = async (req, res) => {

     const {id} = req.body;
     try {
          const follower = await personModel.findAll({
               attributes:['personId', 'firstName', 'lastName','birthdayDate', 'position', 'photo','career', 'reportsTo','startedOn','departamentId','email','phoneNumber'],         
               where:{
                    reportsTo: id
               },
               include: {
                    model: departamentModel,
                    attributes: ['name']
                },
          })
          res.json(follower)
     } catch (err) {
          res.status(500).json(err);     
     }
}


module.exports = {createPerson, getAllPerson,getOnePerson, getbirthday,getFollowers};
