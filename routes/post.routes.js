const router = require('express').Router();
const postController = require('../controllers/post.controller');
const autMiddleware = require('../middlewares/auth.middleware');

//crear post
router.post('/newpost', autMiddleware, postController.newPost);

//traer los posts del menu noticias
router.post('/featuredposts', autMiddleware, postController.featuredPosts);

//traer los posts 
router.get('/allpost', autMiddleware, postController.allPost);

//actualiza los views
router.post('/updateview', autMiddleware, postController.viewsUpdate);

//actualiza los views
router.get('/interest', autMiddleware, postController.interestPost);

//traer el id fecha actual
router.post('/postid', autMiddleware, postController.postId);

module.exports = router;
