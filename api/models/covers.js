const {
    Model
  } = require('sequelize'); 
  module.exports = (sequelize, DataTypes) => {
    class Covers extends Model {
        static associate(models) {
            Covers.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
                foreignKey: 'adminId', // Foreign key in Orders
                as: 'admin' // Alias to be used in include
              });
        }
    }

    Covers.init({
        coverimage: {
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true,  // validate non-empty values
            },
        },
        covertitle: {
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true,  // validate non-empty values
            },
        },
        covercategory:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true,  // validate non-empty values
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
        modelName: 'Covers',
      })
    return Covers
  }