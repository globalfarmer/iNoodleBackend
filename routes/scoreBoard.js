var express = require('express');
var router = express.Router();
var dataScoreBoard = require('../util/dataScoreboard');
var statusResponse = require('../util/statusResponse');

router.post('/', (req, res) => {
	code = req.body.code;
	term = req.body.term;
	dataScoreBoard(code, term, (err, data) => {
		if (err)
			statusResponse(res, 400, err);
		res.json(data);
	});
})

module.exports = router;