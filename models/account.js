let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Account = new Schema({
  clerkUserId: String,
  username: String,
  email: String,
  avatarUrl: String,
  fastestRT: { type: Number, default: Infinity },
  fastestDrills: { type: [String], default: [] },
});

module.exports = mongoose.model('Account', Account);