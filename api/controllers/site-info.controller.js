const { SiteInfo } = require('../models');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/app-error');
class SiteInfoController {
    async insertSiteInfo(req, res,next) {
        const icon = req.files.siteIcon[0].path.replace(/\\/g, '/')
        req.body.siteIcon = icon
        req.body.adminId = req.user.id
        const newSiteInfo = await SiteInfo.create(req.body);
        res.status(200).json({ message: 'SiteInfo created successfully', payload: { SiteInfo : newSiteInfo}, success: true });
    }


    async getSiteInfo(req, res) {
      const allSiteInfo = await SiteInfo.findAll(req.queryOptions)
      res.status(200).json({ message: 'Website SiteInfo got successfully', payload: { SiteInfo : allSiteInfo}, success: true });
    }

    async getSingleSiteInfo(req, res) {
      const singleSiteInfo = await SiteInfo.findByPk(req.params.id)
      res.status(200).json({ message: 'Website SiteInfo got successfully', payload: { SiteInfo : singleSiteInfo}, success: true });
  }


    async updateSiteInfo(req, res) {
      if(req.files && req.files.siteIcon && req.files.siteIcon[0]){
        const icon = req.files.siteIcon[0].path.replace(/\\/g, '/')
        req.body.siteIcon = icon
      }
      const allSiteInfo = await SiteInfo.update(req.body,{
        where: { id: req.params.id },
      })
      res.status(200).json({ message: 'Website SiteInfo updated successfully', payload: { SiteInfo : allSiteInfo}, success: true });
  }


    async deleteSiteInfo(req, res) {
          const SiteInfoId = req.params.id;
          await SiteInfo.destroy({
            where: {
              id: SiteInfoId // replace 'someId' with the actual ID or condition to match
            }
          });
          
        res.status(200).json({ message: 'SiteInfo deleted successfully', payload: null, success: true });
    }
}

module.exports = new SiteInfoController();