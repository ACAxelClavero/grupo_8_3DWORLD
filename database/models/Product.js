'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Product.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  color: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.TEXT
  },
  photo1: {
    type: DataTypes.TEXT
  },
  photo2: {
    type: DataTypes.TEXT
  },
  photo3: {
    type: DataTypes.TEXT
  },
  photo4: {
    type: DataTypes.TEXT
  },
  materials: {
    type: DataTypes.TEXT
  },
  size: {
    type: DataTypes.TEXT
  }},
  {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};