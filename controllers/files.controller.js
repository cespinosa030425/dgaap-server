const jwt = require('jsonwebtoken');
const env = require('../utils/auth');
const filesModel = require('../models/files.model');
const sequelizeDB = require('../database/db');

// //funcion para crear nuevo post
const createFiles = async (req, res) => {

    try {

         const file = await  filesModel.create({
              postId: req.body.postid,
              type: req.body.type,
              file: req.body.file,
         })     
              const token = jwt.sign({file}, env.AUTH_SECRET, {
                   expiresIn: env.AUTH_EXPIRES
              });

         res.json({
               file,
               token
         });
    } catch (err) {
         res.status(500).json(err);
    }
}

 //Endpoint trae los archivos por id 
 const getFiles = async (req, res) => {
    const { postid } = req.body;
    try {
        const files = await filesModel.findAll({
          attributes:[['file','src'],'filesId','postId','type'],
         where: {
         postId: postid,
        },

        });

        const token = jwt.sign({files}, env.AUTH_SECRET, {
              expiresIn: env.AUTH_EXPIRES
         });

         res.json({
              files,
              token
         });

    } catch (err) {
        res.status(500).json({message: 'Error en el servidor'});
    }
   
};


module.exports={
    createFiles,
    getFiles
}