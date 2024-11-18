const { Products, Orders, SoldProducts, Users, Ratings } = require('../models')
const { Sequelize, where } = require('sequelize');
class DashboardController {
    async getTopSoldProducts(req, res, next) {
        const totalSalesData = await SoldProducts.findAll({
            attributes:[[Sequelize.fn('SUM',Sequelize.col('soldQuantity')), 'totalQuantity']],where: { adminId : req.adminId}})
        const totalSales = totalSalesData[0].get('totalQuantity') || 1;
        const topProducts = await SoldProducts.findAll({
            attributes: [
                "productId",
                [Sequelize.fn('SUM',Sequelize.col('soldQuantity')),"totalSold"],
                [Sequelize.literal(`SUM(quantity) / ${totalSales}`),"soldPercentage"]
            ],
            group: ['productId'],
            include: [{
                model: Products,
                as: 'product',
                attributes: ['productname', 'sellingprice'], // Customize attributes you want from the Products table
            }],
            order: [[Sequelize.literal('soldPercentage'), 'DESC']], // Sort by highest percentage
            limit: 10,
        })

        console.log(topProducts)
        console.log(totalSales)
        console.log(totalSalesData)
        
        const result = topProducts.map(product => ({
            productId: product.productId,
            productName: product.Product.name,
            totalSold: product.get('totalSold'),
            soldPercentage: parseFloat(product.get('soldPercentage').toFixed(2)), // Formatting percentage to 2 decimal points
        }));
        res.status(200).json({ message: 'Top sold products got successfully', payload: result, success: true });
        
    }


    async getCardStat(req,res,next){
        const [totalProducts, totalOrders, totalUsers, totalRating] = await Promise.all([
            Products.count(req.queryOptions),
            Orders.count(req.queryOptions),
            Users.count(req.queryOptions),
            Ratings.count(req.queryOptions)
        ]);   
        const totalStat = {
            'products': totalProducts,
            'orders':totalOrders,
            'users':totalUsers,
            'ratings':totalRating
        }
        res.status(200).json({ message: 'Got dashboard stat successfully', payload: totalStat, success: true });
    }
}



module.exports = new DashboardController()