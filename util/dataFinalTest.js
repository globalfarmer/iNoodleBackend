var finalTestSession = require('../models/finaltest');
var course = require('../models/course');

module.exports = function (code, term, callback) {
	var user = {};
	user.code = code;
	user.term = term;

	finalTestSession.find({'student.code': code, term: term}, (err, docs) => {
		if (err)
			callback(err);
		var final = [];
		var count = 0;
		if (docs.length == 0){
			user.final = final;
			callback(null, user);
		}
		docs.forEach((item, index) => {
			if (item.course.code.match(/[A-Z]/g) === null && item.course.code.match(/ /g) === null)
				course.findOne({code: item.course.code, term: term},(err, cour) => {
					if (err)
						statusResponse(res, 400, err);
					if (cour){
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
						callback(null, user);
					}
				})
			else count++;
		});
	});
}