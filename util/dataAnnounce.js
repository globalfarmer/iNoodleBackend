var announce = require('../models/announce');

module.exports = function(uploadtime, callback){
	var user = {};
	var announ = [];
	user.uploadtime = new Date(uploadtime);
	user.new = false;
	announce.find({uploadtime: {$gt: uploadtime}}).sort({uploadtime: -1}).limit(10).exec((err, docs) => {
		if (err)
			callback(err);
		if (docs.length != 0){
			user.announce = docs;
			user.uploadtime = docs[0].uploadtime;	
			user.new = true;
		}
	}).then(() => {
		callback(null, user);
	})
}