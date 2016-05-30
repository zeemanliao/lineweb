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
    $.ajax({
        type: 'GET',
        url: '/API/game/all',data: { page: 1, limit: 3 },

        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: function(jqXHR, statusText) {
            showError(statusText)
        }
    });

    function showError(msg) {
        console.log('showError');

        console.log(msg);
    }
});
