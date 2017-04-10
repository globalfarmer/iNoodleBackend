module.exports = function(res, statusCode, error, response) {
	response = typeof response !== 'undefined' ? response : "Unavailable. Please try again";

	console.log(error);
	
	return res.status(statusCode).json({
		"error": response
	});
}