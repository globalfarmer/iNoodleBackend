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
	announce = require('./routes/announce'),
	student = require('./routes/student');

var config = require('./config/config.json')[process.env.NODE_ENV || 'development'];

//mongoose
mongoose.connect(config.db.host);

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + config.db.host);
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});
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

app.use((req, res, next) => {
	console.log('Request: ' + req.url);
	next();
})

//route
app.use('/finaltest', finaltest);
app.use('/slot', slot);
app.use('/scoreboard', scoreboard);
app.use('/announce', announce);
app.use('/student', student);

var server = app.listen(8080, () => {
	console.log('Server started on port ' + 8080);
});

// socketio(server);