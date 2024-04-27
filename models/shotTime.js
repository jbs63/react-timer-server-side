let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ShotTime = new Schema({
  userId: String, // _id from Account
  date: String,
  time: Number,
  drillType: String,
  reactTime: Number,
  splits: { type: [Number], default: [] },
});


module.exports = mongoose.model('ShotTime', ShotTime);