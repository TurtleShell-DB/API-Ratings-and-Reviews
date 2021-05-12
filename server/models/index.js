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

  readMeta: (value, callback) => {
    const container = [];
    const charaContainer = [];
    const data = {
      product_id: value,
      ratings: {},
      recommended: {},
      characteristics: {}
    }
    db.queryAsync(`SELECT rating, recommend FROM Product WHERE product_id=${value}`)
      .then((reviews) => {
        const review = (JSON.parse(JSON.stringify(reviews[0])));
        review.forEach((rating) => {
          data.ratings[rating.rating] === undefined ? data.ratings[rating.rating] = 1 : data.ratings[rating.rating] += 1;
          data.recommended[rating.recommend] === undefined ? data.recommended[rating.recommend] = 1 : data.recommended[rating.recommend] += 1;
        })
        return data;
      })
    db.queryAsync(`SELECT Characteristics.characteristic_id,
      Characteristics.name, Characteristics_values.id, Characteristics_values.value FROM Characteristics
      INNER JOIN Characteristics_values ON Characteristics.characteristic_id =
      Characteristics_values.characteristic_id WHERE Characteristics.product_id=${value};`)
        .then((charas) => {
          const characteristic = {};
          const chara = JSON.parse(JSON.stringify(charas[0]));
          let countTracker = {};
          chara.forEach((value) => {
            if(characteristic[value.name] === undefined) {
              countTracker[value.name] = 1,
              characteristic[value.name] = {
                id: value.characteristic_id,
                value: value.value
              }
            } else {
              countTracker[value.name] += 1;
              characteristic[value.name].value += value.value
            }
          })
          Object.keys(countTracker).forEach((name) => {
            if (characteristic[name]) {
              characteristic[name].value = characteristic[name].value / countTracker[name]
            }
          })
          data.characteristics = characteristic
          console.log(data);
          return data;
        })
        .then((data) => callback(null, data))
        .catch((error) => callback(null, error))
  },
}
