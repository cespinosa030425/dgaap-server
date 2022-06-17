const jwt = require('jsonwebtoken');
const env = require('../utils/auth');
const filesPostModel = require('../models/filesPost.model');

// //funcion para crear nuevo post
const createFilesPost = async (req, res) => {

    try {

         const file = await  filesPostModel.create({
              postId: req.body.postid,
              name: req.body.name,
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
 const getFilesPost = async (req, res) => {
    const { postid } = req.body;
    try {
        const files = await filesPostModel.findAll({
          attributes:[['file','src'],'filesId','postId','name','type'],
         where: {
         postId: postid,
        },

        });

         res.json({
              files
         });

    } catch (err) {
        res.status(500).json({message: 'Error en el servidor'});
    }
   
};

//Endpoint trae los archivos por id 
const getVideoPost = async (req, res) => {
     const { postid } = req.body;
     try {
         const video = await filesPostModel.findOne({
           attributes:[['file','src'],'filesId','postId','type'],
          where: {
          postId: postid,
          type:"URL"
         },
 
         });
 
          res.json(
               video
          );
 
     } catch (err) {
         res.status(500).json({message: 'Error en el servidor'});
     }
    
 };


module.exports={
    createFilesPost,
    getFilesPost,
    getVideoPost
}