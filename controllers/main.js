const mongoose = require("mongoose");
const Account = mongoose.model("Account");
const ShotTime = mongoose.model("ShotTime");

let main = {
    // Base profile page
    root: async (req, res) => {
        const account = await Account.findOne({ username: req.user.username }).lean();
        console.log(account);
        res.render('profile', { account: account });
    },

    getShotTimes: async (req, res) => {
        console.log(req.user.email);
        const shotTimes = await ShotTime.find({ userId: req.user.email }).lean(); // should be userId
        console.log(shotTimes);
        res.render('times', { shotTimes: shotTimes });
    },

    addTime: async (req, res) => {
        // add shot time
        await ShotTime.create({
            userId: req.user.email, // should be userId
            drillType: req.body.drillType,
            time: req.body.time,
            reactTime: req.body.reactTime,
            date: req.body.date
        });
        // refresh page
        const account = await Account.findOne({ username: req.user.username }).lean();
        res.render('profile', { account: account });
    }
 };

module.exports = main;