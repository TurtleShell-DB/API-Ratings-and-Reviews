const db = require('../../db');
const { readMeta } = require('./readMeta.js');
const { readProduct } = require('./readProduct.js');
const { postProduct } = require('./postProduct.js');
const { updateHelpful, updateReport } = require('./updateProduct.js');

module.exports = {
  readMeta,
  readProduct,
  postProduct,
  updateHelpful,
  updateReport,
}
