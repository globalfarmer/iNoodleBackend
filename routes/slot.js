var express = require('express');
var router = express.Router();
var dataSlot = require('../util/dataSlot');
var statusResponse = require('../util/statusResponse');

router.post('/', (req, res) => {
	code = req.body.code;
	term = req.body.term;
	updatedAt = req.body.updatedAt;
	dataSlot(code, term, updatedAt, (err, data) => {
		if (err)
			statusResponse(res, 400, err);
		res.json(data);
	});
})

module.exports = router;