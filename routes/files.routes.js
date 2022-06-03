const router = require('express').Router();
const filesController = require('../controllers/files.controllers');

//ruta para guardar archivos
router.post('/createfile', filesController.createFiles);

//ruta para traer archivos
router.post('/getfiles', filesController.getFiles);

module.exports = router