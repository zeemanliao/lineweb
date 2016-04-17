'use strict';
let Schema = require('mongoose').Schema;

let schema = new Schema(
  {
    tim: {type: Number},
    data:{
    	  "CO": {type: String},
		  "County": {type: String},
		  "FPMI": {type: String},
		  "MajorPollutant": {type: String},
		  "NO": {type: String},
		  "NO2": {type: String},
		  "NOx": {type: String},
		  "O3": {type: String},
		  "PM10": {type: String},
		  "PM25": {type: String},
		  "PSI": {type: String},
		  "PublishTime": {type: String},
		  "SiteName": {type: String},
		  "SO2": {type: String},
		  "Status": {type: String},
		  "WindDirec": {type: String},
		  "WindSpeed": {type: String}
    }
  }
);


module.exports = schema;