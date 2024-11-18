const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderItems extends Model {
        static associate(models) {
            // define association here
            OrderItems.belongsTo(models.Orders, {
              foreignKey: 'orderId',
              as: 'order' // Alias for the association
            });
            OrderItems.belongsTo(models.Products, {
              foreignKey: 'productId',
              as: 'product' // Alias for the association
            });

            OrderItems.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
              foreignKey: 'adminId', // Foreign key in Orders
              as: 'admin' // Alias to be used in include
            });
          }
    }

    OrderItems.init({
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          orderId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Orders',  // Refers to the Order table
              key: 'id'
            }
          },
          productId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Products',  // Refers to the Product table
              key: 'id'
            }
          },
          productName: {
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
          },
          quantity: {
            type: Sequelize.INTEGER,  // Quantity of the product in the order
            allowNull: false,
            validate: {
                notEmpty: true
            }
          },
          price: {
            type: Sequelize.DECIMAL(10, 2),  // Price of the product at the time of the order
            allowNull: false,
            validate: {
                notEmpty: true
            }
          },
          userId: Sequelize.INTEGER,
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
        modelName: 'OrderItems',
      })
      return OrderItems;
}
  