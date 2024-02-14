'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'createdBy' });
      Post.belongsTo(models.Status, { foreignKey: 'status_id', as: 'status' });
      Post.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Post.hasMany(models.Comment, { foreignKey: 'post_id', as: 'comments' });

    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};