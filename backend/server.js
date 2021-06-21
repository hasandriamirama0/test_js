var mongoose = require('mongoose');
var http = require('http');
var config = require('./app/config/config');
var app = require('./app');
var Car = require('./app/models/car');

// Init server instance
var server = http.createServer(app);

// Connect to services
mongoose
  .connect(config.getDatabaseString(), {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex: true,
    useFindAndModify: false })
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    initial();
  })
  .catch(err => {
    console.log('error', err);
    process.exit();
  });

function initial() {
  Car.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      if (err) throw err;
      Car.insertMany({ make: 'Car1', model: 'Toyota', year: '2000',
        pictures: [
          'http://localhost:4000/public/test1.jpg',
          'http://localhost:4000/public/test2.jpg'
        ]
      }, (err) => { if (err) throw err; });
      Car.insertMany({ make: 'Car2', model: 'Ford', year: '2001',
        pictures: [
          'http://localhost:4000/public/test1.jpg',
          'http://localhost:4000/public/test2.jpg'
        ]
      }, (err) => { if (err) throw err; });
      Car.insertMany({ make: 'Car3', model: 'Audi', year: '2002',
        pictures: [
          'http://localhost:4000/public/test1.jpg',
          'http://localhost:4000/public/test2.jpg'
        ]
      }, (err) => { if (err) throw err; });
    }
  });
}

// Start the server
server.listen(config.PORT, () => {
  console.log('Server started at - ' + config.URL + ":" + config.PORT);
});
