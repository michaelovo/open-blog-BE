'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Status, { foreignKey: 'status_id', as: 'status' });
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status_id: DataTypes.INTEGER,
    otp: DataTypes.TEXT,
    otp_expires_at: DataTypes.DATE,
    email_verified_at: DataTypes.DATE,
    user_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};