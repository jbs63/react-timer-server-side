const mongoose = require('mongoose');

// Choose which URL to use for this connection
let dbURI = 'mongodb+srv://jeffb246:S5aUb4XdLM8GFdwv@cluster0.ks6oqs0.mongodb.net/reacttimer?retryWrites=true&w=majority';
if (process.env.NODE_ENV === 'production') {
  dbURI = 'mongodb+srv://jeffb246:S5aUb4XdLM8GFdwv@cluster0.ks6oqs0.mongodb.net/?retryWrites=true&w=majority';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = async (msg, callback) => {
    await mongoose.connection.close();
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  };
  
  // For nodemon restarts                                 
  process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
      process.kill(process.pid, 'SIGUSR2');
    });
  });

  // For app termination
  process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
      process.exit(0);
    });
  });

  // For Heroku app termination
  process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
      process.exit(0);
    });
  });
  
  // Require the specific schemas
  require('./account.js');
  require('./shotTime.js')