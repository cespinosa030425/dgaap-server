const router = require('express').Router();
const postController = require('../controllers/post.controller');

//crear post
router.post('/newpost', postController.newPost);

//traer los posts del menu noticias
router.post('/featuredposts', postController.featuredPosts);

//traer los posts 
router.get('/allpost', postController.allPost);

//actualiza los views
router.post('/updateview', postController.viewsUpdate);

//actualiza los views
router.get('/interest', postController.interestPost);

//traer el id fecha actual
router.post('/postid', postController.postId);

module.exports = router;
