'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/alarmclock',{server: {poolSize: 1}});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connection good');
});

module.exports = db;
