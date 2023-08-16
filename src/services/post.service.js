const { Category, PostCategory, BlogPost, sequelize } = require('../models');

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

// const { BlogPost } = require('../models');

// const createPost = async ({ title, content, id }) => {
//   const post = await BlogPost.create({ title, content, userId: id });
//   return post;
// };

module.exports = {
  createPost,
};