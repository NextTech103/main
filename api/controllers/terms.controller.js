const { Terms } = require('../models');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/app-error');
const { where } = require('sequelize');
class TermsController {
    async insertTerms(req, res,next) {
        const existingData = await Terms.findOne({ where : { adminId : req.adminId}});
        if(existingData){
            return next(new AppError('You already have added delivery charge',400))
        }
        req.body.adminId = req.user.id
        const newTerms = await Terms.create(req.body);
        res.status(200).json({ message: 'Terms created successfully', payload: { Terms : newTerms}, success: true });
    }


    async getTerms(req, res) {
        const allTerms = await Terms.findAll(req.queryOptions)
        res.status(200).json({ message: 'Website Terms got successfully', payload: { Terms : allTerms}, success: true });
    }


    async updateTerms(req, res) {
      const allTerms = await Terms.update(req.body,{
        where: { id: req.params.id },
      })
      res.status(200).json({ message: 'Website Terms updated successfully', payload: { Terms : allTerms}, success: true });
  }


    async deleteTerms(req, res) {
          const TermsId = req.params.id;
          await Terms.destroy({
            where: {
              id: TermsId // replace 'someId' with the actual ID or condition to match
            }
          });
          
        res.status(200).json({ message: 'Terms deleted successfully', payload: null, success: true });
    }
}

module.exports = new TermsController();