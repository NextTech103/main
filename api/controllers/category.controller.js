const { Categories } = require('../models');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/app-error');
class CategoryController {
    async insertCategory(req, res,next) {
        const icon = req.files.icon[0].path.replace(/\\/g, '/')
        req.body.icon = icon
        req.body.adminId = req.user.id
        const newCategory = await Categories.create(req.body);
        res.status(200).json({ message: 'Category created successfully', payload: { Category : newCategory}, success: true });
    }


    async getCategory(req, res) {
      const allCategory = await Categories.findAll(req.queryOptions)
      res.status(200).json({ message: 'Website Category got successfully', payload: { Category : allCategory}, success: true });
    }

    async getSingleCategory(req, res) {
      const singleCategory = await Categories.findByPk(req.params.id)
      res.status(200).json({ message: 'Website Category got successfully', payload: { Category : singleCategory}, success: true });
  }


    async updateCategory(req, res) {
      if(req.files && req.files.icon && req.files.icon[0]){
        const icon = req.files.icon[0].path.replace(/\\/g, '/')
        req.body.icon = icon
      }
      const allCategory = await Categories.update(req.body,{
        where: { id: req.params.id },
      })
      res.status(200).json({ message: 'Website Category updated successfully', payload: { Category : allCategory}, success: true });
  }


    async deleteCategory(req, res) {
          const CategoryId = req.params.id;
          await Categories.destroy({
            where: {
              id: CategoryId // replace 'someId' with the actual ID or condition to match
            }
          });
          
        res.status(200).json({ message: 'Category deleted successfully', payload: null, success: true });
    }
}

module.exports = new CategoryController();