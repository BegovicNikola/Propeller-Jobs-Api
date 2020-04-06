const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log(
    `Mongo connected: host -> ${conn.connection.host}; port -> ${conn.connection.port};`
  );
};

module.exports = connectDB;
