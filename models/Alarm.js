var play = require('play');


var config = {
    alarmSound: './public/sound/alarm.wav',
    date: new Date(),
    day: -1,
    hour: '21',
    minutes: '24',
    repeat: false,
    on: true,
    cb: function(){}
};

module.exports = {

    setAlarm: function(params) {
        params = params || {};

        Object.keys(config).forEach(function(key) {
            config[key] = params[key] || config[key];
        });

        this.dateObject =  this.formatDate();

        this.checkTime();
    },

    formatDate: function() {
        var d = new Date();

        return {
            year: d.getFullYear(),
            month: d.getMonth(),
            dayOfWeek: d.getDay(),
            day: d.getDate()
        }
    },

    checkTime: function() {
        var now, alarmTime;
        var d = this.dateObject;
        var timeChecker = setInterval(function() {

            now = new Date();
            alarmTime = new Date(d.year, d.month, d.day, config.hour, config.minutes);

            if((now >= alarmTime) && (config.day === d.dayOfWeek || config.day === -1)) {
                console.log(' --- Alarm started at', now);
                play.sound(config.alarmSound);
                config.on = config.repeat ? true : false;

                if(!config.on){
                  clearInterval(timeChecker);
                  config.cb();
                }
            }

        }, 1000);
    }
};
