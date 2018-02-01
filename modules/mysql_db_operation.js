
//Node.js core modules
var path = require('path');
var bcrypt = require('bcryptjs');
//3rd party modules
var mysql = require('mysql');
var express  = require('express');

//var app = express();
//var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

//custom modules
var config = require('../configurations/config');

//creating main pool connection
var main_con_pool = mysql.createPool(config.config_main_db_pool_con_options);

// secret variable
//app.set('superSecret',config.config_session_secret);

//asynchronous function to use in login operation
function login(username, password, callback) {

    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err,null);
        }
        else {
            connection.query('SELECT * FROM staff WHERE username = ? ;', [username], function (err, rows) {
			  //  console.log(rows[0].password);
                if (err) {
                    connection.release();
                    callback(err,null);
                }
                else {
                    if(!rows[0]) {
                        connection.release();
                        callback(null,false);
                    } else {
                                  // Load hash db_password and checking
                        bcrypt.compare(password,rows[0].password, function(err, res) {
                         // console.log(password);
                         // console.log(rows[0].password);
                        // res === true
                        if(err) {
							connection.release();
                            callback(new Error('Password doesn\'t match'));
                        }
                        else{
                           // if(rows[0].password==="enable"){ ////adding new

                            if(res===true){
 /*
                       // if user is found and password is right
                        // create a token with only our given payload
                        // we don't want to pass in the entire user since that has the password
                                    const payload = {
                                            username:rows[0].username
                                    };
                                        //var token = jwt.sign(payload,app.get('superSecret')//,{
                                        var token = jwt.sign(payload, app.get('superSecret'),{
                                            expiresIn: 60*60*24
                                            //,
                                           // function(err,res) {

                                           // }
                                             // expires in 24 hours
                                        });

                                        var res = {
                                            username:rows[0].username,
                                            success: true,
                                            message: 'Enjoy your token!',
                                            token: token
                                        }

                                        // return the information including token as JSON
                                       res.json({
                                            success: true,
                                            message: 'Enjoy your token!',
                                            token: token
                                        }); */


                                console.log(res);
                                //callback(null,res);

                                var data = {

                                }
                                callback(null,rows[0].jobRole);
                               // callback(null,true);
                                connection.release();
                            }
                            else{
                                console.log(res);
                                callback(err,null);
                                connection.release();
                                }
                          //  }///adding new
                            // else{

                            //     connection.release();
                            //     var data = "not allowed";
                            //     var Data ={
                            //         status:300,
                            //         data
                            //     }
                            //     callback(null,Data);

                            // }///ading new

                        }
                                    });


						//console.log(rows);
                       // if(password === rows[0].password) {
                           // connection.release();
                           // callback(null, {status:true,msg:"Login successful"});
                           // callback(null, {username: rows[0].username}); //check
                        }

                    }

            });
        }
    });
}


function registration(jobRole,email,username,password,contactNo,status,callback){
    // Store hash in  password DB.
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err,hash) {
            if(err){

                callback(err,null);
            }
            console.log(hash);
            password = hash;
            console.log("////////////////hashing");
        });
    });

    main_con_pool.getConnection(function (err, connection) {
        if (err) {

            callback(err,null);
            connection.release();
        }
         else {

            var data;
            var Data;

           // console.log("querrry error.....................");
            connection.query('SELECT username FROM staff WHERE username = ? ;', [username], function (err, rows) {
                if (err) {
                    connection.release();
                    console.log("querrry error.....................");
                    callback(err,null);
                }
                else if(rows[0]){
                    //console.log(username+"detected.............");

                    // callback(null,{status:false,msg:"Username already exists"});
                    data = "username already exist";
                    Data = {
                       status:300,
                       data

                   }
                     callback(null,Data);
                             console.log('existing username..'+rows[0].username);
                             connection.release();
                           // }
                        }
                else{

                        console.log("inseting............");
                        var post = {
                            jobRole:jobRole,
                            email:email,
                            username:username,
                            password:password,
                            contactNo: contactNo,
                            status:status }

                 connection.query('INSERT INTO staff SET ?',post, function(err,result){
                        //console.log(hash);
                        if (err) {
                             //console.log(date+" error with query////////////////////////////////////////////");
                            console.log("inserting error");
                            connection.release();
                            callback(err, null);

                                }
                         else{
                            console.log('ok....');
                             data = "user registered";
                             Data = {
                                status:200,
                                data

                            }
                            connection.release();
                            console.log(Data);
                            callback(null,Data);

                           // callback(null,{status:true,msg:"User is registered successfully"});
                           // console.log(result);

                            }
               });
            }

          //  console.log(query.sql)
           //console.log("there is an error");
       // }



        });
      }
     });
  }
 //////////////////////////////////////////////////////////////////////////
  function registerRoom(status,
                          roomStatus,
                          location,
                          roomTypeID,
                          packageID,

                                             callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } else {
            var post = {
                status:status,
                roomStatus: roomStatus,
                location : location,
                roomTypeID:roomTypeID,
                packageID: packageID,
            };
            var query = connection.query('INSERT INTO room SET ?', post, function(err,result){
  //
             if (err) {
                console.log(" error with query");
                connection.release();
                callback(err, null);
                console.log(err);

                    }
            else{
                console.log(' data inserted');
                var Data =
                {
                    status:200,
                    data:"room inserted"
                }
                callback(null,Data);
                connection.release();


                }
   });
        }
    });
}
////////////////////////////////////////////////////////////////////////////////////
 function registerRoom(status,
                          roomStatus,
                          location,
                          roomTypeID,
                          packageID,

                                             callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } else {
            var post = {
                status:status,
                roomStatus: roomStatus,
                location : location,
                roomTypeID:roomTypeID,
                packageID: packageID,
            };
            var query = connection.query('INSERT INTO room SET ?', post, function(err,result){
  //
             if (err) {
                console.log(" error with query");
                connection.release();
                callback(err, null);
                console.log(err);

                    }
            else{
                console.log(' data inserted');
                var Data =
                {
                    status:200,
                    data:"room inserted"
                }
                callback(null,Data);
                connection.release();


                }
   });
        }
    });
}


//////////////////////////////////////////////////////////////////////////////////
    function registerRoom(status,
                          roomStatus,
                          location,
                          roomTypeID,
                          packageID,

                                             callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } else {
            var post = {
                status:status,
                roomStatus: roomStatus,
                location : location,
                roomTypeID:roomTypeID,
                packageID: packageID,
            };
            var query = connection.query('INSERT INTO room SET ?', post, function(err,result){
  //
             if (err) {
                console.log(" error with query");
                connection.release();
                callback(err, null);
                console.log(err);

                    }
            else{
                console.log(' data inserted');
                var Data =
                {
                    status:200,
                    data:"room inserted"
                }
                callback(null,Data);
                connection.release();


                }
   });
        }
    });
}

//////////////////////////////////////////////////////////////////////////////
     function registerRoom(status,
                          roomStatus,
                          location,
                          roomTypeID,
                          packageID,

                                             callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } else {
            var post = {
                status:status,
                roomStatus: roomStatus,
                location : location,
                roomTypeID:roomTypeID,
                packageID: packageID,
            };
            var query = connection.query('INSERT INTO room SET ?', post, function(err,result){

             if (err) {
                console.log(" error with query");
                connection.release();
                callback(err, null);
                console.log(err);

                    }
            else{
                console.log(' data inserted');
                var Data =
                {
                    status:200,
                    data:"room inserted"
                }
                callback(null,Data);
                connection.release();


                }
   });
        }
    });
}
//////////////////////////////////////////////////////////////////////////////
function registerPackage(
       packageName,
       roomTypeID,
       noOfRooms,
       mealPlan,
       wifi,
       swimPool,
       price,

                       callback) {
main_con_pool.getConnection(function (err, connection) {
    if (err) {
        callback(err, null);
    }
    else
     {
        var post = {
            packageName:packageName,

            roomTypeID: roomTypeID,
            noOfRooms : noOfRooms,
            mealPlan:mealPlan,
            wifi: wifi,
            swimPool: swimPool,
            price: price,


};
    var query = connection.query('INSERT INTO package SET ?', post, function(err,result){

    if (err) {
    console.log(" error with query");
    connection.release();
    callback(err, null);
    console.log(err);

}
    else{
    console.log(' data inserted');
    var Data =
    {
    status:200,
    data:"package inserted"
    }
    callback(null,Data);
    connection.release();


    }
    });
    }
    });
    }


    //////////////////////////////////////////////////////////
function registerRoomType(


       roomType,
       noOfRooms,
       roomCondition,
       price,
       roomTypeName,


                       callback) {
main_con_pool.getConnection(function (err, connection) {
    if (err) {
        callback(err, null);
    }
    else
     {
        var post = {

            roomType:roomType,
            noOfRooms:noOfRooms,
            roomCondition : roomCondition,
            price : price,
            roomTypeName: roomTypeName,

};
    var query = connection.query('INSERT INTO roomType SET ?', post, function(err,result){

    if (err) {
    console.log(" error with query");
    connection.release();
    callback(err, null);
    console.log(err);

}
    else{
    console.log(' data inserted');
    var Data =
    {
    status:200,
    data:"roomtype inserted"
    }
    callback(null,Data);
    connection.release();


    }
    });
    }
    });
    }


//////////////////////////////////////////////////////////////////////////////

function PaymentProcess(
    amount,
    paymentType,
    status,
    NIC,
    EID,

                  callback) {
 main_con_pool.getConnection(function (err, connection) {
 if (err) {
     callback(err, null);
     connection.release();
 }


 else
  {
/////////////////////////////////////////////////////////////////////////////////
connection.query('SELECT bookingID FROM booking WHERE NIC = ? ORDER BY bookingID DESC limit 1;',[NIC], function(err,rows){

    if (err) {
     console.log(" error with query");
     connection.release();
       callback(err, null);
       console.log(err);

       }
       else{

                if(!rows[0]) {
                             connection.release();
                             callback(err,null);
                              console.log("no rows....");
                             }

            else{
                console.log(rows);
                var bookingID = rows[0].bookingID;

///////////////////////////////////////////////////////////////////////////
        var post = {
          bookingID:bookingID,
          amount:amount,
          paymentType:paymentType,
          status:status,
          EID:EID,
          NIC:NIC

   };
 connection.query('INSERT INTO billing SET ?', post, function(err,result){

    if (err) {
        console.log("duplicate bookingID");
         connection.release();
        callback(err, null);
        // console.log(err);

    }

    else{
         console.log('bill paid');
          var     Data = {
              status:200,
                data:" bill paid"
          }
          callback(null,Data);
          // connection.release(); */
////// ////////////////////////////////////////////////////////////////////
        }
    })
}
       }
    });
}
 });
}
/////////////////////////////////////////////////////////////////////////////////
module.exports.login = login;
module.exports.registration = registration;
module.exports.registerRoom = registerRoom;
module.exports.registerPackage= registerPackage;
module.exports. registerRoomType=  registerRoomType;
module.exports.PaymentProcess=PaymentProcess;
//checkOutandPaymentProcess


// registerRoomType
//registerPackage
//registerRoom
//module.exports.customerRegistration = customerRegistration;

      // console.log(rows[0].password);
                  //  console.log(rows[0].username);
                   /* if(username=== rows[0].username) {
                        connection.release();
                        callback(null,{state:true,msg:"username is already exist"}); //check
                    }
                    else if(password=== rows[0].password) {


                    }*/

                // console.log('conection ok.............');
                // for(var i=0;i<rows.length;i++){
                   //   console.log("checking.."+i);

                 // if(password === rows[i].password){
                     //  console.log( rows[i].password);
                      //  console.log('existing password..');



                      /*
                      function login(username, password, callback) {

                            main_con_pool.getConnection(function (err, connection) {
                                if (err) {
                                    callback(err, null);
                                }
                                else {
                                    connection.query('SELECT * FROM users WHERE username = ? ;', [username], function (err, rows) {
                                      //  console.log(rows[0].password);
                                        if (err) {
                                            connection.release();
                                            callback(err, null);
                                        }
                                        else {
                                            if(!rows[0]) {
                                                connection.release();
                                                callback(null, false);
                                            } else {

                                                // Load hash from your password DB.
                                                bcrypt.compare(password, hash, function(err, res) {
                                                // res === true
                                                            });


                                                console.log(rows);
                                               // if(password === rows[0].password) {
                                                    connection.release();
                                                    callback(null, {status:true,msg:"Login successful"});
                                                   // callback(null, {username: rows[0].username}); //check
                                                }
                                                if(err) {
                                                    connection.release();
                                                    callback(new Error('Password doesn\'t match'));
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        }
*/
