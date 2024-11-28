const { SiteInfo } = require('../models');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/app-error');
class SiteInfoController {
    async insertSiteInfo(req, res,next) {
        const icon = req.files.icon[0].path.replace(/\\/g, '/')
        req.body.icon = icon
        req.body.adminId = req.user.id
        const newCategory = await SiteInfo.create(req.body);
        res.status(200).json({ message: 'Category created successfully', payload: { Category : newCategory}, success: true });
    }


    async getSiteInfo(req, res) {
      const allSiteInfo = await SiteInfo.findAll(req.queryOptions)
      res.status(200).json({ message: 'Website Category got successfully', payload: { Category : allCategory}, success: true });
    }

    async getSingleSiteInfo(req, res) {
      const singleCategory = await SiteInfo.findByPk(req.params.id)
      res.status(200).json({ message: 'Website Category got successfully', payload: { Category : singleCategory}, success: true });
  }


    async updateSiteInfo(req, res) {
      if(req.files && req.files.icon && req.files.icon[0]){
        const icon = req.files.icon[0].path.replace(/\\/g, '/')
        req.body.icon = icon
      }
      const allCategory = await SiteInfo.update(req.body,{
        where: { id: req.params.id },
      })
      res.status(200).json({ message: 'Website Category updated successfully', payload: { Category : allCategory}, success: true });
  }


    async deleteCategory(req, res) {
          const SiteInfoId = req.params.id;
          await SiteInfo.destroy({
            where: {
              id: SiteInfoId // replace 'someId' with the actual ID or condition to match
            }
          });
          
        res.status(200).json({ message: 'Category deleted successfully', payload: null, success: true });
    }
}

module.exports = new SiteInfoController();