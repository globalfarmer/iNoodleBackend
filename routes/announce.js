var express = require('express');
var router = express.Router();
var dataAnnounce = require('../util/dataAnnounce');
var statusResponse = require('../util/statusResponse');

router.post('/', (req, res) => {
	uploadtime = req.body.uploadtime;
	dataAnnounce(uploadtime, (err, data) => {
		if (err)
			statusResponse(res, 400, err);
		res.json(data);
	});
})

module.exports = router;