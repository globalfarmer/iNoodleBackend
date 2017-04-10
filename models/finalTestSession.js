var mongoose = require('mongoose');

var FinalTestSessionSchema = mongoose.Schema({
	student: {
		code: String,
		fullname: String,
		birthday: String,
		klass: String
	},
	seat: String,
	course: {
		code: String,
		name: String
	},
	time: Date,
	sessionNo: String,
	room: String,
	area: String,
	type: String,
	term: String,
	createdAt: Date,
	updatedAt: Date
}, {collection: 'finalTestSession'});

var finalTestSession = module.exports = mongoose.model('finalTestSession', FinalTestSessionSchema);