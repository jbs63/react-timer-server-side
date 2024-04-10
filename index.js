const fastify = require("fastify")({ logger: true });
const configureSecurity = require('./controllers/fastify-security.js');
const privateRoutes = require('./api/privateRoutes.js');
const publicRoutes = require('./api/publicRoutes.js');

// Register the created routes
fastify.register(privateRoutes);
fastify.register(publicRoutes);

// Configure security settings using custom middleware
configureSecurity(fastify);

const start = async () => {
  try {
    fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
