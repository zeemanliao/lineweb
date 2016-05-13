'use strict';
define(['jquery'],function($){
    return {
        alertMessage: function(type, msg){
            var m = $('#alertContainer');
            var p = $('<div class=\'alert alert-' + type + ' text-center\'>' + msg +'</div>');
            p.hide();
            m.prepend(p);
            p.fadeIn(
                500,
              function hidden() {
                var self = $(this);
                setTimeout(function() {
                    self.slideUp(1000, function() {
                        self.remove();
                    });
                },2000);
            });
        }
    };
});