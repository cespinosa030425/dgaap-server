const jwt = require('jsonwebtoken');
const env = require('../utils/auth');
const postModel = require('../models/post.model');

// //funcion para crear nuevo post
const newPost = async (req, res) => {

    try {

         const post = await  postModel.create({
              title: req.body.title,
              description: req.body.description,
              category: req.body.category,
              author: req.body.author,
              image: req.body.image,
              isActive: req.body.isactive,
              createdBy: req.body.createdby,
              modifiedBy: req.body.modifiedby
         })     
              const token = jwt.sign({post: post}, env.AUTH_SECRET, {
                   expiresIn: env.AUTH_EXPIRES
              });

         res.json({
               post: post,
               token: token
         });
    } catch (err) {
         res.status(500).json(err);
    }
}

//Endpoint trae todos los post 
const FeaturedPosts = async (req, res) => {

     const {category} = req.body;
     try {
         const allPost = await postModel.findAll({
          where: {
               isActive: true,
               category: category
          },
          order: [
               ['postId', 'DESC']
          ],
          limit: 4

         });

         const token = jwt.sign({allPost: allPost}, env.AUTH_SECRET, {
               expiresIn: env.AUTH_EXPIRES
          });

          res.json({
               posts: allPost,
               token: token
          });
     } catch (err) {
         res.status(500).json({message: 'Error en el servidor'});
     }
    
 };
 

module.exports = {
     newPost,
     FeaturedPosts
};