const router = require('express').Router();
const filesPostController = require('../controllers/filesPost.controller');

//ruta para guardar archivos
router.post('/createfile', filesPostController.createFilesPost);

//ruta para traer archivos
router.post('/getfiles', filesPostController.getFilesPost);
//ruta para traer archivos
router.post('/getvideo', filesPostController.getVideoPost);

module.exports = router