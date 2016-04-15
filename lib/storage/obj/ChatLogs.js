'use strict';
let Schema = require('mongoose').Schema;

let schema = new Schema(
  {
    name:      { type: String },
    id:     { type: String },
    message:     { type: String },
    photo: { type: String},
    tim: {type: Number},
    target: {type: String}
  }
);


module.exports = schema;