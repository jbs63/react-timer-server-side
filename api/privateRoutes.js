const { clerkPlugin, getAuth } = require("@clerk/fastify");
const { clerkOptions, clerkClient } = require("../models/clerkConfig.js");

const mongoose = require("mongoose");
//const Account = require("../models/account.js");
//const ShotTime = mongoose.model("ShotTime");

const privateRoutes = (instance, opts, done) => {
    instance.register(clerkPlugin, clerkOptions);
    instance.get("/protected", async (request, reply) => {
        const { userId } = getAuth(request);
        if (!userId) {
            return reply.code(403).send();
        }

        const user = userId ? await clerkClient.users.getUser(userId) : null;
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

/*
const userLookupDB = (instance, opts, done, userEmail) => {
    const findUser = Account.findOne({username: username}).lean();
    console.log(findUser);
    if(findUser) {
        
    } else {
        // Otherwise, log error message
        console.log("Incorrect login credentials");
    }

    done();
};*/ 

module.exports = privateRoutes;
