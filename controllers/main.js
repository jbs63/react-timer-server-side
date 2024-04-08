const mongoose = require("mongoose");
const Account = mongoose.model("Account");
const ShotTime = mongoose.model("ShotTime");
//const localAuth = require('./localAuth.js');

let main = {
    // Base profile page
    root: async (req, res) => {
        res.status(200).json({message: "Server started successfully!!"});
    },

    // get shot times
    getShotTimes: async (req, res) => {
        try {
            const userId = req.body.userId;
            const shotTimes = await ShotTime.find({ userId: userId }).lean();
            console.log(shotTimes);
            res.status(200).json({ shotTimes: shotTimes });
        } catch (error) {
            console.error("Error fetching shot times:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // add shot time
    addTime: async (req, res) => {
                drillType: req.body.drillType,
                time: req.body.time,
                reactTime: req.body.reactTime,
                date: req.body.date,
                splits: req.body.splits
            });
            res.status(201).json(shotTime);
        } catch (error) {
            console.error("Error adding shot time:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
 };

module.exports = main;