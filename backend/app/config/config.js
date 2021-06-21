var config = {
  VERSION: 1,
  BUILD: 1,
  URL: 'http://127.0.0.1',
  PORT:  4000,
  DATABASE: {
    HOST: 'localhost',
    PORT: '27017',
    NAME: 'test_js'
  },
  SECRET: 'supersecret',

  getDatabaseString: function() {
    return 'mongodb://' + this.DATABASE.HOST + ':' + this.DATABASE.PORT + '/' + this.DATABASE.NAME;
  },

  getHTTPUrl: function() {
    return 'http://' + this.URL + ":" + this.PORT;
  }
};

module.exports = config;
