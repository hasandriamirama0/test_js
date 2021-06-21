var jwt = require('jsonwebtoken');
var config = require('../config/config');
var User = require('../models/user');

verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  token = token.split(' ')[1];
  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.body._id = decoded._id;
    next();
  });
};

const authJwt = {
  verifyToken
}

module.exports = authJwt;
