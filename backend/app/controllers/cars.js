var mongoose = require('mongoose');
var config = require('../config/config');
var Car = require('../models/car');

exports.add = (req, res, next) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host');
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/public/' + req.files[i].filename);
    }

    const car = new Car({
      _id: new mongoose.Types.ObjectId(),
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      pictures: reqFiles
    });

    car.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ car: car });
    });
  }
};

exports.getAll = (req, res) => {
  Car.find({}, (err, cars) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ cars: cars });
  }).sort({ 'updatedAt': -1 });
};

exports.getById = (req, res, next) => {
  Car.findById((req.params._id), (err, car) => {
    if (err) {
      res.status(404).send({ message: err });
      return;
    }
    res.send({ car: car });
  });
};

exports.update = (req, res, next) => {
  const { make, model, year } = req.body;
  const { _id } = req.params;
  var editCar = {
    make: make,
    model: model,
    year: year
  };
  Car.findOneAndUpdate(
    { _id: _id },
    { $set: editCar },
    { upsert: true, returnOriginal: false },
    (err, car) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }
      res.send({ car: car });
    }
  );
};

exports.delete = (req, res, next) => {
  const { _id } = req.params;
  Car.findOneAndDelete({ _id: _id }, (err, car) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ car: car });
  });
};
