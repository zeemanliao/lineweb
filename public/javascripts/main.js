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
        }
    },
    paths: {
        jquery: '/assets/js/jquery-1.12.1.min',
        bootstrap: '/dist/js/bootstrap.min',
        'ie10-viewport-hack': '/assets/js/ie10-viewport-bug-workaround',
        'ie-emulation-modes': '/assets/js/ie-emulation-modes-warning',
        'util': '/javascripts/util'
    }
});

require(['jquery', 'bootstrap', 'ie10-viewport-hack', 'ie-emulation-modes'], function($) {
    $('.nav-tabs a').click(function() {
        $(this).tab('show');
    });
});
