const router = require('express').Router();
const userController = require('../controllers/user.controller');

//ruta creat usuario
router.post('/createuser', userController.createUser);
//ruta traer todos los usuarios
router.get('/getall', userController.getUser);

module.exports = router;
