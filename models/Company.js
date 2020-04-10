const mongoose = require('mongoose');
const slugify = require('slugify');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a company name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [700, 'Description can not be longer than 700 characters'],
  },
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
  // location: {
  //   type: { type: String, enum: ['Point'], required: true },
  //   coordinates: {
  //     type: [Number],
  //     required: true,
  //     index: '2dsphere',
  //   },
  //   formattedAddress: String,
  //   street: String,
  //   city: String,
  //   state: String,
  //   zip: String,
  //   country: String,
  // },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CompanySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Company', CompanySchema);
