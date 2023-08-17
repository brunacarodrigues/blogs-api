const express = require('express');
const { postController } = require('../controllers');
const { validateToken, validatePost } = require('../middlewares');

const postRoute = express();

postRoute.post('/post', validateToken, validatePost, postController.createPost);
postRoute.get('/post', validateToken, postController.getAllPosts);
postRoute.get('/post/:id', validateToken, postController.getByIdPost);
postRoute.put('/post/:id', validateToken, postController.updateByIdPost);

module.exports = postRoute;