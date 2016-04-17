'use strict';
let Schema = require('mongoose').Schema;

let schema = new Schema(
  {
	id:{type: String, unique: true},
    tim: {type: Number}
  }
);


module.exports = schema;