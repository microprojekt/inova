'use strict';

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
    getOP: getOP,
    saveOp: saveOp   
}
function getOP(req, res, next) {
    //console.log(req.decoded);
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        } else {
            var clientId = req.decoded.client_id;
            console.log(clientId);
            var query = `select
                c.client_name,
                e.naziv_drustva as full_name,
                e.skraceni_naziv_drustva as short_name,
                e.maticni_broj as mb,
                e.oib,
                e.drzava,
                e.adresa as address,
                e.web,               
                e.fax
            from plur_op e 
            join sadrzaj s on s.id = e.id 
            join clients c on c.client_id=s.client_id 
            where s.active = 1 and c.client_id = ` + clientId + ` `;

            client.query(query, function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                } else {
                    console.log(result.rows[0]);
                    res.json(result.rows[0]);
                }
            })
        }
    })
}
function saveOp(req, res, next) {
    var podaci = JSON.parse(req.swagger.params.podaci.value);
    var clientId = req.decoded.client_id;
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        } else {
            //console.log(podaci);
            var query = `update plur_op e 
            set naziv_drustva ='` + podaci.full_name + `',
                skraceni_naziv_drustva = '` + podaci.short_name + `',
                maticni_broj ='` + podaci.mb + `',
                oib='` + podaci.oib + `',
                adresa='` + podaci.address + `',                
                fax='` + podaci.fax + `'
            where e.client_id = ` + clientId + ``;

            //console.log(query);
            client.query(query, function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                } else {
                    //console.log(podaci);
                    res.json(podaci);
                }
            })
        }
    })
}

