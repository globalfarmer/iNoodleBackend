var express = require("express");
var mongoose = require('mongoose');
var socketio = require('./routes/socket');
var app = express();

var finalTestSession = require('./routes/finalTestSession');

mongoose.connect("mongodb://127.0.0.1:27017/inoodle2017");
var db = mongoose.connection;

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use('/finalTestSession', finalTestSession);

app.get("/",function(req, res) {
	res.render("test");
});

app.set('port', (process.env.PORT || 3000));


var server = app.listen(app.get('port'), () => {
	console.log('Server started on port ' + app.get('port'));
});

socketio(server);