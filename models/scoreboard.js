var mongoose = require('mongoose');

var ScoreBoardSchema = mongoose.Schema({
	href: String,
	course: {
		_id: mongoose.Schema.Types.ObjectId,
		code: String,
	    name: String,
	    tc: String,
	    teacher: String,
	    students: String,
	    daypart: String,
	    dayInWeek: String,
	    session: String,
	    amphitheater: String,
	    group: String,
	    term: String,
	},
	term: String,
	uploadtime: Date,
	file: {
		available: Boolean,
		filename: String,
		path: String
	},
	updatedAt: Date,
	createdAt: Date
}, {collection: 'scoreboard'});

var scoreBoard = module.exports = mongoose.model('scoreBoard', ScoreBoardSchema)