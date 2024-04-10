const { clerkPlugin, getAuth } = require("@clerk/fastify");
const { clerkOptions, clerkClient } = require("../models/clerkConfig.js");

// Create database connection and import account & shot time schemas
require("../models/db.js");
const Account = require("../models/account.js");
const ShotTime = require("../models/shotTime.js");

const privateRoutes = (instance, opts, done) => {
    instance.register(clerkPlugin, clerkOptions);
    instance.get("/protected", async (request, reply) => {
        const { userId } = getAuth(request);
        if (!userId) {
            return reply.code(403).send();
        }

        const user = await lookupOrCreateUser(userId);
        return { user };
    });

    // get shot times
    instance.get("/get-shot-times", async (request, reply) => {
        const { userId } = getAuth(request);
        if (!userId) {
            return reply.code(403).send();
        }
        
        try {
            const userId = request.body.userId;
            const shotTimes = await ShotTime.find({ userId: userId }).lean();
            console.log(shotTimes);
            reply.status(200).json({ shotTimes: shotTimes });
        } catch (error) {
            console.error("Error fetching shot times:", error);
            reply.status(500).json({ error: "Internal server error" });
        }
    });
    
    // add shot time
    instance.post("/add-shot-time", async (request, reply) => {
        const { userId } = getAuth(request);
        if (!userId) {
            return reply.code(403).send();
        }
        
        try {
            const shotTime = await ShotTime.create({
                userId: request.body.userId,
                drillType: request.body.drillType,
                time: request.body.time,
                reactTime: request.body.reactTime,
                date: request.body.date,
                splits: request.body.splits
            });
            reply.status(201).json(shotTime);
        } catch (error) {
            console.error("Error adding shot time:", error);
            reply.status(500).json({ error: "Internal server error" });
        }
    });

    done();
};

const lookupOrCreateUser = async (userId) => {
    try {
        let user = await Account.findOne({ clerkUserId: userId }).lean();
        
        if (!user) {
            const clerkUser = await clerkClient.users.getUser(userId);
            
            // Create a new user in the database using Clerk user information
            user = await Account.create({
                clerkUserId: userId,
                username: clerkUser.fullName,

            });
        }
        return user;
    } catch (error) {
        console.error("Error looking up or creating user:", error);
        throw new Error("Internal server error");
    }
};

module.exports = privateRoutes;
