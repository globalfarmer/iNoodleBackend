var express = require('express');
var router = express.Router();
var dataSlot = require('../util/dataSlot');
var statusResponse = require('../util/statusResponse');

router.post('/', (req, res) => {
	code = req.body.code;
	term = req.body.term;
	dataSlot(code, term, (err, data) => {
		if (err)
			statusResponse(res, 400, err);
		else
			res.json(data);
	});
})

module.exports = router;