const { Orders } = require('../models')
const { Users } = require('../models')
const { Products } = require('../models');
const { OrderItems } = require('../models')
const { SoldProducts } = require('../models')
const { sequelize } = require('../models');
const _ = require('lodash');


class OrderController{
    async insertOrder(req, res){
      const t = await sequelize.transaction();
       try {
        const { orderItem, ...orderData } = req.body;
        orderData.adminId = req.adminId
        orderData.totalPrice = orderItem.reduce((total, item) => total + item.price*item.quantity, 0);
        orderData.totalPrice += orderData.deliveryCharge;
        if(orderData.isDirectSale){
          orderData.status = "delivered";
        } else {
          orderData.status = "pending";
        }
        
        if(!orderData.username && req.user){
          const userInfo = await Users.findByPk(req.user.id);
          if(userInfo){
            orderData.username = userInfo.username;
          }
        }
        const newOrder = await Orders.create(orderData,{ transaction: t });
        const insertId = newOrder.id;
        await Promise.all(orderItem.map(item =>
         OrderItems.create({
             orderId: insertId,  // Link the order with items
             productId: item.id,
             quantity: item.quantity,
             productName: item.name,
             price: item.price,
             userId: req.user ? req.user.id : null,
             adminId: req.adminId
           }, { transaction: t })
        ));
        await t.commit();
        res.status(201).json({ message: 'Order placed successfully', payload: { order : newOrder}, success: true });
       } catch(err){
        console.log(err)
        await t.rollback();
        res.status(201).json({ message: 'Failed to place order', payload: null , success: false });
       }
       
    }

    async getOrder(req, res) {
      const { username } = req.query;
        const allOrder = await Orders.findAll({
          ...req.queryOptions,  // Spread the query options
          include: [
            {
              model: OrderItems,
              as: 'orderItems',
              required: false,
              include: [ // Nesting the Product model inside OrderItems
                {
                  model: Products,  // Assuming the model is called Products
                  as: 'product',    // Ensure this alias matches the association name
                  attributes: ['pimage'],  // Include only the 'pimage' field
                  required: false
                }
              ]
            },
            {
              model: Users,
              as: 'user',
              required: false,
              attributes: { exclude: ['password'] },
              where: req.query.username ? { username } : undefined
            }
          ]
        });
        
        res.status(200).json({ message: 'Orders got successfully', payload: { order : allOrder}, success: true });
    }


    async updateOrder(req, res) {
        const newOrder = await Orders.update(req.body,{
            where: { id: req.params.id },
        })
        res.status(200).json({ message: 'Orders updated successfully', payload: { order : newOrder}, success: true });
    }


    async directSales(req, res) {
      const t = await sequelize.transaction();
      try {
        const { orderItem, ...orderData } = req.body;
        orderData.adminId = req.adminId;
        orderData.totalPrice = orderItem.reduce((total, item) => total + item.price * item.quantity, 0);
        orderData.totalPrice += orderData.deliveryCharge;
        orderData.status = 'delivered';
        const newOrder = await Orders.create(orderData, { transaction: t });
        const insertId = newOrder.id;
    
        // Collect OrderItems and SoldProducts to bulk insert later
        const orderItemsData = [];
        const soldProductsData = [];
        const productsToUpdate = [];
    
        for (const item of orderItem) {
          orderItemsData.push({
            orderId: insertId,
            productId: item.id,
            quantity: item.quantity,
            productName: item.name,
            price: item.price,
            userId: req.user ? req.user.id : null,
            adminId: req.adminId
          });
    
          const product = await Products.findByPk(item.id); // Await the result of product lookup
          if (!product) {
            return next(new AppError('Product not found for ID: ' + item.id, 404));
          }
    
          const newQuantity = product.quantity - item.quantity; // Reduce the quantity
    
          if (newQuantity < 0) {
            return next(new AppError('Insufficient product quantity for product ID: ' + item.id, 400));
          }
    
          soldProductsData.push({
            soldQuantity: item.quantity,
            productId: item.id,
            adminId: req.adminId
          });
    
          // Store the product data for bulk update
          productsToUpdate.push({
            id: item.id,
            quantity: newQuantity
          });
        }
    
        // Bulk insert OrderItems
        await OrderItems.bulkCreate(orderItemsData, { transaction: t });
    
        // Bulk insert SoldProducts
        await SoldProducts.bulkCreate(soldProductsData, { transaction: t });
    
        // Bulk update products
        for (const product of productsToUpdate) {
          await Products.update(
            { quantity: product.quantity },
            { where: { id: product.id }, transaction: t }
          );
        }
    
        await t.commit();
        res.status(201).json({ message: 'Order placed successfully', payload: { order: newOrder }, success: true });
      } catch (err) {
        console.log(err);
        await t.rollback();
        res.status(201).json({ message: 'Failed to place order', payload: null, success: false });
      }
    }
    
    
}

module.exports = new OrderController()