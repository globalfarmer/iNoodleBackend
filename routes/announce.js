var express = require('express');
var router = express.Router();
var dataAnnounce = require('../util/dataAnnounce');
var statusResponse = require('../util/statusResponse');

router.post('/', (req, res) => {
	page = req.body.page
	dataAnnounce(page, (err, data) => {
		if (err)
			statusResponse(res, 400, err);
		res.json(data);
	});
})

module.exports = router;