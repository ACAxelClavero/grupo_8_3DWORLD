'use strict';
const bcrypt = require('bcryptjs')
const {  Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'roles_id',
        as: 'roles'
    });
    }

    static  findByEmail(email) {
      return User.findOne({
        where: {
          email: email
        }
      });
    }

  }
  User.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
   password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  roles_id: {
    type: DataTypes.INTEGER,
  }}, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, 10)
      }
    }
  });
  return User;
};