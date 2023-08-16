const express = require('express');
const { postController } = require('../controllers');
const { validateToken, validatePost } = require('../middlewares');

const postRoute = express();

postRoute.post('/post', validateToken, validatePost, postController.createPost);

module.exports = postRoute;