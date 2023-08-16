const { postService } = require('../services');

const ERROR_MSG = 'Internal Server Error';

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userId } = req;
    const post = await postService.createPost(title, content, categoryIds, userId);

    if (!post.message) {
      return res.status(201).json(post);
    }
    res.status(400).json({ message: post.message });
  } catch (error) {
    res.status(500).json({ message: ERROR_MSG });
  }
};
  
  module.exports = { createPost };