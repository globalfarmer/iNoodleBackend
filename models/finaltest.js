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
		code: String,
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