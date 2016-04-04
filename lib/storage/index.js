'use strict';
let fs = require('fs');
let path = require('path');
let _path = path.join(__dirname, './obj');

module.exports = function(mongoose) {

	let objs = {};

		let patt = new RegExp(".js");
	fs.readdirSync(_path).forEach(function (filename) {

	  if (!patt.test(filename)) {
	    return;
	  }

	  let _name = path.basename(filename, '.js');

	  objs[_name] = mongoose.model(_name ,require(path.join(_path, filename)));

  		console.log('Schema loaded:%s', _name);
	});
	return objs;
};