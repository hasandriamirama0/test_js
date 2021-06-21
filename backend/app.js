var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());
app.use('*', cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.get('/', (request, response) => {
  response.json({ message: 'Hey there!' });
});

require('./app/routes/auth')(app);
require('./app/routes/car')(app);
require('./app/routes/comment')(app);

module.exports = app;
