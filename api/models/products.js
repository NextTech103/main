'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Categories, {
        foreignKey: 'productcategory',
        as: 'category' // Alias for the association
      });
      
      Products.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
        foreignKey: 'adminId', // Foreign key in Orders
        as: 'admin' // Alias to be used in include
      });
    }
  }
  Products.init({
    productname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product name is required'  // Moved inside notEmpty validator
        }
      }
    },
    productcategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',  // Refers to the Order table
        key: 'id'
      },
      validate: {
        notEmpty: {
          msg: 'Product category is required'  // Moved inside notEmpty validator
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Quantity is required'  // Moved inside notEmpty validator and updated message
        }
      }
    },
    brandname: DataTypes.STRING,
    buyingprice: DataTypes.INTEGER,
    sellingprice: DataTypes.INTEGER,
    regularprice: DataTypes.INTEGER,
    supplier: DataTypes.STRING,
    productdescription: DataTypes.TEXT,
    pimage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Product Image is required'  // Moved inside notEmpty validator and updated message
        }
      }
    },
    pimage2: DataTypes.STRING,
    pimage3: DataTypes.STRING,
    isflash:{
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    totalRating:{
      type: DataTypes.FLOAT(10, 1),
      allowNull: false,
      defaultValue: 0.0
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
    modelName: 'Products',
  });
  
  return Products;
};