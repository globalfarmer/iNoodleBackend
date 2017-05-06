var express = require("express"),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	socketio = require('./routes/socket'),
	app = express();

//routes define
// var firebase = require('./routes/firebase');
var finaltest = require('./routes/finalTest'),
	slot = require('./routes/slot'),
	scoreboard = require('./routes/scoreBoard'),
	announce = require('./routes/announce');


mongoose.connect("mongodb://127.0.0.1:27017/inoodle2017");

//public file
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", "./views");

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//route firebase
// app.use(firebase);

// app.get("/",function(req, res) {
// 	res.render("test");
// });

//route
app.use('/finaltest', finaltest);
app.use('/slot', slot);
app.use('/scoreboard', scoreboard);
app.use('/announce', announce);

var server = app.listen(8080, () => {
	console.log('Server started on port ' + 8080);
});

// socketio(server);