const personModel = require('../models/person.model');
const departamentModel = require('../models/departament.model');
const jwt = require('jsonwebtoken');
const env = require('../utils/auth');

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
               const token = jwt.sign({newPerson: newPerson}, env.AUTH_SECRET, {
                    expiresIn: env.AUTH_EXPIRES
               });

          res.json({
                    newPerson: newPerson,
                    token: token
          });
     } catch (err) {
          res.status(500).json(err);
     }
}

//funcion para traer todas personas de la tabla person, que esten activo y el role sea null en la tabla de user
const getAllPerson = async (req, res) => {
     try {
          const persons = await personModel.findAll({
               attributes: ['FirstName','LastName','DocumentId','PhoneNumber','CelNumber','Email'],
               where: {
                    isActive: true
               }
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
               birthdayDate:{
                  '$gt': 5 
               }  
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

module.exports = {createPerson, getAllPerson,getOnePerson, getbirthday};
