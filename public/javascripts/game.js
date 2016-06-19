'use strict';
require.config({
    shim: {
        'jquery': { exports: 'jQuery' },
        'ie10-viewport-hack': {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: '/assets/js/jquery-1.12.1.min',
        'ie10-viewport-hack': '/assets/js/ie10-viewport-bug-workaround',
        'ie-emulation-modes': '/assets/js/ie-emulation-modes-warning',
        'socket.io': '/socket.io/socket.io',
    }
});


require(['jquery', 'socket.io', 'ie10-viewport-hack', 'ie-emulation-modes'], function($, io) {
    var socket = io('http://localhost:4321');
    socket.on('chara', function(data) {
        console.log(data);

    });

    socket.on('regist', function(data) {
        console.log('regist');
    });

    socket.on('error', function(data) {
        showError(data.message);
    });

    function showError(msg) {
        console.log('showError');

        console.log(msg);
    }

    var token = $('token').attr("data");
    socket.emit('login', { token: token });
});
