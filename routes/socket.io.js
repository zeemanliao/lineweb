'use strict';

let xssFilters = require('xss-filters');

let chatUsers = {};
module.exports = function(io) {

    io.sockets.on('connection', function(socket) {
        let user = null;
        if (socket.handshake.session.passport.user) {
          user = socket.handshake.session.passport.user;
          user.last = new Date().getTime();
          chatUsers[user.id] = user;
        }


        io.emit('chat', {users:getOnlineUsers()});
        socket.on('*', function(){
            if (user == null)
                return;

            user.last = new Date().getTime();
        });
        /**
         * 接收用戶端傳來的資料
         *
         * @param {JSON} data 資料
         */
        socket.on('chat', function(cmd) {
            if (user == null)
                return;
            if (!cmd)
                return;
            if (!cmd.message)
                return;

            io.emit('chat', {
                name: user.name,
                photo: user.photo,
                tim: new Date().getTime(),
                message: xssFilters.inHTMLData(cmd.message)
            });
        });

        socket.on('disconnect', function() {
            if (user != null) {
                delete chatUsers[user.id];
                io.emit('chat', {users:getOnlineUsers()});
            }
        });
    });
};

function getOnlineUsers() {
    let users = [];
    for (let i in chatUsers) {
        let user = {
            name:chatUsers[i].name,
            photo:chatUsers[i].photo,
            last:chatUsers[i].last
        };
        users.push(user);
    }
    return users;
}