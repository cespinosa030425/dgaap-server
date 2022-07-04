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
              modifiedBy: req.body.modifiedby,
         })     

         res.json({
          post: post
         });
    } catch (err) {
         res.status(500).json(err);
    }
}

//Endpoint trae todos los post con la categoria featured
const featuredPosts = async (req, res) => {

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
          res.json({
               posts: allPost
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

          res.json({
               posts: posts
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

          res.json({
               post: post
          });

     } catch (err) {
         res.status(500).json({message: 'Error en el servidor'});
     }  
 };

 //Endpoint para sumar las visitas a un post
const viewsUpdate = async (req, res) => {

     const {id} = req.body;

     try {
          const click = await postModel.increment('views', { by: 1, where: { postId: id }});

          res.json({
               click:click
          });
     } catch (err) {
         res.status(500).json({message: 'Error en el servidor'});
     }
 };

  //Endpoint trae el post id fecha actual
const postId = async (req, res) => {
     const {title, category, author} = req.body;
     try {
         const post = await postModel.findOne({
          attributes:['postId'],
          where: {
          title,
          category,
          author,
         },

         order: [
          ['createdAt', 'DESC']
          ],

         });

          res.json({
          post: post
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
     allPost,
     postId
};