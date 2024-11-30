const { Return } = require('../models');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/app-error');
const { where } = require('sequelize');
class ReturnController {
    async insertReturn(req, res,next) {
        const existingData = await Return.findOne({ where : { adminId : req.adminId}});
        if(existingData){
            return next(new AppError('You already have Return',400))
        }
        req.body.adminId = req.user.id
        const newReturn = await Return.create(req.body);
        res.status(200).json({ message: 'Return created successfully', payload: { Return : newReturn}, success: true });
    }


    async getReturn(req, res) {
        const allReturn = await Return.findAll(req.queryOptions)
        res.status(200).json({ message: 'Website Return got successfully', payload: { Return : allReturn}, success: true });
    }


    async updateReturn(req, res) {
      const allReturn = await Return.update(req.body,{
        where: { id: req.params.id },
      })
      res.status(200).json({ message: 'Website Return updated successfully', payload: { Return : allReturn}, success: true });
  }


    async deleteReturn(req, res) {
          const ReturnId = req.params.id;
          await Return.destroy({
            where: {
              id: ReturnId // replace 'someId' with the actual ID or condition to match
            }
          });
          
        res.status(200).json({ message: 'Return deleted successfully', payload: null, success: true });
    }
}

module.exports = new ReturnController();