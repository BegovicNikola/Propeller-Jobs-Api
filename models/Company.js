const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../middleware/utils/geocoder');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a company name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [700, 'Description can not be longer than 700 characters'],
  },
  slug: String,
  // Adding the city was necessary since mapquest doesn't provide it always
  city: { type: String, required: [true, 'Please add a city'] },
  address: { type: String, required: [true, 'Please add an address'] },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid website url with http or https',
    ],
  },
  phone: {
    type: String,
    match: [
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      'Please use a valid phone number',
    ],
  },
  email: {
    type: String,
    match: [
      /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
      'Please use a valid email address',
    ],
  },
  stack: {
    type: [String],
    required: true,
    enum: [
      'HTML',
      'CSS',
      'Javascript',
      'Java',
      'Python',
      'C#',
      'Android',
      'iOS',
    ],
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating can not be more than 10'],
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  relocation: {
    type: Boolean,
    default: false,
  },
  contractType: {
    type: [String],
    required: true,
    enum: ['Contract', 'Part-time', 'Full-time'],
  },
  location: {
    type: { type: String, enum: ['Point'] },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CompanySchema.pre('save', function (next) {
  const slugParam = `${this.name} ${this.city}`;
  this.slug = slugify(slugParam, { lower: true });
  next();
});

CompanySchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zip: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Company', CompanySchema);
