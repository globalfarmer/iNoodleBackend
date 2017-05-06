var finalTestSession = require('../models/finaltest');
var scoreBoard = require('../models/scoreboard');

module.exports = function (code, term, callback) {
	var user = {};
	user.code = code;
	user.term = term;
	var scoreboard = [];

	finalTestSession.find({'student.code': code, term: term}, (err, docs) => {
		if (err)
			callback(err);
		
		docs.forEach((item, index) => {
			courseCode = item.course.code.trim().toLowerCase().replace(new RegExp(' ', 'g'),'');
			scoreBoard.findOne({'course.code': courseCode, 'term': term}, (err, score) => {
				if (err)
					callback(err);
				if (score)
					scoreboard.push(score)
			}).then(() => {
				if (index+1 == docs.length){
					console.log(scoreboard);
					user.scoreboard = scoreboard;
					callback(null, user);
				}	
			})
		});
	});
}