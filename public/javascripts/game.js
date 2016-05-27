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
        'ie-emulation-modes': '/assets/ie-emulation-modes-warning',
        'socket.io': '/socket.io/socket.io',
    }
});


require(['jquery', 'socket.io', 'ie10-viewport-hack', 'ie-emulation-modes'], function($, io) {

});
