
//server listening port
var config_server_port = 3002;
//server host ip
var config_server_ip = '127.0.0.1';

//pool connections options for session store


//pool connections options for mysql main connection
var config_main_db_pool_con_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'hotelsystem', //change//'hotelsystem'
    connectionLimit: 20,
    waitForConnections: true
};

//session secret for passport
var config_session_secret = '43nkjhiouh@*&(9384h3(4983h49ksjd8hfp_mnznxcQ@!';




//







//exports modules
module.exports.config_server_port = config_server_port;
module.exports.config_server_ip = config_server_ip;
module.exports.config_main_db_pool_con_options = config_main_db_pool_con_options;
module.exports.config_session_secret = config_session_secret;
