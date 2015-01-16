var play = require('play');


var config ={
  alarmSound: './public/sound/alarm.wav',
  date: new Date()
};

module.exports = {

  setAlarm: function(params){
    params = params || {};

    Object.keys(config).forEach(function(key) {
        config[key] = params[key] || config[key];
    });

    this.beginAlarm();
  },

  beginAlarm: function(){
      console.log(' --- Alarm set');
      this.checkTime(config.date); //mm/dd/yy hh:mm
  },

  checkTime: function(dateTime){
    var isLarger, now;
    var timeChecker = setInterval(function(){
       now = new Date();
       isLarger  = now >= new Date(dateTime);

       if(isLarger){
         console.log(' --- Alarm started at', now);
         play.sound(config.alarmSound);
         clearInterval(timeChecker);
       }

    },1000);
  }
};
