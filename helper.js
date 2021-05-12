const moment = require('moment');

const date = (timestamp) => {
  timestamp = timestamp.toString();
  if (timestamp.length === 13) {
    const unixConvert = moment(timestamp, 'x').format('MMM Do YYYY');
    return unixConvert;
  }
  if (timestamp.includes('Time)')) {
    const dateConvert = new Date(timestamp);
    return moment(dateConvert).format('MMM Do YYYY');
  }
  return moment(timestamp).format('MMM Do YYYY');
};


const rating = rating => {
  rating === 'string' ? parseInt(string) : 0
  return rating > 5 ? 5 : rating;
};

const boolean = bool => {
  return bool === 'true' ? true : false
};

const num = str => {
  return parseInt(str)
}

module.exports = {
  rating,
  date,
  boolean,
  num
};