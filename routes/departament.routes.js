const router = require('express').Router();
const departamentController = require('../controllers/departament.controller');

//ruta para crear personas
router.get('/departaments', departamentController.getAllDepartment);

module.exports = router