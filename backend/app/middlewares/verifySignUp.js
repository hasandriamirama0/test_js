var mongoose = require('mongoose');
var User = require('../models/user');

checkDuplicateNameOrEmail = (req, res, next) => {
  User.findOne({
    name: req.body.name
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: 'Failed! Name is already in use!' });
      return;
    }

    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: 'Failed! Email is already in use!' });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateNameOrEmail
};

module.exports = verifySignUp;
