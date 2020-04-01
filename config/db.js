const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  console.log(`Mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
