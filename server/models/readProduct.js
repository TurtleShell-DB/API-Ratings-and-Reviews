const db = require('../../db');

module.exports = {
  readProduct: (value, callback) => {
    const container = [];
    const promiseContainer = [];
    let queryContain = null;
    db.queryAsync(`SELECT review_id, rating, date, summary,
      body, recommend, name, email, response, helpfulness
      FROM product WHERE product_id=${value}`)
      .then((products) => {
        const data = {
          product: value,
          page: null,
          count: null,
          results: [],
        };
        products[0].forEach((product) => {
          const result = JSON.parse(JSON.stringify(product));
          if (result.recommend === 1) {
            result.recommend = true
          }
          if (result.recommend === 0) {
            result.recommend = false
          }
          data.results.push(result);
        });
        return data;
      })
      .then((data) => {
        for (let i = 0; i < data.results.length; i++) {
          const result = data.results[i];
          const photoQuery = db.queryAsync(`SELECT id, url FROM photos
            INNER JOIN product ON photos.review_id = product.review_id
            WHERE product.review_id=${result.review_id}`)
              .then((photos) => {
                data.results[i].photos = JSON.parse(JSON.stringify(photos[0]));
                return data;
              });
          // console.log(promiseContainer);
          queryContain = photoQuery;
        }
    promiseContainer.push(queryContain)
    Promise.all(promiseContainer)
      .then((data) => callback(null, data))
      .catch((error) => callback(null, error))
      })
  },
}