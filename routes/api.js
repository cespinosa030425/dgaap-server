const router = require('express').Router();
const apiUserRouter = require('./user.routes');
const apiAuthRouter = require('./auth.routes');
const apiPersonRouter = require('./person.routes');
const apiPostRouter = require('./post.routes');
const apiFilesPostRouter = require('./filesPost.routes');
const apiFilesRouter = require('./files.routes');

//ruta para los traer todos los usuarios
router.use('/user', apiUserRouter);

//rutas singup y singin, para crear y logear usuario
router.use('/auth', apiAuthRouter);

//ruta para crear personas
router.use('/person', apiPersonRouter);

//rutas de los endpoint post
router.use('/post', apiPostRouter);

//rutas de los endpoint post
router.use('/filespost', apiFilesPostRouter);


//rutas de los endpoint post
router.use('/files', apiFilesRouter);


module.exports = router;