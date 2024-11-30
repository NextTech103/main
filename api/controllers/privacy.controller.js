const { Privacy } = require('../models');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/app-error');
const { where } = require('sequelize');
class PrivacyController {
    async insertPrivacy(req, res,next) {
        const existingData = await Privacy.findOne({ where : { adminId : req.adminId}});
        if(existingData){
            return next(new AppError('You already have added delivery charge',400))
        }
        req.body.adminId = req.user.id
        const newPrivacy = await Privacy.create(req.body);
        res.status(200).json({ message: 'Privacy created successfully', payload: { Privacy : newPrivacy}, success: true });
    }


    async getPrivacy(req, res) {
        const allPrivacy = await Privacy.findAll(req.queryOptions)
        res.status(200).json({ message: 'Website Privacy got successfully', payload: { Privacy : allPrivacy}, success: true });
    }


    async updatePrivacy(req, res) {
      const allPrivacy = await Privacy.update(req.body,{
        where: { id: req.params.id },
      })
      res.status(200).json({ message: 'Website Privacy updated successfully', payload: { Privacy : allPrivacy}, success: true });
  }


    async deletePrivacy(req, res) {
          const PrivacyId = req.params.id;
          await Privacy.destroy({
            where: {
              id: PrivacyId // replace 'someId' with the actual ID or condition to match
            }
          });
          
        res.status(200).json({ message: 'Privacy deleted successfully', payload: null, success: true });
    }
}

module.exports = new PrivacyController();