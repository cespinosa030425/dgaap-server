const personModel = require('../models/person.model');
const departamentModel = require('../models/departament.model');
const sequelizeDB = require('../database/db');

//funcion para crear persona
// const createPerson = async (req, res) => {

//      try {

//           const newPerson = await  personModel.create({
//                employeeCode: req.body.employeeCode,
//                firstName: req.body.firstName,
//                lastName: req.body.lastName,
//                documentId: req.body.documentId,
//                phoneNumber: req.body.phoneNumber,
//                celNumber: req.body.celNumber,
//                email: req.body.email.toUpperCase(),
//                departament: req.body.departament,
//                createdBy: req.body.createdBy,
//                modifiedBy: req.body.modifiedBy
//           })     
     
//           res.json({
//                newPerson: newPerson
//           });
//      } catch (err) {
//           res.status(500).json(err);
//      }
// }

//funcion para traer todas personas de la tabla person, que esten activo y el role sea null en la tabla de user
const getAllPerson = async (req, res) => {
     try {
          const persons = await personModel.findAll({
             attributes:[[sequelizeDB.fn('concat', sequelizeDB.col('firstName'),' ', sequelizeDB.col('lastName')),"fullName"],'personId','birthdayDate', 'position', 'photo','career', 'reportsTo','startedOn','departamentId','email','phoneNumber','healthInsurance','isActive'],
               // where: {
               //      isActive: true
               // },
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

const employeeTree = async (req, res) => {
     try {
          const users = await personModel.findAll({
             attributes:['personId','firstName','lastName', [sequelizeDB.fn('concat', sequelizeDB.col('firstName'),' ', sequelizeDB.col('lastName')),"name"],'reportsTo','photo','position'],
               where: {
                    isActive: true
               },
               include: {
                         model: departamentModel,
                         attributes: ['name']
                    },
          })
          res.json(users)
     } catch (err) {
          res.status(500).json(err);     
     }
}

// const employeeTree = async (req, res) => {
//           try {
//                const users = await personModel.findAll({
//                   attributes:['personId','firstName','lastName','reportsTo','photo','position'],
//                     where: {
//                          isActive: true
//                     } ,
//                     include: {
//                          model: departamentModel,
//                          attributes: ['name']
//                      },
//                })
//                res.json(users)
//           } catch (err) {
//                res.status(500).json(err);     
//           }
//      }

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
               attributes:['personId', 'firstName', 'lastName','birthdayDate', 'position', 'photo','career', 'reportsTo','startedOn','departamentId','email','phoneNumber','documentId','celNumber','employeeCode','healthInsurance','isActive'],         
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

//actuliazar datos de persona
const createPerson = async (req, res) => {

     const {code, firstname, lastname, documentid, phone, cel, email, departament,createdby,modifiedby,date, career,  position,isactive,photo, reportto, startedon, health} = req.body;
     try {
          const person = await personModel.create({
               employeeCode:code,
               firstName:firstname,
               lastName:lastname,
               documentId: documentid,
               phoneNumber:phone,
               celNumber: cel,
               email:email,
               departamentId:departament,
               createdBy:createdby,
               modifiedBy: modifiedby,
               photo: photo,
               birthdayDate:date,
               position:position,
               isActive:isactive,
               career:career,
               reportsTo:reportto,
               startedOn:startedon,
               healthInsurance:health
          })
          
          res.json(person)
     } catch (err) {
          res.status(500).json(err);     
     }
}

//actuliazar datos de persona
const updatePerson = async (req, res) => {

     const {id, photo, firstname, lastname, documentid, cel,date, career, code, position, departament, reportto, startedon, phone, email, health,modifiedby,modifiedat} = req.body;
     try {
          const person = await personModel.update({
               photo: photo,
               firstName:firstname,
               lastName:lastname,
               documentId: documentid,
               celNumber: cel,
               birthdayDate:date,
               career:career,
               employeeCode:code,
               position:position,
               departamentId:departament,
               reportsTo:reportto,
               startedOn:startedon,
               phoneNumber:phone,
               email:email,
               healthInsurance:health,
               modifiedBy:modifiedby,
               modifiedAt:modifiedat
          },{    
               where:{
                   personId: id
               }
         
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

//actuliazar datos de persona
const isActivePerson = async (req, res) => {

     const {id, bool,modifiedby,modifiedat} = req.body;
     try {
          const person = await personModel.update({
               isActive:bool,
               modifiedBy:modifiedby,
               modifiedAt:modifiedat
          },{    
               where:{
                   personId: id
               }
           })
          
          res.json(person)
     } catch (err) {
          res.status(500).json(err);     
     }
}

const getLastCode = async (req, res) => {
     try {
          const code = await personModel.findOne({
               attributes:['employeeCode'],
               order: [
                    ['employeeCode', 'desc']
               ]
          })
          res.json(code)
     } catch (err) {
          res.status(500).json(err);     
     }
}

const validationEmail = async (req, res) => {
     const {email} = req.body
     try {
          const isExist = await personModel.count({where: {email: email}})
          if(isExist > 0){
               res.json(true)
          }else
          {
               res.json(false)
          }
          // res.json(isExist)
     } catch (err) {
          res.status(500).json(err);     
     }
}

const validationDocument = async (req, res) => {
     const {documentid} = req.body
     try {
          const isExist = await personModel.count({where: {documentId: documentid}})
          if(isExist > 0){
               res.json(true)
          }else
          {
               res.json(false)
          }
          // res.json(isExist)
     } catch (err) {
          res.status(500).json(err);     
     }
}





module.exports = {createPerson, getAllPerson,getOnePerson, getbirthday,getFollowers,employeeTree,updatePerson,isActivePerson,getLastCode,validationEmail,validationDocument};
