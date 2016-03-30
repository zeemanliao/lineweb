'use strict';
module.exports = function(io) {
io.sockets.on('connection', function(socket) {

	let clientName = null;

socket.emit('data', {name:'test'});


	/**
	 * 接收用戶端傳來的資料
	 *
	 * @param {JSON} data 資料
	 */
	socket.on('chat', function(cmd) {
		if (!cmd)
			return;
		if (!cmd.message)
			return;
		console.log(cmd);
		io.emit('chat', {message:cmd.message});
	});
});
};