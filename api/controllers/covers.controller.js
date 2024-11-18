const { Covers } = require('../models');
const _ = require('lodash');
const jwt = require('jsonwebtoken')
class CoverController {
    async insertCover(req, res) {
        const coverimage = req.files.coverimage[0].path.replace(/\\/g, '/')
        req.body.coverimage = coverimage
        req.body.adminId = req.user.id
        const newCover = await Covers.create(req.body);
        res.status(200).json({ message: 'Website cover created successfully', payload: { cover : newCover}, success: true });
    }


    async getCover(req, res) {
      const cover = await Covers.findAll(req.queryOptions)
      res.status(200).json({ message: 'Website cover got successfully', payload: { cover : cover}, success: true });
    }


    async deleteCover(req, res) {
          const coverId = req.params.id;
          await Covers.destroy({
            where: {
              id: coverId // replace 'someId' with the actual ID or condition to match
            }
          });
          
        res.status(200).json({ message: 'Cover deleted successfully', payload: null, success: true });
    }
}

module.exports = new CoverController();