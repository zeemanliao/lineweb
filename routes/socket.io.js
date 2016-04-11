'use strict';

let xssFilters = require('xss-filters');

let chatUsers = {};
let ddosTime = 3000;    //ms
let lastChatLimit = 10;
let lastChats = [];
module.exports = function(io, app) {
    let Storage = app.Storage;

    io.sockets.on('connection', function(socket) {
        let user = null;
        if (socket.handshake.session.passport && socket.handshake.session.passport.user) {
          user = socket.handshake.session.passport.user;
          user.last = new Date().getTime();
          chatUsers[user.id] = user;
        }
        //第一次連線取得所有線上人員
        io.emit('chat', {users:getOnlineUsers(),messages:lastChats});

        /**
         * 接收用戶端傳來的資料
         *
         * @param {JSON} data 資料
         */
        socket.on('chat', function(cmd) {
            if (user == null) {
                socket.emit('warning', {message:'登入後才可發言!'});
                return;
            }
            if (!cmd)
                return;
            if (!cmd.message)
                return;

            let thisTime = new Date().getTime();
            //DDOS
            if (thisTime - user.last <= ddosTime) {
                socket.emit('warning', {message:'您離上次發言的時間過短!'});
                return;
            }
            user.last = thisTime;

            var ChatLog = new Storage.ChatLogs();

            ChatLog.name = user.name;
            ChatLog.id = user.id;
            ChatLog.msg = cmd.message;
            ChatLog.photo = user.photo;
            ChatLog.tim = user.last;
            ChatLog.target = 'public';

            ChatLog.save(function(err) {
                if (err)
                    console.log(err);

                var msg = {
                            name: user.name,
                            photo: user.photo,
                            tim: new Date().getTime(),
                            message: xssFilters.inHTMLData(cmd.message)
                        };
                lastChats.push(msg);
                if (lastChats.length>lastChatLimit) {
                    lastChats.shift();
                }
                io.emit('chat', {messages:
                    [msg]
                });
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