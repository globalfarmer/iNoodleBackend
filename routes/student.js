var express = require('express');
var router = express.Router();
var dataStudent = require('../util/dataStudent');
var statusResponse = require('../util/statusResponse');

router.get('/:code', (req, res) => {
	code = req.params.code;
	dataStudent(code, (err, data) => {
		if (err)
			statusResponse(res, 400, err);
		else
			res.json(data);
	});
})

module.exports = router;