const { Ratings } = require('../models');
const { Products } = require('../models')
const { Users } = require('../models')
const { OrderItems } = require('../models')
const { Orders } = require('../models')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');
const AppError = require('../utils/app-error');

class RatingsController {
    async insertRatings(req, res,next) {
        const transaction = await sequelize.transaction();
        try{
            req.body.userId = req.user.id;
            const newRatings = await Ratings.create(req.body,{ transaction });
            const avgRating = await Ratings.findOne({
                where: { productId: req.body.productId }, 
                attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']],
                transaction
              });
            const avgRatingValue = parseFloat(avgRating.getDataValue('avgRating')).toFixed(1);
            await Products.update(
                { totalRating: avgRatingValue },
                { where: { id: req.body.productId }, transaction }
              );
            await transaction.commit();
            res.status(200).json({ message: 'Ratings created successfully', payload: { Ratings : newRatings}, success: true });
        } catch(err){
            await transaction.rollback();
            return next(new AppError(err,400))
        }
        
    }


    async getRatings(req, res) {
        let canReview = false;
        const allRatings = await Ratings.findAll({
            ...req.queryOptions,  // Spread the query options
          include: [
              {
                  model: Users,
                  as: 'user',
                  required: false,
                  attributes: { exclude: ['password'] },
              }
        ],
        })
        if(req.header('Authorization') && req.header('Authorization') != null){
           const token = req.header('Authorization');
           try{
               const user = await jwt.verify(token,'secretkey123');
               const relatedOrder = await OrderItems.findOne({where:{ userId:user.id, productId: req.query.productId}})
               if(relatedOrder){
                 const orderStatus = await Orders.findOne({ where: { id: relatedOrder.orderId}})
                 if(orderStatus && orderStatus.status == "delivered"){
                  canReview = true;
                 }
               }  
           } catch(err){
               console.log('Never mind')
           }
        }
        res.status(200).json({ message: 'Website Ratings got successfully', payload: { Ratings : allRatings, canReview: canReview}, success: true });
    }


    async deleteRatings(req, res) {
          const RatingsId = req.params.id;
          await Ratings.destroy({
            where: {
              id: RatingsId // replace 'someId' with the actual ID or condition to match
            }
          });
          
        res.status(200).json({ message: 'Ratings deleted successfully', payload: null, success: true });
    }
}

module.exports = new RatingsController();