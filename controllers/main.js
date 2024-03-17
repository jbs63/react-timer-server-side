const mongoose = require("mongoose");
const Account = mongoose.model("Account");
const ShotTime = mongoose.model("ShotTime");

let main = {
    // Base profile page
    root: async (req, res) => {
        // To send username, profile pic, etc
        const account = await Account.findOne({ username: req.user.username }).lean();
        res.json({account: account});
    },

    // return shot time json
    getShotTimes: async (req, res) => {
        const userId = req.body.userId;
        const shotTimes = await ShotTime.find({ userId: userId }).lean();
        console.log(shotTimes);
        res.json({shotTimes: shotTimes});
    },

    // add shot time
    addTime: async (req, res) => {
        let shotTime = await ShotTime.create({
            userId: req.body.userId,
            drillType: req.body.drillType,
            time: req.body.time,
            reactTime: req.body.reactTime,
            date: req.body.date,
            splits: req.body.splits
        });
        shotTime = shotTime.toJSON();
        res.json({shotTime: shotTime });
    }
 };

module.exports = main;