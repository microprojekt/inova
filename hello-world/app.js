'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var expressJwt = require('express-jwt');
module.exports = app; // for testing
var jwt = require('jsonwebtoken');
var conFile = require('./api/controllers/config'); //configuration file

var config = {
    appRoot: __dirname // required config
};
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);
app.use(function(req, res, next) {
    // check header or url parameters or post parameters for token  
    //console.log(req.headers.authorization);
    var token = req.headers['authorization'];

    var url = req.url.split('?');
    //console.log(url[0]);

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, conFile.secret, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                /*if (decoded.vrsta_lic !== "Upravljačka") {
                    return res.json({
                        success: false,
                        message: 'Nemate Upravljačka prava'
                    })
                }
                else{*/
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
                //}                
            }
        });
    } else {
        if (req.path === '/') {
            next();
        } else {
            return res.status(401).send({
                success: false,
                message: 'Auth required.'
            })
        };
    }
});
SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) {
        throw err;
    }

    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 10010;
    app.listen(port);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log("Server starts...");
    }
});


// if everything is good, save to request for use in other routes
/*      var decodeToken = jwt.decode(token,conFile.secret)
          console.log(decodeToken.vrsta_lic);
          if (decodeToken.vrsta_lic !== "Upravljačka") {
             return res.json({ success: false, message: 'Nemate Upravljačka prava' })
          }
*/
