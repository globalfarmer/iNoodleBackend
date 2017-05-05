var finalTestSession = require('../models/finaltest');
var course = require('../models/course');

module.exports = function (code, term, updatedAt, callback) {
	var user = {};
	user.code = code;
	user.term = term;
	user.updatedAt = updatedAt;

	finalTestSession.find({'student.code': code, term: term, updatedAt: {$gt: updatedAt}}, (err, docs) => {
		if (err)
			callback(err);
		if (docs.length == 0){
			user.new = false;
			user.updatedAt = new Date(user.updatedAt);
			callback(null, user);
		}
		else user.new = true;
		var final = [];
		var count = 0;
		docs.forEach((item, index) => {
			if (item.updatedAt)
				user.updatedAt = new Date(user.updatedAt).getTime() < new Date(item.updatedAt).getTime() ? item.updatedAt:user.updatedAt;
			course.findOne({code: item.course.code, term: term},(err, cour) => {
				if (err)
					statusResponse(res, 400, err);
				if (cour){
					if (cour.updatedAt)
						user.updatedAt = Math.max(user.updatedAt, cour.updatedAt);
					var newFinal = {
						student: {
							code: docs[index].student.code,
							fullname: docs[index].student.fullname,
							birthday: docs[index].student.birthday,
							klass: docs[index].student.klass
						},
						seat: docs[index].seat,
						course: {
							code: docs[index].course.code,
							name: cour.name,
							teacher: cour.teacher,
							students: cour.students,
							dayInWeek: cour.dayInWeek,
							session: cour.session,
							amphitheater: cour.amphitheater,
							group: cour.group,
							term: cour.term
						},
						time: docs[index].time,
						sessionNo: docs[index].sessionNo,
						room: docs[index].room,
						area: docs[index].area,
						type: docs[index].type,
						term: docs[index].term,
					}
					final.push(newFinal);
				}else{
					final.push(docs[index]);
				}
				
				count++;
				if (count == docs.length){
					user.final = final;
					user.updatedAt = new Date(user.updatedAt);
					callback(null, user);
				}
			})
		});
	});
}