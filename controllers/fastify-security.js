// security.js
const helmet = require('@fastify/helmet');

function configureSecurity(fastify) {
  
  // Configuration settings for helmet
  fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'https://accounts.google.com/gsi/'],
        scriptSrc: ["'self'", 'https://apis.google.com', 'https://accounts.google.com/gsi/client'],
        frameSrc: ["'self'", 'https://apis.google.com', 'https://accounts.google.com/gsi/'],
        styleSrc: ["'self'", 'https://accounts.google.com/gsi/style'],
        connectSrc: ["'self'", 'https://accounts.google.com/gsi/']
      },
    },
    referrerPolicy: 'strict-origin', // or 'same-origin'
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    frameguard: { action: 'deny' }, // or 'sameorigin'
    hsts: { maxAge: 31536000, includeSubDomains: true },
    dnsPrefetchControl: false,
    hidePoweredBy: true,
    noSniff: true,
    xssFilter: true,
    featurePolicy: {
      features: {
        camera: ["'none'"],
        geolocation: ["'self'"],
        // Add more features as needed
      },
    },
    expectCt: { maxAge: 30, enforce: true },
    // Add more options as needed
  });
}
  
module.exports = configureSecurity;