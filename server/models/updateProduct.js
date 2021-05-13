const db = require('../../db');

module.exports = {
  updateHelpful: (review, callback) => {
    db.queryAsync(`UPDATE Product SET helpfulness=helpfulness + 1 WHERE review_id=${review}`)
      .then((data) => callback(null, data))
      .then((error) => callback(null, error))
  },
  updateReport: (review, callback) => {
    db.queryAsync(`UPDATE Product SET reported=reported + 1 WHERE review_id=${review}`)
      .then((data) => callback(null, data))
      .then((error) => callback(null, error))
  },
}