var finalTestSession = require('../models/finaltest');
var scoreBoard = require('../models/scoreboard');

module.exports = function (code, term, updatedAt, callback) {
	var user = {};
	user.code = code;
	user.term = term;
	user.updatedAt = updatedAt;
	var scoreboard = [];

	finalTestSession.find({'student.code': code, term: term}, (err, docs) => {
		if (err)
			callback(err);
		
		docs.forEach((item, index) => {
			courseCode = item.course.code.trim().toLowerCase().replace(new RegExp(' ', 'g'),'');
			scoreBoard.findOne({'course.code': courseCode, 'term': term, 'updatedAt': {$gt: updatedAt}}, (err, score) => {
				if (err)
					callback(err);
				if (score){
					scoreboard.push(score);
					if (score.updatedAt)
						user.updatedAt = new Date(user.updatedAt).getTime() < new Date(score.updatedAt).getTime() ? score.updatedAt:user.updatedAt;
				}
			})
		});
	}).then(() => {
		if (scoreboard.length != 0){
			user.new = true;
			user.scoreboard = scoreboard;
		}else
			user.new = false;
		user.updatedAt = new Date(user.updatedAt);
		callback(null, user);
	});
}