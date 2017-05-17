var mongoose = require('mongoose');

var StudentSchema = mongoose.Schema({
	code: String,
	fullname: String,
	birthday: String,
	klass: String,
	updatedAt: Date
}, {collection: 'student'})

var Student = module.exports = mongoose.model('Student', StudentSchema);