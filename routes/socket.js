var sockets = require('socket.io');
var dataStudent = require('../util/dataStudent');

module.exports = initSocket;

function initSocket(server) {
	var sks = sockets.listen(server);

	sks.of('/inoodle').on('connection', function (socket) {
		socket.on('updateDataUser', function (user) {
			dataStudent(user.code, user.term, (err, data) => {
				var dataDate = new Date(data.updatedAt).getTime();
				var userDate = new Date(user.updatedAt).getTime();

				if (dataDate > userDate){
					socket.emit('updateDataUser',{err: err, user: data});
				}
			})
		})
	})
}