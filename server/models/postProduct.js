const db = require('../../db');
const moment = require('moment');

module.exports = {
  postProduct: (value, callback) => {
    //parse the value into seperate variables
    const currentDate = moment(new Date()).format('MMM Do YYYY');
    const helpfulness = 0;
    const reported = 0;
    let {body, email, name, product_id, rating, recommend,
      summary, photos, characteristics} = value;
    rating === true ? rating = 1 : rating = 0
    const product = [product_id, rating, currentDate, summary,
      body, recommend, name, email, helpfulness, reported];
    // const queryProduct = `INSERT INTO Product (product_id, rating,
    //   date, summary, body, recommend, name, email, helpfulness, reported) VALUES ?`
    // //make multiple INSERT INTO queries and add to the four different databases
    // db.query(queryProduct, values)


  }
}