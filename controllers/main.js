require('dotenv').config({ path: './local_client_key.env' });

const jwt = require('jsonwebtoken');
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
        const accessToken = req.headers.authorization.replace("Bearer ", "");

        try {
            // Verify and decode the access token
            const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
            const userId = decodedToken.userId;

            const shotTimes = await ShotTime.find({ userId: userId }).lean();
            console.log(shotTimes);
            res.json({shotTimes: shotTimes});
        } catch (error) {
            // Handle token verification errors
            console.error('Token verification failed:', error.message);
            res.status(401).json({ error: 'Token verification failed' });
        }
    },

    // add shot time
    addTime: async (req, res) => {
        const accessToken = req.headers.authorization.replace("Bearer ", "");

        try {
            // Verify and decode the access token
            const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
            const userId = decodedToken.userId;

            let shotTime = await ShotTime.create({
                userId: userId,
                drillType: req.body.drillType,
                time: req.body.time,
                reactTime: req.body.reactTime,
                date: req.body.date,
                splits: req.body.splits
            });
            shotTime = shotTime.toJSON();
            res.json({shotTime: shotTime });
        } catch (error) {
            // Handle token verification errors
            console.error('Token verification failed:', error.message);
            res.status(401).json({ error: 'Token verification failed' });
        }
    }
 };

module.exports = main;