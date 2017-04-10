var mongoose = require('mongoose');

var CourseSchema = mongoose.Schema({
	code: String,
	name: String,
	teacher: String,
	students: String,
	dayInWeek: String,
	session: String,
	amphitheater: String,
	group: String, 
	term: String,
	createdAt: Date,
	updatedAt: Date
}, {collection: 'course'})

var course = module.exports = mongoose.model('course', CourseSchema);