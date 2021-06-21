var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir('./public', (err) => {
      cb(null, './public');
    });
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

const uploader = {
  upload
};

module.exports = uploader;
