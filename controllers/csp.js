// csp.js
const crypto = require('crypto');

const generateNonceMiddleware = (req, res, next) => {
  // Generate a random nonce
  const nonce = crypto.randomBytes(16).toString('base64');

  // Set the CSP header with the generated nonce
  res.setHeader(
    'Content-Security-Policy',
    `script-src 'self' https://apis.google.com https://accounts.google.com/gsi/client 'nonce-${nonce}'`
  );

  // Attach the nonce to the response locals for use in the view
  res.locals.nonce = nonce;

  // Continue to the next middleware or route handler
  next();
};

module.exports = generateNonceMiddleware;
