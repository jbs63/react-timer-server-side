// Create database connection and import account & shot time schemas
require("../models/db.js");
const Account = require("../models/account.js");
const ShotTime = require("../models/shotTime.js");

const publicRoutes = (instance, opts, done) => {

    instance.get("/", async (request, reply) => {
        /*return {
            message:
                "This is a public endpoint. Request /protected to test the Clerk auth middleware",
        };*/
        return reply.view("./views/home", {});
    });

    instance.post("/profile", async (request, reply) => {
        let user = await Account.findOne({ username: request.body.username }).lean();
        if(user) {
            user = {
                username: user.username,
                avatar: user.avatarUrl,
                fastestRT: user.fastestRT,
                fastestDrills: user.fastestDrills
            };
        }
        return reply.view("./views/profile", {user: user});
    });

    instance.get("/:username", async (request, reply) => {
        const { username } = request.params;
        let user = await Account.findOne({ username: username }).lean();
        if(user) {
            user = {
                username: user.username,
                avatar: user.avatarUrl,
                fastestRT: user.fastestRT,
                fastestDrills: user.fastestDrills
            };
        }
        return reply.view("./views/profile", {user: user});
    });

    done();
};

module.exports = publicRoutes;
