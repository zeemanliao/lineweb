'use strict';
require.config({
    shim: {
        'jquery': { exports: 'jQuery' },
        bootstrap: {
            deps: ['jquery'],
            exports: '$.fn.transition'
        },
        'ie10-viewport-hack': {
            deps: ['jquery']
        },
        'UI': {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: '/assets/js/jquery-1.12.1.min',
        bootstrap: '/dist/js/bootstrap.min',
        'ie10-viewport-hack': '/assets/js/ie10-viewport-bug-workaround',
        'ie-emulation-modes': '/assets/ie-emulation-modes-warning',
        'socket.io': '/socket.io/socket.io',
        'util': '/javascripts/util',
        'UI': '/javascripts/UI'
    }
});


require(['jquery', 'socket.io', 'util', 'UI', 'bootstrap', 'ie10-viewport-hack', 'ie-emulation-modes'], function($, io, util, UI) {
  
});
