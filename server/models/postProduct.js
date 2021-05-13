const db = require('../../db');
const moment = require('moment');

module.exports = {
  postProduct: (value, callback) => {
    //query product
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const helpfulness = 0;
    const reported = 0;
    let {body, email, name, product_id, rating, recommend,
      summary, photos, characteristics} = value;
    recommend === true ? recommend = 1 : recommend = 0;
    const product = [product_id, rating, currentDate, summary,
    body, recommend, reported, name, email, helpfulness];
    let productStr = `INSERT INTO Product (product_id, rating, date, summary, body, `
    productStr += `recommend, reported, name, email, helpfulness) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    db.queryAsync(productStr, product)
      .then((response) => {
        photos.forEach((url) => {
          console.log('url', typeof url)
          const id = response[0].insertId
          db.query(`INSERT INTO Photos (review_id, url) VALUES (${id}, "${url}")`)
        })
      })

    // query Characteristics
    db.queryAsync(`SELECT characteristic_id FROM Characteristics
      WHERE product_id=${product_id}`)
      .then((charas) => {
        const chara = JSON.parse(JSON.stringify(charas[0]));
        const cvContainer = []
        chara.forEach((cData) => {
          const value = cData.characteristic_id;
          db.queryAsync(`SELECT * FROM Characteristics_values WHERE characteristic_id=${value}`)
            .then((cvData) => {
              const cvDataSet = JSON.parse(JSON.stringify(cvData[0][0].characteristic_id));
              return cvDataSet;
            })
            .then((id) => {
              const chValue = characteristics[id]
              db.query(`INSERT INTO Characteristics_values (characteristic_id, value) VALUES (${id}, ${chValue})`)
            })
        })
      })
      .then((data) => callback(null, data))
      .catch((error) => callback(null, error))
  }
}