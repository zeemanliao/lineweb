'use strict';

let xssFilters = require('xss-filters');

let chatUsers = {};
let ddosTime = 3000; //ms
let lastChatLimit = 10;
let lastChats = [];
let chatLimit = 3; //連續發言不可超過次數

module.exports = function(io, app) {
    let Storage = app.Storage;

    Storage.ChatLogs.find({ target: 'public' }).sort('-tim').limit(10).exec(
        function(err, _chats) {
            if (err) {
                return console.log(err);
            }

            for (let i in _chats) {
                lastChats.unshift(_chats[i]);
            }
        }
    );

    io.sockets.on('connection', function(socket) {
        let user = null;
        if (socket.handshake.session && socket.handshake.session.user) {
            user = socket.handshake.session.user;
            user.last = new Date().getTime();
            chatUsers[user.id] = user;
        }

        //第一次連線取得所有線上人員
        io.emit('chat', { users: getOnlineUsers() });

        //第一次連進取得訊息
        socket.emit('chat', { messages: getLastChat() });
        /**
         * 接收用戶端傳來的資料
         *
         * @param {JSON} data 資料
         */
        socket.on('chat', function(cmd) {
            if (user === null) {
                socket.emit('warning', { message: '登入後才可發言!' });
                return;
            }
            if (!cmd) {
                return;
            }
            if (!cmd.message) {
                return;
            }

            if (isChatOver(user.id)) {
                socket.emit('warning', { message: '無法連續發言超過「' + chatLimit + '」次!' });
            }

            let thisTime = new Date().getTime();
            //DDOS
            if (thisTime - user.last <= ddosTime) {
                socket.emit('warning', { message: '您離上次發言的時間過短!' });
                return;
            }
            user.last = thisTime;

            var ChatLog = new Storage.ChatLogs();

            ChatLog.name = user.name;
            ChatLog.id = user.id;
            ChatLog.message = cmd.message;
            ChatLog.photo = user.photo;
            ChatLog.tim = user.last;
            ChatLog.target = 'public';

            ChatLog.save(function(err) {
                if (err) {
                    console.log(err);
                }

                var msg = {
                    name: user.name,
                    photo: user.photo,
                    tim: new Date().getTime(),
                    message: xssFilters.inHTMLData(cmd.message)
                };
                lastChats.push(ChatLog);
                if (lastChats.length > lastChatLimit) {
                    lastChats.shift();
                }
                io.emit('chat', {
                    messages: [msg]
                });
            });
        });

        socket.on('disconnect', function() {
            if (user !== null) {
                delete chatUsers[user.id];
                io.emit('chat', { users: getOnlineUsers() });
            }
        });
    });
};

function isChatOver(id) {
    let lastIndex = lastChats.length - 1;
    if (lastIndex + 1 >= chatLimit) {
        for (let pIndex = lastIndex; pIndex > lastIndex - chatLimit; pIndex--) {
            if (lastChats[pIndex].id != id) {
                return false;
            }
        }
    }
    return true;
}

function getOnlineUsers() {
    let users = [];
    for (let i in chatUsers) {
        let user = {
            name: chatUsers[i].name,
            photo: chatUsers[i].photo,
            last: chatUsers[i].last
        };
        users.push(user);
    }
    return users;
}

function getLastChat() {
    let msgs = [];
    for (let i in lastChats) {
        msgs.push({
            name: lastChats[i].name,
            photo: lastChats[i].photo,
            tim: lastChats[i].tim,
            message: lastChats[i].message
        });
    }
    return msgs;
}
