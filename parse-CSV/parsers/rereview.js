const fastcsv = require('fast-csv');
const fs = require('fs');
const db = require('../../db');
const { timeConverter } = require('../../helpers/dateConverter.js');

let row = 0;
const maxConcurrent = 10;
const numConcurrent = 0;
let isPaused = false;

console.time('readFile');
const csvStream = fastcsv.parseFile('../csv/test.csv', { headers: true })
  //transforms headers into an object that will be recorded as data
  .transform((data) => ({
    product_id: data.product_id,
    rating: data.rating,
    date: data.date,
    summary: data.summary,
    body: data.body,
    recommend: data.recommend,
    name: data.reviewer_name,
    email: data.reviewer_email,
    response: data.response,
    helpfulness: data.helpfulness,
  }))
  .on('data', (data) => {
    const review = Object.values(data);
    if (review.length === 10) {
      let queryStr = `INSERT INTO Product VALUE ?`;
      db.query(queryStr, review, (error, success) => {
        console.log( error || success );
      })
    }

    row++;

    if (row % 100000 === 0) {
      console.log(row);
    }

  })
  .on('end', (data) => {
    console.log(`${row} rows successfully read.`);
    console.timeEnd('readFile');
    db.end();
  })
  .on('error', (error) => {
    console.log(error);
  });


//   .parse()
//   .on('data', (data) => {
//     count++;
//     console.log(count);
//     if (data.length === 12) {
//       // id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
//       let [id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email,
//         response, helpfulness] = data;
//       if (Number.isInteger(parseInt(product_id))) {
//         const reviews = [parseInt(product_id), rating, timeConverter(date),
//           summary, body, recommend, reviewer_name, response, helpfulness]
//           container.push(reviews);
//       }
//     }
//   })
//   .on('end', () => {
//     for (var index = 0; index < container.length; index += 100000 ) {
//       let query = `INSERT INTO Product (product_id, rating, date, `;
//       query += `summary, body, recommend, name, response, helpfulness) VALUES ?`;
//       db.query(query, [container.slice(index, index + 100000 - 1)], (error, success) => {
//         console.log( error || success);
//       });
//     }
//     db.end();
//   console.log('done');
//   });
// stream.pipe(csvStream);


//change to include transform
  //transofrm takes in data as an object and lets you choose what you want to pass in to record

//LOAD DATE LOCAL INFILE ''