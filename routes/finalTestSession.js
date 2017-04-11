var express = require('express');
var router = express.Router();
var dataStudent = require('../util/dataStudent');
var statusResponse = require('../util/statusResponse');

router.get('/:code', (req, res) => {
	code = req.params.code;
	term = '2016-2017-1';
	dataStudent(code, term, (err, data) => {
		if (err)
			statusResponse(res, 400, err);
		res.json(data);	
	});
})

module.exports = router;