var mongoose = require('mongoose');
var User = require('../models/user');
var Comment = require('../models/comment');

exports.add = (req, res, next) => {
  User.findOne({ _id: req.body._id }, (err, user) => {
    if (err) {
      res.status(400).send({ message: err });
      return;
    }
    console.log(req.params);
    const { car_id } = req.params;
    const comment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      car_id: car_id,
      author: user.name,
      body: req.body.body
    });

    comment.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ comment: comment });
    });
  });
};

exports.getAll = (req, res, next) => {
  const { car_id } = req.params;
  Comment.find({ car_id: car_id }, (err, comments) => {
    if (err) {
      res.status(400).send({ message: err });
      return;
    }
    res.send({ comments: comments });
  }).sort({ 'updatedAt': -1 });
};

exports.update = (req, res, next) => {
  const { body } = req.body;
  const { _id } = req.params;
  var editComment = {
    body: body
  };
  Comment.findOneAndUpdate(
    { _id: _id },
    { $set: editComment },
    { upsert: true, returnOriginal: false },
    (err, comment) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }
      res.send({ comment: comment });
    }
  );
};

exports.delete = (req, res, next) => {
  const { _id } = req.params;
  Comment.findOneAndDelete({ _id: _id }, (err, comment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ comment: comment });
  });
};
