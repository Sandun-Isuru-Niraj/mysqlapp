
//Node.js core modules
var cluster = require('cluster');
var path = require('path');
var os = require('os');

//3rd party modules
var express = require('express');
var helmet = require('helmet');
var mysql = require('mysql');
var bodyparser = require('body-parser');

//custom modules
var router = require(path.join(__dirname, '/routes/router'));
var config = require(path.join(__dirname, '/configurations/config'));
//var mysql_db_operation = require(path.join(__dirname, '/modules/mysql_db_operation'));
//var mysql_db_customer = require(path.join(__dirname, '/modules/mysql_db_customer'));
//var mysql_db_room = require(path.join(__dirname, '/modules/mysql_db_room'));
var app = express();

//Reducing security threats using helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"]
        }
    }
}));

//body parser middleware to parse user data
//app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept,x-access-token");
 // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 // res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  //res.header('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  //res.header('Access-Control-Allow-Credentials', true); // If needed

  next();
});

//including custom router middleware
app.use(router);

//using server in a clustered environment
if(cluster.isMaster) {
    //creating child processes
    var numClusters = 8;
    for (var i = 0; i < numClusters; i++) {
        cluster.fork();
    }
    console.log('--------------------------'
                    + '\nServer Details :'
                    + '\nCPU : ' + os.cpus()[0].model
                    + '\nNumber of cores : ' + os.cpus().length
                    + '\nOS : ' + os.type() + ' ' + os.release()
                    + '\n--------------------------');
    console.log('Number of Node Clusters : ' + numClusters
                    + '\n--------------------------');
} else {
    //server listening on child processes
    app.listen(3002, config.config_server_ip, function (err) {
        if(err) {
            console.log(err.message);
        } else {
            console.log('Server running at '+ config.config_server_ip + ':'
                            + config.config_server_port + " ---> Process : " + process.pid);
        }
    });
}
