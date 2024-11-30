'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Terms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Terms.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
        foreignKey: 'adminId', // Foreign key in Orders
        as: 'admin' // Alias to be used in include
      });
    }
  }
  Terms.init({
    description: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'Terms',
  });
  
  return Terms;
};