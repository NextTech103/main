'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoldProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SoldProducts.belongsTo(models.Products, {
        foreignKey: 'productId',
        as: 'product' // Alias for the association
      });
      
      SoldProducts.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
        foreignKey: 'adminId', // Foreign key in Orders
        as: 'admin' // Alias to be used in include
      });
    }
  }
  SoldProducts.init({
    soldQuantity:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',  // Refers to the Order table
        key: 'id'
      },
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Admins',  // Refers to the Order table
          key: 'id'
        },
      },
  }, {
    sequelize,
    modelName: 'SoldProducts',
  });
  
  return SoldProducts;
};