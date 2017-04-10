var express = require('express');
var router = express.Router();
var slot = require('../models/slot');
var course = require('../models/course');
var statusResponse = require('../util/statusResponse');

router.get('/:code', (req, res) => {
	code = req.params.code;
	slot.find({'student.code': code}, (err, docs) => {
		if (err)
			statusResponse(res, 400, err);
		var slot = [];
		var count = 0;
		docs.forEach((item, index) => {
			course.findOne({code: item.course.code},(err, cour) => {
				if (err)
					statusResponse(res, 400, err);
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
				if (count == docs.length)
					res.json(slot);
			})
		});
	});
})

module.exports = router;