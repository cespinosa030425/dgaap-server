const router = require('express').Router();
const authController = require('../controllers/auth.controller');


// //ruta para crear usuarios
// router.post('/signup', authController.signUp);

//ruta para logearse
router.post('/signin', authController.signIn);

module.exports = router