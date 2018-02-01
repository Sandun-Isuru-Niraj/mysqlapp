//3rd party modules
var express = require('express');

var config = require('../configurations/config');

var router = express.Router();
var app = express();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// secret variable
app.set('superSecret',config.config_session_secret);

var tokenVerification = function(req, res, next) {

      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];

      // decode token
      if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
          if (err) {
            return res.json({ status:300, data:'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });

      } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

      }
    }

module.exports = tokenVerification;
