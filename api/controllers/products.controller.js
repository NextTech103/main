const { Products } = require('../models');
const { Categories } = require('../models')
const { OrderItems } = require('../models');
const { sequelize } = require('../models');
const _ = require('lodash');
class ProductController {
    async insertProduct(req, res){
        const {productname,productcategory,quantity,brandname,buyingprice,sellingprice,regularprice,supplier,productdescription} = req.body;
        const adminId = req.user.id;
        const pimage = req.files.pimage ? req.files.pimage[0].path.replace(/\\/g, '/') : null;
        const pimage2 = req.files.pimage2 ? req.files.pimage2[0].path.replace(/\\/g, '/') : null;
        const pimage3 = req.files.pimage3 ? req.files.pimage3[0].path.replace(/\\/g, '/') : null;
        const newProduct = await Products.create({ productname,productcategory,quantity,brandname,buyingprice,sellingprice,regularprice,supplier,productdescription,pimage, pimage2, pimage3, adminId });
        res.status(201).json({ message: 'Product added successfully', payload: { product : newProduct}, success: true });  
    }

    async getProduct(req, res){
        const product = await Products.findAll({
          ...req.queryOptions,
            include: [ // Nesting the Product model inside OrderItems
              {
                model: Categories,  // Assuming the model is called Products
                as: 'category',    // Ensure this alias matches the association name
                attributes: ['name'],  // Include only the 'pimage' field
                required: false
              }
            ]
        });
        res.status(200).json({ message: 'Product retrieved successfully', payload: { product : product}, success: true });  
    }


    async getSingeProduct(req, res) {
      const token = req.header('Authorization')
      const id = req.params.id;
      let product = await Products.findOne({ where: { id } })
      if(!token){
        product = _.omit(product.toJSON(), 'buyingprice');
      }
      res.status(200).json({ message: 'Product retrieved successfully', payload: { product : product}, success: true });  
    }


    async updateProduct(req, res){
      const product = await Products.update(req.body,{
        where: { id: req.params.id },
    })
    res.status(200).json({ message: 'Product updated successfully', payload: { product : product}, success: true });  
    }


    async deleteProduct(req, res) {
        const t = await sequelize.transaction();
        const productId = req.params.id;
        await OrderItems.destroy({
          where: {
            productId: productId 
          },
          transaction: t
        })
        await Products.destroy({
          where: {
            id: productId 
          },
          transaction: t
        });

        await t.commit();
        res.status(200).json({ message: 'Product deleted successfully', payload: null, success: true });
  }
}

module.exports = new ProductController();