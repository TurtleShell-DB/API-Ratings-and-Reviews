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
  },
  post: (req, res) => {
    const value = req.body;
    model.postProduct(value, (error, data) => {
      if (error) {
        res.status(400).send(error);
      }
      res.status(200).send();
    })
    //create variable that has req body
    //pass to model postProduct the value and error first callback
  }
}