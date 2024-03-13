let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ShotTime = new Schema({
  userId: String,
  drillType: String,
  time: Number,
  reactTime: Number,
  date: String,
  splits: new Schema({
    split: Number
  })
});

module.exports = mongoose.model('ShotTime', ShotTime);