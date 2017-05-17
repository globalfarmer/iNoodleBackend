var student = require('../models/student');

module.exports = function(code, callback){
	var user = {};
	student.findOne({'code': code}, (err, doc) => {
		// console.log(doc);
		if (err)
			callback(err);
		
		user = doc;
	}).then(() => {
		callback(null, user);
	})
}