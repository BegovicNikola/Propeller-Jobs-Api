const express = require('express');
const dotenv = require('dotenv');
// const morgan = require('morgan');
const connectDB = require('./config/db');

const company = require('./routes/company');

const logger = require('./middleware/logger');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  // app.use(morgan('dev'));
  app.use(logger);
}

app.use('/api/v1/company', company);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(
    `App in ${process.env.NODE_ENV} environment listening on port ${PORT}...`
  );
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
