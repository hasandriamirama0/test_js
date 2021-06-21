var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');
var User = require('../models/user');

const { SECRET } = config;

exports.signup = (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: 'User was registered successfully!' });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        res.status(404).send({ message: 'User not found!' });
        return;
      }
      
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid password!'
        });
      }

      var token = jwt.sign({ _id: user._id }, SECRET, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token
      });
    });
};
