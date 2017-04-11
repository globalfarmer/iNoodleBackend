var finalTestSession = require('../models/finalTestSession');
var course = require('../models/course');
var slot = require('../models/slot');

module.exports = function (code, term, callback) {
	var user = {};
	user.code = code;
	user.term = term;
	user.updatedAt = new Date('1-1-1970');
	finalTestSession.find({'student.code': code, term: term}, (err, docs) => {
		if (err)
			callback(err);
		var final = [];
		var count = 0;
		docs.forEach((item, index) => {
			if (item.updatedAt)
				user.updatedAt = Math.max(user.updatedAt, item.updatedAt)
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
				if (count == docs.length)
					user.final = final;
			})
		});
	});

	slot.find({'student.code': code}, (err, docs) => {
		if (err)
			callback(err);
		var slot = [];
		var count = 0;
		docs.forEach((item, index) => {
			if (item.updatedAt)
				user.updatedAt = Math.max(user.updatedAt, item.updatedAt)
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