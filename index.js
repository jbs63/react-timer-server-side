const dotenv = require("dotenv");
dotenv.config();

const Fastify = require("fastify");
const { createClerkClient, clerkPlugin, getAuth } = require("@clerk/fastify");
const loadKeys = require("./envKeys.js");

const fastify = Fastify({ logger: true });
const clerkOptions = {
    publishableKey: loadKeys.publishableKey,
    secretKey: loadKeys.secretKey,
};

/**
 * Create a new clerk client by explicitly passing in the API keys
 */
const clerkClient = createClerkClient(clerkOptions);

/**
 * Register Clerk only for a subset of your routes
 */
const protectedRoutes = (instance, opts, done) => {
  instance.register(clerkPlugin, clerkOptions);
  instance.get("/protected", async (request, reply) => {
    const { userId } = getAuth(request);
    if (!userId) {
      return reply.code(403).send();
    }

    const user = userId ? await clerkClient.users.getUser(userId) : null;
    return { user };
  });
  done();
};

const publicRoutes = (instance, opts, done) => {
  instance.get("/", async (request, reply) => {
    return {
      message:
        "This is a public endpoint. Request /protected to test the Clerk auth middleware",
    };
  });
  done();
};

/**
 * Register your routes as you normally would
 */
fastify.register(protectedRoutes);
fastify.register(publicRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
