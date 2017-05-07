var express = require('express');
var router = express.Router();
var fs = require('fs');
var dataScoreBoard = require('../util/dataScoreboard');
var statusResponse = require('../util/statusResponse');

router.post('/', (req, res) => {
	code = req.body.code;
	term = req.body.term;
	dataScoreBoard(code, term, (err, data) => {
		if (err)
			statusResponse(res, 400, err);
		else
			res.json(data);
	});
})

router.get('/:filename', (req, res) => {
	var filename = req.params.filename;
	var term = filename.slice(filename.length - 15, filename.length - 4);
	var filepath = '/../../iNoodleCrawler/public/scoreboard/' + term + '/'
	fs.readFile(__dirname + filepath + filename, (err, data) => {
		if (err)
			statusResponse(res, 400, err);
		else{
			res.writeHead(200, {"Content-type":"application/pdf", 'Content-disposition': 'inline; filename="' + filename + '"'});
			res.end(data);
		}
	});
})

module.exports = router;