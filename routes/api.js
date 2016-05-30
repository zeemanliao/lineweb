'use strict';
let fs = require('fs');
let path = require('path');
let _path = path.join(__dirname, './api');
var express = require('express');


/**
    載入RESTful API
    載入路徑./API/{檔名}中的所有API
    /API/{檔名}/{path}/{args}
    API物件 
    {
    RESTful["get","post","delete","put","options"]:{
        "path":string,
        "fun":function,
        {"args":Array}
    }
**/
module.exports = function(app) {

    let objs = {};
    let RESTful = { "get": true, "post": true, "delete": true, "put": true, "patch": true, "head": true, "options": true };

    let patt = new RegExp(".js");
    fs.readdirSync(_path).forEach(function(filename) {
        if (!patt.test(filename)) {
            return;
        }
        let router = express.Router();
        let _name = path.basename(filename, '.js');

        let apis = require(path.join(_path, filename))(app);

        for (let i in apis) {
            let api = apis[i];
            if (i in RESTful) {
                if (!api.fun) {
                    console.log('RESTful API load warring:%s "fun" undefined', _name);
                } else if (!api.path) {
                    console.log('RESTful API load warring:%s "path" undefined', _name);
                } else {
                    if (api.args) {
                        //args["id","name"]->:id/:name
                        router[i](api.path + ':' + api.args.join('/:'), api.fun);
                    } else {
                        router[i](api.path, api.fun);
                    }
                }
            } else {
                console.log('RESTful API load warring:%s->%s not RESTful mothed', _name, i);
            }
        }
        app.use('/API/' + _name, router);
        console.log('RESTful API loaded:%s', _name);
    });

};
