const fastcsv = require('fast-csv');
const fs = require('fs');
const db = require('../../db');
const convert = require('../../helper.js');

let count = 0;
const stream = fs.createReadStream('../csv/reviews.csv')
const container = [];

const csvStream = fastcsv
  .parse()
  .on('data', (data) => {
    if (data.length === 12) {
      // id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
      let [id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email,
        response, helpfulness] = data;
      if (Number.isInteger(convert.num(product_id))) {
        const reviews = [
          convert.num(product_id),
          convert.rating(rating),
          convert.date(date),
          summary,
          body,
          convert.boolean(recommend),
          reviewer_name,
          reviewer_email,
          response,
          helpfulness
        ]
        container.push(reviews);
      }

      count++;
      if (count % 100000 === 0) {
        console.log(count);
      }
    }
  })

  .on('end', () => {
    for (var index = 0; index < container.length; index += 100000 ) {
      console.log(`${count} rows successfully read.`)
      let query = `INSERT INTO Product (product_id, rating, date, `;
      query += `summary, body, recommend, name, email, response, helpfulness) VALUES ?`;
      db.query(query, [container.slice(index, index + 100000 - 1)], (error, success) => {
        console.log( error || success);
      });
    }
  console.log('done');
  });
stream.pipe(csvStream);


//change to include transform
  //transofrm takes in data as an object and lets you choose what you want to pass in to record

//LOAD DATE LOCAL INFILE ''