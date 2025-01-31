var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlarmSchema = new Schema({
  alarmSound: String,
  day: Number,
  hour: String,
  minute: String,
  repeat: Boolean,
});

var AlarmModel = mongoose.model('Alarms', AlarmSchema);

module.exports = AlarmModel;
