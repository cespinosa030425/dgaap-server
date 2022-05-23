const router = require('express').Router();
const personController = require('../controllers/person.controller');
const autMiddleware = require('../middlewares/auth.middleware')


//ruta para crear personas
router.post('/create', personController.createPerson);

//ruta para traer todas las personas
router.get('/getallpersons', autMiddleware, personController.getAllPerson)

//ruta para traer todas las personas que cumplan en el mes actual
router.get('/getallbirthday', autMiddleware, personController.getbirthday)

//ruta para traer una persona
router.post('/getoneperson', autMiddleware, personController.getOnePerson)

module.exports = router