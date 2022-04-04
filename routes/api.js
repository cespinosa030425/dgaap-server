const router = require('express').Router();
const apiUserRouter = require('./user.routes');
const apiAuthRouter = require('./auth.routes');
const apiPersonRouter = require('./person.routes');

//ruta para los traer todos los usuarios
router.use('/user', apiUserRouter);

//rutas singup y singin, para crear y logear usuario
router.use('/auth', apiAuthRouter);

//ruta para crear personas
router.use('/person', apiPersonRouter);


module.exports = router;