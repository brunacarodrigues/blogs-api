const { Category, PostCategory, BlogPost, sequelize, User } = require('../models');

// lembrar da ordem dos parâmetros
const createPost = async (title, content, categoryIds, userId) => {
  const checkCategories = await Category.findAll({ where: { id: categoryIds } });
  if (checkCategories.length !== categoryIds.length) {
    return { message: 'one or more "categoryIds" not found' };
  }

  const newPost = await sequelize.transaction(async (transaction) => {
    const post = await BlogPost.create({ title, content, userId }, { transaction });
    const postCategories = categoryIds.map(async (categoryId) => {
      await PostCategory.create({ postId: post.id, categoryId }, { transaction });
    });
    await Promise.all(postCategories);
    return post;
  });
  return newPost;
};

const getAllPosts = async () => {
  const modelsInclude = [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ];
  const posts = await BlogPost.findAll({ include: modelsInclude });
  return posts;
};

const getByIdPost = async (id) => {
  const modelsInclude = [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ];
  const post = await BlogPost.findByPk(id, { include: modelsInclude });
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getByIdPost,
};