const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ratings extends Model {
        static associate(models) {
            // define association here
            Ratings.belongsTo(models.Users, { // Ensure 'Users' is imported correctly
              foreignKey: 'userId', // Foreign key in Orders
              as: 'user' // Alias to be used in include
            });
            Ratings.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
              foreignKey: 'adminId', // Foreign key in Orders
              as: 'admin' // Alias to be used in include
            });
          }
    }
    Ratings.init({
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          comment: {
            type: Sequelize.STRING,
            defaultValue: '',
          },
          productId: {
            type: Sequelize.INTEGER,
            allowNull:false,
            validate: {
                notEmpty: true
            }
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull:false,
            validate: {
                notEmpty: true
            },
            references: {
              model: 'Users',  // Refers to the Order table
              key: 'id'
            }
          },
          rating: {
            type: Sequelize.INTEGER,
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
        modelName: 'Ratings',
      })
      return Ratings;
}
  