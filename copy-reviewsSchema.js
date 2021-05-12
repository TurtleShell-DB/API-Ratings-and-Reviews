const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>
  console.log('hello your\'e connected')
);

const productSchema = mongoose.Schema({
  review_id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: String,
  reviewer_name: String,
  helpfulness: Number,
  //check to see if it's Schema.Types or photoSchema
  photos: [photoSchema.Types.photo_id],
  product_id: Number,
});

const photoSchema = mongoose.Schema({
  photo_id: Number,
  url: String,
});

const characteristicSchema = mongoose.Schema({
  product_id: Number,
  Size: {
    id: Number,
    value: Number,
  },
  Width: {
    id: Number,
    value: Number,
  },
  Comfort: {
    id: Number,
    value: Number,
  },
  Quality: {
    id: Number,
    value: Number,
  },
  Length: {
    id: Number,
    value: Number,
  },
  Fit: {
    id: Number,
    value: Number,
  }
});