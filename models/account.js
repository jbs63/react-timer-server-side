let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Account = new Schema({
  username: String,
  email: String,
  avatarUrl: String,
  fastestRT: Number,
  fastestDrills: { type: [String], default: [] },
});

module.exports = mongoose.model('Account', Account);