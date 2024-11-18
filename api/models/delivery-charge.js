const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DeliveryCharge extends Model {
        static associate(models) {
            // define association here
            DeliveryCharge.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
              foreignKey: 'adminId', // Foreign key in Orders
              as: 'admin' // Alias to be used in include
            });
          }
    }

    DeliveryCharge.init({
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          city: {
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
          },
          chargeInside: {
            type: Sequelize.INTEGER,
            allowNull:false,
            validate: {
                notEmpty: true
            }
          },
          chargeOutside: {
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
        modelName: 'DeliveryCharge',
      })
      return DeliveryCharge;
}
  