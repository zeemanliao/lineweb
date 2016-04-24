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

	var UIs = {
		data:$('#epa_data'),
		areaName:$('#area_name'),
		PublishTime:$('#PublishTime'),
		taiwanButtons:$('#taiwan_buttons'),
		TaiwanMap:$('#TaiwanMap')
	};
    $.ajax({
        url: "/api/epa"
    }).done(function(_datas) {
    	UIs.taiwanButtons.children().remove();

        for (var i in _datas) {
            var data = _datas[i].data;
            if (!_.contains(Countys, data.County)) {
            	Countys.push(data.County);
            	UIs.taiwanButtons.append('<button type="button" class="btn btn-primary">'+data.County+'</button>');
            }
            datas.push(data);
        }

        showData('臺北市');
    });
    UIs.taiwanButtons.on('click','button',
    	function() {
    		showData($(this).text());
    		$('html, body').scrollTop(0);
	});
    UIs.TaiwanMap.on('click','area',
    	function(){
    		showData($(this).attr('alt'));
    	});

    function showData(CountyName) {
    	UIs.data.children().remove();
    	UIs.areaName.text(CountyName);
		for (var j in datas) {
			var data = datas[j];

			if (CountyName == data.County) {
				var content = getContent(data);
				UIs.data.append(content);
			}
		}

    }

    function getContent(data) {
    	var cl = "default";
    	if (data.PublishTime != '') {
    		UIs.PublishTime.text('公告時間:'+data.PublishTime);
    	}
    	switch (data.Status) {
    		case '良好':
	    		cl = "success";
	    		break;
	    	case '普通':
	    	case '':
	    		break;
	    	default:
	    		cl = "danger";
	    		break;
    	}

    	return '<tr class="' + cl + '">' +
            '    <td class="text-primary"><strong>' + data.SiteName + '</strong></td>' +
            '    <td>' + data.Status + '</td>' +
            '    <td>' + data.PM25 + '</td>' +
            '    <td>' + data.CO + '</td>' +
            '    <td>' + data.NO2 + '</td>' +
            '    <td>' + data.PSI + '</td>' +
            '</tr>';
    }
});
