const { clerkPlugin, getAuth } = require("@clerk/fastify");
const { clerkOptions, clerkClient } = require("../models/clerkConfig.js");

// Create database connection and import account & shot time schemas
require("../models/db.js");
const Account = require("../models/account.js");
const ShotTime = require("../models/shotTime.js");

const privateRoutes = (instance, opts, done) => {
    instance.register(clerkPlugin, clerkOptions);
    instance.get("/login", async (request, reply) => {
        const { userId } = getAuth(request);
        if (!userId) {
            return reply.code(403).send();
        }

        const user = await lookupOrCreateUser(userId);
        console.log("Login Route:", user);
        return reply.status(200).send({user});
    });

    // get shot times
    instance.get("/get-shot-times", async (request, reply) => {
        const { userId } = getAuth(request);
        if (!userId) {
            return reply.code(403).send();
        }
        
        try {
            const shotTimes = await ShotTime.find({ userId: userId }).lean();
            console.log(shotTimes);
            return reply.status(200).send({shotTimes: shotTimes });
        } catch (error) {
            console.error("Error fetching shot times:", error);
            return reply.status(500).send({ error: "Internal server error: from fetching shot times." });
        }
    });
    
    // add shot time
    instance.post("/add-shot-time", async (request, reply) => {
        const { userId } = getAuth(request);
        if (!userId) {
            return reply.code(403).send();
        }
        console.log("add-shot-time route:", request.body);
        const user = await lookupOrCreateUser(userId);

        if(request.body.reactTime < user.fastestRT) {
            user.fastestRT = request.body.reactTime;
            if(request.body.drillType) {
                user.fastestDrills.push(request.body.drillType);
            }
            await user.save();
            console.log("mongo user save:", user);
        }
        
        try {
            const shotTime = await ShotTime.create({
                userId: user.clerkUserId,
                date: request.body.date,
                time: request.body.time,
                drillType: request.body.drillType,
                reactTime: request.body.reactTime,
                splits: request.body.splits
            });

            return reply.status(201).send(shotTime);
        } catch (error) {
            console.error("Error adding shot time:", error);
            return reply.status(500).send({ error: "Internal server error: from adding shot time" });
        }
    });

    // delete shot time
    instance.delete("/delete-shot-time", async (request, reply) => {
        const { userId } = getAuth(request);
        if (!userId) {
            return reply.code(403).send();
        }
        console.log("delete-shot-time route:", request.body);

        if(request.body.shotId) {
            const shotTime = await ShotTime.findByIdAndDelete(request.body.shotId);
            return reply.status(201).send(shotTime);
        }

        return reply.status(400).send({ error: "Internal server error: from deleting shot time" });
    });

    done();
};

const lookupOrCreateUser = async (userId) => {
    try {
        let user = await Account.findOne({ clerkUserId: userId });
        console.log("lookup current user status:", user);

        const clerkUser = await clerkClient.users.getUser(userId);

        // Extract the username from the email address (up to the '@' sign)
        const email = clerkUser.emailAddresses[0].emailAddress;
        const atIndex = email.indexOf('@');
        const username = atIndex !== -1 ? email.substring(0, atIndex) : email;

        if (!user) {
            console.log(userId, username);
            
            // Create a new user in the database using Clerk user information
            user = await Account.create({
                clerkUserId: userId,
                username: username
            });

            console.log("Username:", username);
            console.log("User created in lookup function:", user);
        }
        
        if(user.username ===undefined || user.username ===null) {
            user.username = username;
            // Only legacy users will enter here
            await user.save();
        }
        return user;
    } catch (error) {
        console.error("Error looking up or creating user:", error);
        throw new Error("Internal server error");
    }
};

module.exports = privateRoutes;
