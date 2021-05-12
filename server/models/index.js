const db = require('../../db');
const { readMeta } = require('./readMeta.js');
const { readProduct } = require('./readProduct.js');
const { postProduct } = require('./postProduct.js');

module.exports = {
  readMeta,
  readProduct,
  postProduct,
}
