var mongoose = require('mongoose');

var FinalTestSessionSchema = mongoose.Schema({
	student: {
		_id: mongoose.Schema.Types.ObjectId,
		code: String,
		fullname: String,
		sex: String,
		birthday: String,
		klass: String
	},
	seat: String,
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
	time: Date,
	sessionNo: String,
	room: String,
	area: String,
	type: String,
	term: String,
	createdAt: Date,
	updatedAt: Date
}, {collection: 'finaltest'});

var finalTestSession = module.exports = mongoose.model('finalTestSession', FinalTestSessionSchema);