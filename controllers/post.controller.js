const jwt = require('jsonwebtoken');
const env = require('../utils/auth');
const postModel = require('../models/post.model');
const sequelizeDB = require('../database/db');

// //funcion para crear nuevo post
const newPost = async (req, res) => {

    try {

         const post = await  postModel.create({
              title: req.body.title,
              description: req.body.description,
              category: req.body.category,
              author: req.body.author,
              image: req.body.image,
              views: req.body.views,
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

//Endpoint trae todos los post con la categoria featured
const featuredPosts = async (req, res) => {

     const {category} = req.body;
     console.log(category)
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

 //Endpoint trae todos los post 
const allPost = async (req, res) => {

     try {
         const posts = await postModel.findAll({
          order: [
               ['postId', 'DESC']
          ],

         });

         const token = jwt.sign({posts: posts}, env.AUTH_SECRET, {
               expiresIn: env.AUTH_EXPIRES
          });

          res.json({
               posts: posts,
               token: token
          });
     } catch (err) {
         res.status(500).json({message: 'Error en el servidor'});
     }
    
 };


 //Endpoint trae el post con ms visitas
const interestPost = async (req, res) => {
     try {
         const post = await postModel.findOne({
          order: [
               ['views', 'DESC']
          ],

         });

         const token = jwt.sign({post: post}, env.AUTH_SECRET, {
               expiresIn: env.AUTH_EXPIRES
          });

          res.json({
               post: post,
               token: token
          });

          console.log(post)
     } catch (err) {
         res.status(500).json({message: 'Error en el servidor'});
     }
    
 };


 //Endpoint para sumar las visitas a un post
const viewsUpdate = async (req, res) => {

     const {id} = req.body;

     try {
          const click = await postModel.increment('views', { by: 1, where: { postId: id }});

          const token = jwt.sign({click: click}, env.AUTH_SECRET, {
               expiresIn: env.AUTH_EXPIRES
          });

          res.json({
               click:click,
               token: token
          });
     } catch (err) {
         res.status(500).json({message: 'Error en el servidor'});
     }
 };
 

module.exports = {
     newPost,
     featuredPosts,
     viewsUpdate,
     interestPost,
     allPost
};