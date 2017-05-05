var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var socketio = require('./routes/socket');
var app = express();

//routes
// var firebase = require('./routes/firebase');
var finaltest = require('./routes/finalTest');
var slot = require('./routes/slot');

mongoose.connect("mongodb://127.0.0.1:57603/inoodle2017"); //55781

//public file
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", "./views");

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//route firebase
// app.use(firebase);

app.get("/",function(req, res) {
	res.render("test");
});

//route finaltest
app.use('/finaltest', finaltest);
app.use('/slot', slot);

var server = app.listen(8080, () => {
	console.log('Server started on port ' + 8080);
});

// socketio(server);