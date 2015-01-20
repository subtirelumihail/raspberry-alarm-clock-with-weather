'use strict';

var play = require('play');
var db = require('../../db');
var config = require('./config');

var AlarmModel = require('./model');

//play.sound(config.alarmSound);

module.exports = {
    init: function() {
        //Get The alarms
        this.getAlarms();
    },

    getAlarms: function() {
        var self = this;

        AlarmModel.find(function(err, alarms) {
            self.Alarms = alarms;
            //make a promise to start the timer
        });
    },

    initAlarmParam: function(params) {
        params = params || {};

        Object.keys(config).forEach(function(key) {
            config[key] = params[key] || config[key];
        });

        config.day = params.day || new Date().getDay();
    },

    setNewAlarm: function(params) {
        this.initAlarmParam(params);

        //Check alarm day
        this.checkAlarmDay();

        //Create Alarm
        AlarmModel.create(config);
    },

    checkAlarmDay: function() {
        var now, alarmTime;

        now = new Date();
        alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), config.hour, config.minutes);

        if (now > alarmTime && !config.repeatDays.length && now.getDay() === config.day) {
            config.day = config.day + 1;
            config.day = config.day > 6 ? 0 : config.day;
        }
    },


};
