'use strict';

//Librarys
var play = require('play');
var schedule = require('node-schedule');

//Config
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
        var setAlarm;

        AlarmModel.find(function(err, alarms) {
            alarms.forEach(function(alarm) {
                self.scheduleAlarm(alarm);
            });
        });
    },

    scheduleAlarm: function(alarm) {
        console.log(alarm._id + ' >> Setting alarm for ' + alarm.hour + ':' + alarm.minute);

        schedule.scheduleJob({
            hour: alarm.hour,
            minute: alarm.minute,
            dayOfWeek: alarm.day
        }, function() {

            //Play the sound file asignated to the alarm
            play.sound(alarm.alarmSound);

            //If alarm is not repeating delete it from the collection
            if (!config.repeatDays.length) {
                AlarmModel.remove({
                    '_id': alarm._id
                }, function() {
                    console.log('Alarm removed: ', alarm._id);
                });
            }
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
        var self = this;

        self.initAlarmParam(params);

        //Check alarm day
        self.checkAlarmDay();

        //Create Alarm
        AlarmModel.create(config, function(err, alarm){
            self.scheduleAlarm(alarm); //Schedule Alarm
        });

    },

    checkAlarmDay: function() {
        var now, alarmTime;

        now = new Date();
        alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), config.hour, config.minute);

        if (now > alarmTime && !config.repeatDays.length && now.getDay() === config.day) {
            config.day = config.day + 1;
            config.day = config.day > 6 ? 0 : config.day;
        }

    },


};
