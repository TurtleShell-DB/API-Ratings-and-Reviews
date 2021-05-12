const db = require('../../db');

module.exports = {
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