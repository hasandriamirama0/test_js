var mongoose = require('mongoose');

var Car = mongoose.model('Car', new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  pictures: {
    type: Array,
    required: true
  }
}, {
  timestamps: true,
  collection: 'cars'
}));

module.exports = Car;
