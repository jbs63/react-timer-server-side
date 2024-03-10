// security.js

const helmet = require('helmet');
const generateNonceMiddleware = require('./csp.js');

function configureSecurity(app) {
  // Disable the X-Powered-By header
  app.disable('x-powered-by');
  
  // Configuration settings for helmet
  app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'", 'https://accounts.google.com/gsi/'],
            scriptSrc: ["'self'", 'https://apis.google.com', 'https://accounts.google.com/gsi/client'],
            frameSrc: ["'self'", 'https://apis.google.com', 'https://accounts.google.com/gsi/'],
            styleSrc: ["'self'", 'https://accounts.google.com/gsi/style'],
            connectSrc: ["'self'", 'https://accounts.google.com/gsi/']
          },
        },
        referrerPolicy: { policy: 'same-origin' }, // or 'strict-origin'
        crossOriginEmbedderPolicy: true,
        crossOriginOpenerPolicy: true,
        frameguard: { action: 'deny' }, // or 'sameorigin'
        hsts: { maxAge: 31536000, includeSubDomains: true },
        dnsPrefetchControl: { allow: false },
        //hidePoweredBy: { setTo: true }, // or true to remove completely
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
      })
  );

  // Use the CSP middleware
  app.use(generateNonceMiddleware);
}
  
module.exports = configureSecurity;