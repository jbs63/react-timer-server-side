let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ShotTime = new Schema({
  userId: String, // _id from Account
  drillType: String,
  time: Number,
  reactTime: Number,
  date: String,
  splits: { type: [Number], default: [] },
});


module.exports = mongoose.model('ShotTime', ShotTime);