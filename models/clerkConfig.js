const loadKeys = require("./envKeys.js");
const { createClerkClient } = require("@clerk/fastify");

const clerkOptions = {
    publishableKey: loadKeys.publishableKey,
    secretKey: loadKeys.secretKey,
};

const clerkClient = createClerkClient(clerkOptions);

module.exports = { clerkOptions, clerkClient };