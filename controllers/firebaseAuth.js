const firebaseAdmin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    // Add other configurations if needed
});

// Middleware to verify Firebase ID tokens
async function verifyFirebaseToken(req, res, next) {
    const idToken = req.headers.authorization;
    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        res.status(401).send('Unauthorized');
    }
}

module.exports = verifyFirebaseToken;
