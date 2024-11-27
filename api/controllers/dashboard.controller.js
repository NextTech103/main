const { Products, Orders, SoldProducts, Users, Ratings } = require('../models')
const { Sequelize, where } = require('sequelize');
class DashboardController {
    async getTopSoldProducts(req, res, next) {
        try {
            // Get total sales quantity
            const totalSalesData = await SoldProducts.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('soldQuantity')), 'totalQuantity']
                ],
                where: { adminId: req.adminId }
            });
            
            // If no data found, default to 1 to avoid division by zero
            const totalSales = totalSalesData[0]?.get('totalQuantity') || 1;
    
            // Get top sold products
            const topProducts = await SoldProducts.findAll({
                attributes: [
                    'productId',
                    [Sequelize.fn('SUM', Sequelize.col('soldQuantity')), 'totalSold'],
                    [Sequelize.literal(`SUM(soldQuantity) / ${totalSales}`), 'soldPercentage']
                ],
                group: ['productId'],
                include: [
                    {
                        model: Products,
                        as: 'product', // Make sure to use the correct alias
                        attributes: ['productname', 'sellingprice'], // Customize attributes you want from the Products table
                    }
                ],
                order: [[Sequelize.literal('soldPercentage'), 'DESC']], // Sort by highest percentage
                limit: 10,
            });
    
            // Map the result to the desired output format
            const result = topProducts.map(product => ({
                productId: product.productId,
                productName: product.product.productname,  // Corrected field reference
                totalSold: product.get('totalSold'),
                soldPercentage: product.get('soldPercentage')*100, // Formatting percentage to 2 decimal points
            }));
    
            // Send the response
            res.status(200).json({ message: 'Top sold products retrieved successfully', payload: result, success: true });
    
        } catch (error) {
            console.error(error);
            next(error);  // Call the next middleware to handle the error properly
        }
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