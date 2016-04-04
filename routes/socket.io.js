'use strict';

let xssFilters = require('xss-filters');

module.exports = function(io) {

    io.sockets.on('connection', function(socket) {


        /**
         * 接收用戶端傳來的資料
         *
         * @param {JSON} data 資料
         */
        socket.on('chat', function(cmd) {
        let user = socket.handshake.session.passport.user;

            if (!cmd)
                return;
            if (!cmd.message)
                return;

            io.emit('chat', { 
            	name: user.name,
            	photo:user.photo,
            	tim:new Date(),
            	message: xssFilters.inHTMLData(cmd.message) });
        });
    });
};
