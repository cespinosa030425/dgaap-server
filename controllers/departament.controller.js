const departamentModel = require('../models/departament.model');
//funcion para traer todos los departamentos
const getAllDepartment = async (req, res) => {

     try {
          const departament = await departamentModel.findAll({
               attributes:['departamentId', 'code', 'name',],         
          })
          
          res.json(departament)
     } catch (err) {
          res.status(500).json(err);     
     }
}

module.exports={
    getAllDepartment
}