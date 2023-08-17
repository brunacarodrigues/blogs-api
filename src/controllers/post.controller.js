const { postService } = require('../services');
const { BlogPost } = require('../models');

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

const getAllPosts = async (_req, res) => {
  try {
    const posts = await postService.getAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

const getByIdPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getByIdPost(id);
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

const updateByIdPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { userId } = req;

    const postId = await BlogPost.findByPk(id);
    if (postId.userId !== userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    const posted = await postService.updateByIdPost(id, title, content);
    if (!posted.message) {
      return res.status(200).json(posted);
    }
    return res.status(400).json({ message: posted.message });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};
  
module.exports = {
  createPost,
  getAllPosts,
  getByIdPost,
  updateByIdPost,
};