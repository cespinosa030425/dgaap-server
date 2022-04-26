const router = require('express').Router();
const postController = require('../controllers/post.controller');
const autMiddleware = require('../middlewares/auth.middleware');

//crear post
router.post('/newpost', autMiddleware, postController.newPost);

//traer los posts del menu noticias
router.post('/featuredposts', autMiddleware, postController.featuredPosts);

//traer un post 
router.post('/singlepost', autMiddleware, postController.singlePost);

//actualiza los views
router.post('/updateview', autMiddleware, postController.viewsUpdate);

//actualiza los views
router.get('/interest', autMiddleware, postController.interestPost);

module.exports = router;
