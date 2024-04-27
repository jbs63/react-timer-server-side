// Create database connection and import account & shot time schemas
require("../models/db.js");
const Account = require("../models/account.js");
const ShotTime = require("../models/shotTime.js");

const publicRoutes = (instance, opts, done) => {

    instance.get("/", async (request, reply) => {
        return reply.view("./views/home", {});
    });

    instance.post("/", async (request, reply) => {
        return reply.redirect("/" + request.body.username);
    });

    instance.get("/:username", async (request, reply) => {
        const { username } = request.params;
        let user = await Account.findOne({ username: username }).lean();
        if(user) {
            let shotTimes = await ShotTime.find({ userId: user._id }).lean();
            user = {
                username: user.username,
                avatar: user.avatarUrl,
                fastestRT: user.fastestRT,
                fastestDrills: user.fastestDrills
            };
            return reply.view("./views/profile", {user: user, shotTimes: shotTimes});
        }
        return reply.view("./views/profile");
    });

    done();
};

module.exports = publicRoutes;
