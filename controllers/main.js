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
        // Now, you need to decode and verify the access token
        // and extract user information from it.

        // This step depends on the method you're using to generate and verify access tokens

        // For example, if you're using JWT (JSON Web Tokens), you would verify and decode the token like this:
        // const decodedToken = jwt.verify(accessToken, yourSecretKey);
        // const userId = decodedToken.userId;
        
        const userId = req.body.userId; // Replace with your logic to extract user ID
        const shotTimes = await ShotTime.find({ userId: userId }).lean();
        console.log(shotTimes);
        res.json({shotTimes: shotTimes});
    },

    // add shot time
    addTime: async (req, res) => {
        const accessToken = req.headers.authorization.replace("Bearer ", "");
        // Now, you need to decode and verify the access token
        // and extract user information from it.

        // This step depends on the method you're using to generate and verify access tokens
        
        // For example, if you're using JWT (JSON Web Tokens), you would verify and decode the token like this:
        // const decodedToken = jwt.verify(accessToken, yourSecretKey);
        // const userId = decodedToken.userId;

        let shotTime = await ShotTime.create({
            userId: req.body.userId, // Replace with your logic to extract user ID
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