var mongoose = require('mongoose');
var Car = require('./car');

var Comment = mongoose.model('Comment', new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  car_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Car
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  collection: 'comments'
}));

module.exports = Comment;
