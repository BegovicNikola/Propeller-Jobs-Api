const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a job title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a job description'],
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
  createdAt: {
    type,
  },
});

module.exports = mongoose.model('Job', JobSchema);
