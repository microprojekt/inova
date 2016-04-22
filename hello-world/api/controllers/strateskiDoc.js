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
module.exports = {
    getDoc: getDoc,
    downloadDoc: downloadDoc,
    upload: upload,
    postDoc: postDoc,
    delDoc: delDoc
};

function postDoc(req, res) {
    var userId = req.decoded.user_id;
    var clientId = req.decoded.client_id;
    
    //res.json({ 'id': id, 'docname': 'documentIme' });
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        } else {
            var query = `insert
                into sadrzaj
                (name,
                created_by,
                created_ts,
                modified_by,
                vrsta_id,
                client_id) 
             values ('Testno ime',` + userId + `,NOW(), ` + userId + `,149,` + clientId + `) RETURNING id, name`;
            console.log(getDateTime());
            client.query(query, function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                } else {
                    //console.log(result.rows[0]);
                    var id = result.rows[0].id;
                    var name = result.rows[0].name;
                    query = 'insert into ri.dokumentacija(id) values (' + id + ')';
                    client.query(query, function(err, result) {
                        if (err) {
                            return console.error('error running query', err);
                        } else {

                        }
                    })
                    res.json({ 'id': id, 'docname': name });

                }
            })
        }
    })
}

function getDoc(req, res) {

    var client = new pg.Client(conString);
    client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        } else {
            var query = `select 
                        s.id as id,
                        s.name as docName,
                        r.link as fileName,
                        r.autor as autor
                      from ri.dokumentacija r
                      join sadrzaj s on s.id=r.id 
                      where s.active =1`
            client.query(query, function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                } else {
                    //console.log(result.rows);
                    res.json(result.rows);
                }
            })
        }
    })
}

function downloadDoc(req, res, next) {
    //console.log(req.swagger.params.file.value);   
    var filename = "neke-sise.pdf"
    var img = fs.readFileSync('/var/www/testapp/api/hello-world/documents/' + filename + '');

    var file_extension = path.extname(filename).substring(1);
    console.log(file_extension);
    var ctype = "";

    switch (file_extension) {
        case "pdf":
            ctype = "application/pdf";
            break;
        case "htm":
            ctype = "text/html";
            break;
        case "exe":
            ctype = "application/octet-stream";
            break;
        case "zip":
            ctype = "application/zip";
            break;
        case "doc":
            ctype = "application/msword";
            break;
        case "xls":
            ctype = "application/vnd.ms-excel";
            break;
        case "ppt":
            ctype = "application/vnd.ms-powerpoint";
            break;
        case "gif":
            ctype = "image/gif";
            break;
        case "png":
            ctype = "image/png";
            break;
        case "jpeg":
            $ctype = "image/jpg";
            break;
        case "jpg":
            ctype = "image/jpg";
            break;
        default:
            ctype = "application/force-download";
    }

    console.log("Sending...");
    res.setHeader('Content-Type', ctype);
    res.end(img);

}

function upload(req, res) {
    var file = req.swagger.params.document.value;
    var fileName = file.originalname;
    fileUpload(fileName, file, function(err, success, filename22) {
        if (err) {

        } else {
            console.log(filename22);
            res.json('aa');
        }

    })
}

function fileUpload(name, file, cb) {
    var path = '/var/www/testapp/api/hello-world/documents/' + name + '';
    var buffer = new Buffer(file.buffer);
    var random = new Date().getTime();
    fs.readFile(path, function(err, data) {
        if (err) {
            path = path

        } else if (data) {
            var changeName = name.split('.');
            var newName = changeName[0] + random + '.' + changeName[1];
            path = '/var/www/testapp/api/hello-world/documents/' + newName + '';
            name = newName
                //fileUpload(name, file, cb)
        }

        // spremanje file-a na server
        fs.open(path, 'w', function(err, fd) {
            if (err) {
                throw 'error opening file: ' + err;
            }
            fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                if (err) throw 'error writing file: ' + err;
                fs.close(fd, function() {
                    cb(false, true, name)
                })
            });
        });
    })

}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

}
function delDoc(req,res){
    var id = req.swagger.params.id.value;    
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        } else {
            var query=`Update sadrzaj set active = 0 where id =`+id+` `;
            client.query(query, function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                } else {
                    //console.log(result.rows);
                    res.json("Deleted");
                }
            })
        }
    })
}
//var query=`Update sadrzaj set active = 0 where id =`+id+` `;
    

