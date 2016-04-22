'use strict';

var pg = require('pg');
var config = require('./config');

var conString = {
	host: config.db.host,
	user: config.db.username,
	database: config.db.database
};


var client = new pg.Client(conString);
	client.connect(function(e,bb){
		if(e){

		}
		else{
			var query= "select * from users";
			client.query(query, function(err, result) {
			    if(err) {
			      return cb(err)
			    }
			    else{
			    	res.json(result.rows)
			    }
			})
		}
	});