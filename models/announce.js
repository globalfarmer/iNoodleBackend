var mongoose = require('mongoose');

var AnnounceSchema = mongoose.Schema({
	name: String,
	link: String,
	uploadtime: Date
}, {collection: 'announce'})

var Announce = module.exports = mongoose.model('announce', AnnounceSchema);