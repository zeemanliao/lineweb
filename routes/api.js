'use strict';
let fs = require('fs');
let path = require('path');
let _path = path.join(__dirname, './api');

module.exports = function(app) {

    let objs = {};

    let patt = new RegExp(".js");
    fs.readdirSync(_path).forEach(function(filename) {

        if (!patt.test(filename)) {
            return;
        }

        let _name = path.basename(filename, '.js');

        let router = require(path.join(_path, filename))(app);
        app.use('/api/' + _name, router);
        console.log('RESTful API loaded:%s', _name);
    });

};
