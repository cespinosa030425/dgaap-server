const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../utils/auth');
const userModel = require('../models/user.model');
const roleModel = require('../models/role.model');


//funcion para crear usuario
const createUser = async (req, res) => {

     try {
          const password = bcrypt.hashSync(req.body.password, Number.parseInt(env.AUTH_ROUNDS));

          const newUser = await  userModel.create({
               personId: req.body.personid,
               userName: req.body.username.toUpperCase(),
               password: password,
               createdBy: req.body.createdby,
               modifiedBy: req.body.modifiedby
          })     
               const token = jwt.sign({newUser: newUser}, env.AUTH_SECRET, {
                    expiresIn: env.AUTH_EXPIRES
               });

          res.json({
                    newUser: newUser,
                    token: token
          });
     } catch (err) {
          res.status(500).json(err);
     }
}

//funcion para traer todos los usuarios 
const getUser = async (req, res) => {
    try {
        const users = await userModel.findAll({
            include: {
                model: roleModel,
                attributes: ['RoleName']
            },
            attributes: ['UserName'],
        });
        res.json(users); 
    } catch (err) {
        res.status(500).json({message: 'Error en el servidor'});
    }
   
};

module.exports = {getUser,createUser};