const mongoose = require("mongoose");
const Account = mongoose.model("Account");
const ShotTime = mongoose.model("ShotTime");
//const localAuth = require('./localAuth.js');

let main = {
    // Base profile page
    root: async (req, res) => {
        // To send username, profile pic, etc
        const account = await Account.findOne({ username: req.user.username }).lean();
        res.json({account: account});
    },

    // return shot time json
    getShotTimes: async (req, res) => {
    //getShotTimes: [auth.verifyToken, async (req, res) => { // Apply the verifyToken middleware before the route handler
        const userId = req.userId;

        try {
            const shotTimes = await ShotTime.find({ userId: userId }).lean();
            console.log(shotTimes);
            res.json({ shotTimes: shotTimes });
        } catch (error) {
            console.error('Error fetching shot times:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    //}],
    },

    // add shot time
    addTime: async (req, res) => {
    //addTime: [auth.verifyToken, async (req, res) => { // Apply the verifyToken middleware before the route handler
        const userId = req.userId;

        try {
            let shotTime = await ShotTime.create({
                userId: userId,
                drillType: req.body.drillType,
                time: req.body.time,
                reactTime: req.body.reactTime,
                date: req.body.date,
                splits: req.body.splits
            });
            shotTime = shotTime.toJSON();
            res.json({ shotTime: shotTime });
        } catch (error) {
            console.error('Error adding shot time:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    //}]
    }
 };

module.exports = main;