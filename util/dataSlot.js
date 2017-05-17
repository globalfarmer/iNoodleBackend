var slot = require('../models/slot');
var course = require('../models/course');

module.exports = function (code, term, callback) {
	var user = {};
	user.code = code;
	user.term = term;

	slot.find({'student.code': code,'course.term': term}, (err, docs) => {
		if (err)
			callback(err);
		var slot = [];
		var count = 0;
		if (docs.length == 0){
			user.slot = slot;
			callback(null, user);
		}
		docs.forEach((item, index) => {
			if (item.course.code.match(/[A-Z]/g) === null && item.course.code.match(/ /g) === null)
				course.findOne({code: item.course.code, term: term},(err, cour) => {
					if (err)
						callback(err);
					if (cour){
						var newSlot = {
							student: {
								code: docs[index].student.code,
								fullname: docs[index].student.fullname,
								birthday: docs[index].student.birthday,
								klass: docs[index].student.klass
							},
							course: {
								code: docs[index].course.code,
								name: docs[index].course.name,
								teacher: cour.teacher,
								students: cour.students,
								dayInWeek: cour.dayInWeek,
								session: cour.session,
								amphitheater: cour.amphitheater,
								group: cour.group,
								term: cour.term
							},
							note: docs[index].note,
						}
						slot.push(newSlot);
					}else{
						slot.push(docs[index]);
					}
					count++;
					if (count == docs.length){
						user.slot = slot;
						callback(null, user);
					}
				})
			else count++;
		});
	});
}