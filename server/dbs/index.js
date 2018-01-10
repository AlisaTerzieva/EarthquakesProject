var mongoose = require('mongoose');

var uri = 'mongodb://numenesse:4302@ds059546.mlab.com:59546/earthquakes';

var options = {
  "server": {
    "socketOptions": {
      "keepAlive": 300000,
      "connectTimeoutMS": 30000
    }
  },
  "replset": {
    "socketOptions": {
      "keepAlive": 300000,
      "connectTimeoutMS": 30000
    }
  }
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose.connect(uri, options);
