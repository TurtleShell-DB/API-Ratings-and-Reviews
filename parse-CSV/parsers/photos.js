const fastcsv = require('fast-csv');
const fs = require('fs');
const db = require('../../db');
const convert = require('../../helper.js')

const stream = fs.createReadStream('../csv/reviews_photos.csv');
const container = [];
let count = 0;
const csvStream = fastcsv
  .parse()
  .on('data', (data) => {
    let [, review_id, url] = data;
    if (url !== undefined &&
        Number.isInteger(convert.num(review_id)) &&
        data.length === 3) {
      const photos = [convert.num(review_id), url];
      container.push(photos);
    }
    count++;
    if (count % 100000 === 0) {
      console.log(count);
    }
  })
  .on('end', () => {
    // //connect to mysql database
    console.log(`${count} rows successfully read.`)
    let query = `INSERT INTO Photos (review_id, url) VALUES ?`;
    db.query(query, [container], (error, response) => {
      console.log(error || response);
    });
    console.log('done');
  });
stream.pipe(csvStream);
//'on data' callback is asynchronous, and the commands that follow the cb
// will run before the cb finishes.
