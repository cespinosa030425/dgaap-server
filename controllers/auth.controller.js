const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../utils/auth');
const userModel = require('../models/user.model');
const roleModel = require('../models/role.model');
const userRoleModel = require('../models/userRole.model');

// //funcion para crear usuarios
// const signUp = async (req, res) => {

//      try {
//           const password = bcrypt.hashSync(req.body.password, Number.parseInt(env.AUTH_ROUNDS));

//           const user = await  userModel.create({
//                personId: req.body.personid,
//                userName: req.body.username.toUpperCase(),
//                password: password,
//                createdBy: req.body.createdby,
//                modifiedBy: req.body.modifiedby
//           })     
//                const token = jwt.sign({user: user}, env.AUTH_SECRET, {
//                     expiresIn: env.AUTH_EXPIRES
//                });

//           res.json({
//                     user: user,
//                     token: token
//           });
//      } catch (err) {
//           res.status(500).json(err);
//      }
// }

//funcion para traer el token del usuario y autentificarse
const signIn = async (req, res) => {

     try {
          const {username, password} = req.body;

          const user = await userModel.findOne({
               attributes:['personId','password'],

               // include:{
               //      model: userRoleModel,
               //      attributes: ['roleId']
               // },

               include: [
                    {
                    model: userRoleModel,
                    attributes:['roleId'],
                    
                    include:[{
                     model: roleModel
                    }],

               },
          ],

               where: {
                    userName: username
               },
          });

          if (!user) {
               res.status(404).json({message: "Nombre de usuario o contraseña incorrecta"});
          } else {

                    const userJson = JSON.parse(JSON.stringify(user)); 
                    delete userJson.password

               if (bcrypt.compareSync(password, user.password)){
 
                    const token = jwt.sign({user: user}, env.AUTH_SECRET, {
                    expiresIn: env.AUTH_EXPIRES
                    });
                    
                    res.json({
                         user: userJson,
                         token: token
                    });

               } else {
                    res.status(401).json({message: "Contrasena incorrecta"});
               }
          };
          
     } catch (err)  {
          res.status(500).json(err);
     }
}


module.exports = {signIn};