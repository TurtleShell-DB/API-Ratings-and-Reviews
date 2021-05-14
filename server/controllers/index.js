const model = require('../models');

module.exports = {
  get: (req, res) => {
    const value = req.params.product_id;
    model.readProduct(value, (error, data) => {
      if (error) {
        res.status(400).send(error);
      }
      res.status(201).send(data[0]);
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
      res.status(200).send(data);
    })
  },
  putHelpful: (req, res) => {
    const review = req.params.review_id;
    model.updateHelpful(review, (error, data) => {
      if (error) {
        res.status(400).send(error);
      }
      res.status(200).send(data)
    })
  },
  putReport: (req, res) => {
    const review = req.params.review_id;
    model.updateReport(review, (error, data) => {
      if (error) {
        res.status(400).send(error);
      }
      res.status(200).send(data)
    })
  },
}