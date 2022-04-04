const router = require('express').Router();
const userController = require('../controllers/user.controller');
const autMiddleware = require('../middlewares/auth.middleware')

//ruta creat usuario
router.post('/createuser', autMiddleware, userController.createUser);
//ruta traer todos los usuarios
router.get('/getall', autMiddleware, userController.getUser);

module.exports = router;
