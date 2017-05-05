var mongoose = require('mongoose');

var CourseSchema = mongoose.Schema({
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
    createdAt: Date,
    updatedAt: Date
}, { 
    collection: 'course'
 })

var course = module.exports = mongoose.model('course', CourseSchema);
