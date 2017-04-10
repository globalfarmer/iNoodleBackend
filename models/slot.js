var mongoose = require('mongoose');

var SlotSchema = mongoose.Schema({
	student: {
		code: String,
		fullname: String,
		birthday: String,
		klass: String
	},
	course: {
		code: String,
		name: String,
		tc: String,
		group: String,
		term: String
	},
	note: String,
	createdAt: Date,
	updatedAt: Date
}, {collection: 'slot'})

var Slot = module.exports = mongoose.model('slot', SlotSchema);