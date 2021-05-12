const express = require('express');
const db = require('../db');
const controllers = require('./controllers/index.js')
const app = express();
const port = 3005

// app.get('/reviews', (req, res) => {
//   res.send('hello')
// })

app.get('/api/reviews/:product_id', controllers.get);

app.get('/api/reviews/meta/:product_id', controllers.getMeta);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})