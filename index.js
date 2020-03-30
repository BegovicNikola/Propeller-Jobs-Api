const express = require('express');
const dotenv = require('dotenv');

const company = require('./routes/company');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use('/api/v1/company', company);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `App in ${process.env.NODE_ENV} environment listening on port ${PORT}...`
  );
});
