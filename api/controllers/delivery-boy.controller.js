const { DeliveryBoy } = require('../models');
const _ = require('lodash');
const jwt = require('jsonwebtoken')
class DeliveryBoyController {
    async insertDeliveryBoy(req, res) {
      console.log(req.body)
        const newDeliveryBoy = await DeliveryBoy.create(req.body);
        res.status(200).json({ message: 'DeliveryBoy created successfully', payload: { DeliveryBoy : newDeliveryBoy}, success: true });
    }


    async getDeliveryBoy(req, res) {
        const allDeliveryBoy = await DeliveryBoy.findAll(req.queryOptions)
        res.status(200).json({ message: 'Website DeliveryBoy got successfully', payload: { DeliveryBoy : allDeliveryBoy}, success: true });
    }


    async deleteDeliveryBoy(req, res) {
          const DeliveryBoyId = req.params.id;
          await DeliveryBoy.destroy({
            where: {
              id: DeliveryBoyId // replace 'someId' with the actual ID or condition to match
            }
          });
          
        res.status(200).json({ message: 'DeliveryBoy deleted successfully', payload: null, success: true });
    }
}

module.exports = new DeliveryBoyController();