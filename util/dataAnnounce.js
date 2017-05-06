var announce = require('../models/announce');

module.exports = function(page, callback){
	var user = {};
	user.page = page;
	announce.find({}).sort({uploadtime: -1}).limit(10*page).exec((err, docs) => { //uploadtime: {$gt: uploadtime}
		if (err)
			callback(err);
		var announ = [];
		if (docs.length != 0 && docs.length >= 10*page){
			for (var i = 10*(page-1); i < 10*page; i++) {
				announ.push(docs[i]);
			}
			user.announce = announ;
		}else{
			user.announce = announ;
		}
		
	}).then(() => {
		callback(null, user);
	})
}