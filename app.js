var express = require("express");
var mongoose = require('mongoose');
var app = express();

var finalTestSession = require('./routes/finalTestSession');
var schedule = require('./routes/schedule');

mongoose.connect("mongodb://127.0.0.1:27017/inoodle2017");
var db = mongoose.connection;

app.use('/finalTestSession', finalTestSession);
app.use('/schedule', schedule);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
	console.log('Server started on port ' + app.get('port'));
});