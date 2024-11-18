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


    async directSales(req,res){
      const t = await sequelize.transaction();
      try {
       const { orderItem, ...orderData } = req.body;
       orderData.adminId = req.adminId
       orderData.totalPrice = orderItem.reduce((total, item) => total + item.price*item.quantity, 0);
       orderData.totalPrice += orderData.deliveryCharge;
       orderData.status = 'delivered';
       const newOrder = await Orders.create(orderData,{ transaction: t });
       const insertId = newOrder.id;
       await Promise.all(orderItem.map(async item =>{
        OrderItems.create({
          orderId: insertId,  // Link the order with items
          productId: item.id,
          quantity: item.quantity,
          productName: item.name,
          price: item.price,
          userId: req.user ? req.user.id : null,
          adminId: req.adminId
        }, { transaction: t });
      
        const product = Products.findByPk(item.productId);
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
        SoldProducts.create({quantity: item.quantity, productId: item.id, adminId : item.adminId}, { transaction: t })
       }));
       await t.commit();
       res.status(201).json({ message: 'Order placed successfully', payload: { order : newOrder}, success: true });
      } catch(err){
       console.log(err)
       await t.rollback();
       res.status(201).json({ message: 'Failed to place order', payload: null , success: false });
      }
      
    }
}

module.exports = new OrderController()