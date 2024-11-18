const { DeliveryCharge } = require('../models');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/app-error');
const { where } = require('sequelize');
class DeliveryChargeController {
    async insertDeliveryCharge(req, res,next) {
        const existingData = await DeliveryCharge.findOne({ where : { adminId : req.adminId}});
        if(existingData){
            return next(new AppError('You already have a delivery charge data',400))
        }
        req.body.adminId = req.user.id
        const newDeliveryCharge = await DeliveryCharge.create(req.body);
        res.status(200).json({ message: 'DeliveryCharge created successfully', payload: { DeliveryCharge : newDeliveryCharge}, success: true });
    }


    async getDeliveryCharge(req, res) {
        const allDeliveryCharge = await DeliveryCharge.findAll(req.queryOptions)
        res.status(200).json({ message: 'Website DeliveryCharge got successfully', payload: { DeliveryCharge : allDeliveryCharge}, success: true });
    }


    async updateDeliveryCharge(req, res) {
      const allDeliveryCharge = await DeliveryCharge.update(req.body,{
        where: { id: req.params.id },
      })
      res.status(200).json({ message: 'Website DeliveryCharge updated successfully', payload: { DeliveryCharge : allDeliveryCharge}, success: true });
  }


    async deleteDeliveryCharge(req, res) {
          const DeliveryChargeId = req.params.id;
          await DeliveryCharge.destroy({
            where: {
              id: DeliveryChargeId // replace 'someId' with the actual ID or condition to match
            }
          });
          
        res.status(200).json({ message: 'DeliveryCharge deleted successfully', payload: null, success: true });
    }
}

module.exports = new DeliveryChargeController();