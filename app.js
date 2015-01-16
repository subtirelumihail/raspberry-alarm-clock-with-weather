var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Include models
var Alarm = require('./models/Alarm').setAlarm();



// set the view engine to ejs
app.set('view engine', 'ejs');

//Set the port of the application
app.set('port', (process.env.PORT || 5000));

//Set the public folder
app.use(express.static(__dirname + '/public'));

//Set up the body parser for the RestfullApi
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: false
}));

//Homepage
app.get('/', function(req, res) {
  res.render('pages/index',{
    alarm: {
      minutes: 59,
      hour: 23
    }
  });
});

//RestfulAPI
app.get('/sound', function(req, res) {
   res.end();
});

//Starting to listen...
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});



