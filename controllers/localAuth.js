require('dotenv').config({ path: './local_client_key.env' });

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    try {
        // Verify and decode the access token
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ error: 'Token verification failed' });
    }
}

module.exports = {
    verifyToken
};
