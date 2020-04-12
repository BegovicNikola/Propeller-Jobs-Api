const fs = require('fs');
const mongoose = require('mongoose');
require('colors');

require('dotenv').config();

const Company = require('./models/Company');

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const companies = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/company.json`),
  'utf-8'
);

const importData = async () => {
  try {
    await Company.create(companies);

    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const removeData = async () => {
  try {
    await Company.deleteMany();

    console.log('Data cleared...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const flagParam = process.argv[2];

if (flagParam === '-im') {
  importData();
} else if (flagParam === '-rm') {
  removeData();
}
