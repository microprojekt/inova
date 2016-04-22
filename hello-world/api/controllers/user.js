'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/
/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var pg = require('pg');
var config = require('./config');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var conString = {
    host: config.db.host,
    user: config.db.username,
    database: config.db.database
}
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports = {
    checkLogin: checkLogin    
}

function checkLogin(req, res, next) {

    var creds = JSON.parse(req.swagger.params.creds.value);
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        } else {
            var query = "select username,password,vrsta_lic,client_id,user_id from users where username='" + creds.username + "' limit 1";

            client.query(query, function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                } else {
                    var user = result.rows[0];
                    if (typeof(user) === 'undefined') {
                        res.json({
                            success: false,
                            message: "Ne postoji takav korisnik",
                        });
                    } else {
                        var hashPassword = crypto.createHash('md5').update(creds.password).digest("hex");
                        if (user.password !== hashPassword) {
                            res.json({
                                success: false,
                                message: 'Wrong password',
                            });
                        } else {
                            var token = jwt.sign(user, config.secret);
                            res.json({
                                success: true,
                                message: 'Token send',
                                token: token
                            });
                        }
                    }
                }
            })
        }
    });
    //{"username":"marin", "password":"micro"}
}