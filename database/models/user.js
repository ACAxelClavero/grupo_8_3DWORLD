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
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'roles_id',
        as: 'roles'
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
  phone: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  roles_id: {
    type: DataTypes.INTEGER,
  }}, {
    sequelize,
    modelName: 'User',
  });
  return User;
};