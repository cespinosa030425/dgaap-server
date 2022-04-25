const router = require('express').Router();
const postController = require('../controllers/post.controller');
const autMiddleware = require('../middlewares/auth.middleware');

//crear post
router.post('/newpost', autMiddleware, postController.newPost);

//traer los posts del menu noticias
router.post('/featuredposts', autMiddleware, postController.featuredPosts);

//actualiza los views
router.post('/getview', autMiddleware, postController.interestPost);

//actualiza los views
router.post('/view', autMiddleware, postController.viewsUpdate);

module.exports = router;
