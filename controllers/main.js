const mongoose = require("mongoose");
const Account = mongoose.model("Account");
const ShotTime = mongoose.model("ShotTime");

let main = {
    // Base profile page
    root: async (req, res) => {
        // To send username, profile pic, etc
        const account = await Account.findOne({ username: req.user.username }).lean();
        //res.render('profile', { account: account }); // TODO: return account as json
        res.json({account: account});
    },

    getShotTimes: async (req, res) => {
        const userId = req.body.userId;
        // const shotTimes = await ShotTime.find({ userId: req.user._id }).lean();
        const shotTimes = await ShotTime.find({ userId: userId }).lean();
        console.log(shotTimes);
        //res.render('times', { shotTimes: shotTimes }); // TODO: return shot times as json
        res.json({shotTimes: shotTimes});
    },

    addTime: async (req, res) => {
        // add shot time
        await ShotTime.create({
            userId: req.user._id,
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