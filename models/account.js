let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
  username: String,
  email: String,
  googleId: String,
  avatarUrl: String,
  fastertRT: Number,
  fastestDrills: { type: [String], default: [] },
  // Add other fields as needed for various authentication strategies
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);