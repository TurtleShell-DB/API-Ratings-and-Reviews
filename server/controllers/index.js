const model = require('../models');

module.exports = {
  get: (req, res) => {
    const value = req.params.product_id;
    model.readProduct(value, (error, data) => {
      if (error) {
        res.status(400).send(error);
      }
      res.status(201).send(data);
    })
  },
  getMeta: (req, res) => {
    const value = req.params.product_id;
    model.readMeta(value, (error, data) => {
      if (error) {
        res.status(400).send(error);
      }
      res.status(201).send(data);
    })
  }

  
}