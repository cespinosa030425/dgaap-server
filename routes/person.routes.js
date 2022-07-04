const router = require('express').Router();
const personController = require('../controllers/person.controller');

//ruta para crear personas
router.post('/createperson', personController.createPerson);

//ruta para traer todas las personas
router.get('/getallpersons', personController.getAllPerson)

//ruta para traer todas las personas
router.get('/employeetree', personController.employeeTree)
//ruta para traer todas las personas que cumplan en el mes actual
router.get('/getallbirthday', personController.getbirthday)

//ruta para traer una persona
router.post('/getoneperson', personController.getOnePerson)

//ruta para traer una personas lideradas
router.post('/getfollowers', personController.getFollowers)

//ruta para actilizar persona
router.post('/updateperson', personController.updatePerson)

module.exports = router