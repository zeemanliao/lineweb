require.config({
    shim: {
        "jquery": { exports: "jQuery" },
        bootstrap: {
            deps: ["jquery"],
            exports: "$.fn.transition"
        },
        "ie10-viewport-hack": {
            deps: ["jquery"]
        }
    },
    paths: {
        jquery: '/assets/js/jquery-1.12.1.min',
        bootstrap: '/dist/js/bootstrap.min',
        "ie10-viewport-hack": '/assets/js/ie10-viewport-bug-workaround',
        "ie-emulation-modes": '/assets/ie-emulation-modes-warning',
        "util": '/javascripts/util',
        "underscore":'/assets/js/underscore1.8.3-min'
    }
});

require(['jquery','underscore', 'bootstrap', 'ie10-viewport-hack', 'ie-emulation-modes'], function($,_) {
    var datas = [];
    var Countys = [];
    $.ajax({
        url: "/api/epa"
    }).done(function(_datas) {
    	console.log(_datas);
        for (var i in _datas) {
            var data = _datas[i].data;
            if (!_.contains(Countys, data.County)) {
            	Countys.push(data.County);
            }
            datas.push(data);
        }
        showData();
    });

    function showData() {
    	var frame = $('#accordion');
    	var idx=0;
    	for (var i in Countys) {
    		idx+=1;
    		var CountyName = Countys[i];
    		frame.append(getColl(idx, CountyName));
    		var c = $('#collapse' + idx);
    			
    		for (var j in datas) {
    			var data = datas[j];

    			if (CountyName == data.County) {

    				var content = getContent(idx, data);
    				c.append(content);
    			}
    		}
    	}
    }

    function getColl(idx, county) {
    	return '  <div class="panel panel-info row">' +
				'    <div class="panel-heading">' +
				'      <h4 class="panel-title">' +
				'        <a data-toggle="collapse" data-parent="#accordion" href="#collapse' + idx + '">' +
				'        ' + county + '</a>' +
				'      </h4>' +
				'    </div>' +
				'    <div id="collapse' + idx + '" class="panel-collapse collapse">' +
				'    </div>' +
				'  </div>';
    }

    function getContent(idx, data) {

    	return '  <div class="panel panel-default col-sm-6 col-xs-12 col-md-3">' +
		        '<div class="panel-heading">' + data.SiteName + '</div>' +
      			'<div class="panel-body">PM2.5:' + data.PM25 + '</div>' +
		       '</div>';
    }
});
