'use strict';
let fs = require('fs');
let path = require('path');
let _path = path.join(__dirname, './obj');

module.exports = function(app) {

    let objs = {};

    let patt = new RegExp(".js");
    fs.readdirSync(_path).forEach(function(filename) {

        if (!patt.test(filename)) {
            return;
        }

        let _name = path.basename(filename, '.js');

        let _class = require(path.join(_path, filename));
        objs[_name] = new _class(app);


        console.log('Models loaded:%s', _name);
    });
    return objs;
};
