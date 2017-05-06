var mongoose = require('mongoose');

var SlotSchema = mongoose.Schema({
	student: {
		_id: mongoose.Schema.Types.ObjectId,
		code: String,
		fullname: String,
		sex: String,
		birthday: String,
		klass: String
	},
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
	note: String,
	term: String,
	createdAt: Date,
	updatedAt: Date
}, {collection: 'slot'})

var Slot = module.exports = mongoose.model('slot', SlotSchema);