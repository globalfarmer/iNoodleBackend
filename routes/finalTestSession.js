var express = require('express');
var router = express.Router();
var finalTestSession = require('../models/finalTestSession');
var course = require('../models/course');
var statusResponse = require('../util/statusResponse');

router.get('/:code', (req, res) => {
	code = req.params.code;
	
	finalTestSession.find({'student.code': code}, (err, docs) => {
		if (err)
			statusResponse(res, 400, err);
		var final = [];
		var count = 0;
		docs.forEach((item, index) => {
			course.findOne({code: item.course.code},(err, cour) => {
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
				if (count == docs.length)
					res.json(final);
			})
		});
	});
})

module.exports = router;