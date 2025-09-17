const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || process.env.VERCEL_MONGODB_URI || 'mongodb://localhost:27017/fhfassistance';

// Mongoose connection caching for serverless environments
if (!global._mongoosePromise) {
  global._mongoosePromise = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = mongoose;
