const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        static associate(models) {
            Orders.belongsTo(models.Users, { // Ensure 'Users' is imported correctly
                foreignKey: 'userId', // Foreign key in Orders
                as: 'user' // Alias to be used in include
            });
        
            // If there are other associations, define them here
            Orders.hasMany(models.OrderItems, {
                foreignKey: 'orderId', // Adjust according to your OrderItems schema
                as: 'orderItems' // Alias to be used in include
            });

            Orders.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
                foreignKey: 'adminId', // Foreign key in Orders
                as: 'admin' // Alias to be used in include
              });
          }
    }

    Orders.init({
        quantity: {
            type : DataTypes.INTEGER,
            allowNull:false,
            validate: {
                notEmpty: true
            }
        },
        deliveryAddress: {
            type : DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
        },
        deliveryPhoneNumber: {
            type : DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Users',  // Refers to the Order table
              key: 'id'
            }
        },
        isDirectSale: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false // or true, depending on your default preference
        },
        username: DataTypes.STRING,
        deliveryCharge: DataTypes.INTEGER,
        totalPrice: DataTypes.INTEGER,
        deliverNote: DataTypes.STRING,
        status : Sequelize.ENUM('pending', 'accepted', 'ondelivery', 'delivered','cancelled'),
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
        modelName: 'Orders',
      })
    return Orders;
}