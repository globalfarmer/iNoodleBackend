var slot = require('../models/slot');
var course = require('../models/course');

module.exports = function (code, term, updatedAt, callback) {
	var user = {};
	user.code = code;
	user.term = term;
	user.updatedAt = updatedAt;

	slot.find({'student.code': code,'course.term': term, updatedAt: {$gt: updatedAt}}, (err, docs) => {
		if (err)
			callback(err);
		if (docs.length == 0){
			user.new = false;
			user.updatedAt = new Date(user.updatedAt);
			callback(null, user);
		}
		else user.new = true;
		var slot = [];
		var count = 0;
		docs.forEach((item, index) => {
			if (item.updatedAt)
				user.updatedAt = new Date(user.updatedAt).getTime() < new Date(item.updatedAt).getTime() ? item.updatedAt:user.updatedAt;
			course.findOne({code: item.course.code, term: term},(err, cour) => {
				if (err)
					callback(err);
				if (cour){
					if (cour.updatedAt)
						user.updatedAt = Math.max(user.updatedAt, cour.updatedAt)
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
					user.updatedAt = new Date(user.updatedAt);
					callback(null, user);
				}
			})
		});
	});
}