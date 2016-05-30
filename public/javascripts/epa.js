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
        'util': '/javascripts/util',
        'underscore': '/assets/js/underscore1.8.3-min'
    }
});

require(['jquery', 'underscore', 'bootstrap', 'ie10-viewport-hack', 'ie-emulation-modes'], function($, _) {
    var datas = [];
    var Countys = [];

    var UIs = {
        data: $('#epa_data'),
        areaName: $('#area_name'),
        PublishTime: $('#PublishTime'),
        taiwanButtons: $('#taiwan_buttons'),
        TaiwanMap: $('#TaiwanMap'),
        PSIFilter: $('#psi-filter')
    };

    var _aryPSI = {};
    var _aryFPMI = [];
    var defaultCounty = '臺北市';
    _aryPSI.PSI1 = { text: '良好', style: 'success' };
    _aryPSI.PSI2 = { text: '普通', style: 'warning' };
    _aryPSI.PSI3 = { text: '不良', style: 'danger' };
    _aryPSI.PSI4 = { text: '非常不良', style: 'danger' };
    _aryPSI.PSI5 = { text: '有害', style: 'danger' };
    _aryPSI.PSI5 = { text: '有害', style: 'danger' };
    _aryPSI.PSI6 = { text: '設備維護', style: 'info' };

    _aryFPMI['0'] = { text: '設備維護', style: 'info' };
    _aryFPMI['1'] = { text: '低', style: 'success' };
    _aryFPMI['2'] = { text: '低', style: 'success' };
    _aryFPMI['3'] = { text: '低', style: 'success' };
    _aryFPMI['4'] = { text: '中', style: 'warning' };
    _aryFPMI['5'] = { text: '中', style: 'warning' };
    _aryFPMI['6'] = { text: '中', style: 'warning' };
    _aryFPMI['7'] = { text: '高', style: 'danger' };
    _aryFPMI['8'] = { text: '高', style: 'danger' };
    _aryFPMI['9'] = { text: '高', style: 'danger' };
    _aryFPMI['10'] = { text: '非常高', style: 'danger' };

    $.ajax({
        url: '/api/epa'
    }).done(function(_datas) {
        UIs.taiwanButtons.children().remove();

        for (var i in _datas) {
            var data = _datas[i].data;
            if (!_.contains(Countys, data.County)) {
                Countys.push(data.County);
                UIs.taiwanButtons.append('<button type=\'button\' class=\'btn btn-primary\'>' + data.County + '</button>');
            }
            datas.push(data);
        }
        var filterCountry = defaultCounty;
        showData({
            title: filterCountry,
            field: 'County',
            data: filterCountry
        });
    });
    UIs.taiwanButtons.on('click', 'button',
        function() {
            var filterCountry = $(this).text();
            showData({
                title: filterCountry,
                field: 'County',
                data: filterCountry
            });
            $('html, body').scrollTop(0);
        });
    UIs.TaiwanMap.on('click', 'area',
        function() {
            var filterCountry = $(this).attr('alt');
            showData({
                title: filterCountry,
                field: 'County',
                data: filterCountry
            });
        });
    UIs.PSIFilter.on('click', 'a',
        function() {
            var filterData = $(this).attr('data');
            showData({
                title: '空氣指標-' + _aryPSI[filterData].text,
                field: 'PSIStyle',
                data: filterData
            });
        });
    /*
        filter.title
        filter.field
        filter.data
    */
    function showData(filter) {
        UIs.data.children().remove();
        UIs.areaName.text(filter.title);
        for (var j in datas) {
            var data = datas[j];

            if (filter.data == data[filter.field]) {
                var content = getContent(data);
                UIs.data.append(content);
            }
        }

    }

    function getContent(data) {

        if (data.PublishTime !== '') {
            UIs.PublishTime.text('公告時間:' + data.PublishTime);
        }
        var psi = _aryPSI[data.PSIStyle] || { text: '', style: '' };
        var fpmi = _aryFPMI[data.FPMI] || { text: '', style: '' };
        return '<tr>' +
            '    <td class=\'text-primary\'><strong>' + data.SiteName + '</strong></td>' +
            '    <td class=\'' + psi.style + '\'>' + psi.text + '</td>' +
            '    <td class=\'' + fpmi.style + '\'>' + data.PM25 + '</td>' +
            '    <td class=\'' + fpmi.style + '\'>' + fpmi.text + '</td>' +
            '</tr>';
    }
});
