const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            // define association here
            Category.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
              foreignKey: 'adminId', // Foreign key in Orders
              as: 'admin' // Alias to be used in include
            });
          }
    }

    Category.init({
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
          },
          icon: {
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
          },
          adminId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Admins',  // Refers to the Order table
              key: 'id'
            },
          },
          
    },{
        sequelize,
        modelName: 'Categories',
      })
      return Category;
}
  