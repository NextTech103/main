const { Orders, OrderItems, Products, SoldProducts } = require('../models'); // Adjust the import path as necessary
const { sequelize } = require('../models');
const AppError = require('../utils/app-error');
class UpdateProductQuantitiesMiddleware {
  static async handle(req, res, next) {
    const t = await sequelize.transaction(); 
    try {
      const { id } = req.params; // Expecting orderId and status in the request body
      const { status } = req.body;

      // Check if the status is being updated to 'delivered'
      if (status && (status === 'delivered')) {
        // Fetch the order and its associated order items
        const order = await Orders.findOne({
          where: { id: id },
          include: [{
            model: OrderItems,
            as: 'orderItems',
            include: [{ model: Products, as: 'product' }] // Assuming 'product' is the alias for the Products model
          }]
        });

        if (!order) {
          return next(new AppError('Order not found',404))
        }

        // Loop through orderItems and reduce product quantities
        const promises = order.orderItems.map(async (item) => {
          const product = await Products.findByPk(item.productId); // Assuming productId is the foreign key in orderItems

          if (product) {
            const newQuantity = product.quantity - item.quantity; // Reduce the quantity
            
            // Ensure the quantity does not go negative
            if (newQuantity < 0) {
              return next(new AppError('Insufficient product quantity for product ID: ' + product.id,200))
            }
           
            await SoldProducts.create({quantity: item.quantity, productId: item.id, adminId : item.adminId}, { transaction: t })
            // Update the product's quantity
            await Products.update({ quantity: newQuantity }, { where: { id: product.id } }, { transaction: t });
          }
        });

        // Wait for all product updates to complete
        await Promise.all(promises);
      }

      // Call the next middleware/route handler
      next();
    } catch (error) {
      await t.rollback();
      return next(new AppError('Internal server error',500))
    }
  }
}

module.exports = UpdateProductQuantitiesMiddleware;
