
//Node.js core modules
var path = require('path');


//3rd party modules
var mysql = require('mysql');
var bcrypt = require('bcryptjs');

//custom modules
var config = require('../configurations/config');

//creating main pool connection
var main_con_pool = mysql.createPool(config.config_main_db_pool_con_options);


//checked
function updateRoomType(roomTypeID,
                        roomType,
                        noOfRooms,
                        roomCondition,
                        price,
                        roomTypeName,
                        callback) {

////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////


    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        }
        else {
            console.log("cheking................");
          //  connection.query('UPDATE roomtype SET roomType = ?, noOfRooms = ?, roomCondition = ?,price = ?,roomTypeName = ? WHERE roomTypeID = ?;',[roomType,noOfRooms, roomCondition, price,roomTypeName,roomTypeID], function (err, rows) {
			connection.query('UPDATE roomtype SET roomType = ?, noOfRooms = ?, roomCondition = ?,price = ?,roomTypeName = ? WHERE roomTypeID = ?;',[roomType,noOfRooms,roomCondition,price,roomTypeName,roomTypeID],function (err, rows) {
                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log(err);

                }
                else {
                 console.log("here is the place....you cN CHECKED....");
                        console.log("updated");

                        var Data =
                        {
                            status:200,
                            data:"updated"
                        }
                        callback(null,Data);
                        connection.release();


                }
            });
        }
    });
}

/////////////////////////////////////////////////
function updateRoom(roomID,
                      status,
                      roomStatus,
                      location,
                      roomTypeID,



                    callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        }
        else {
            console.log("step................................2");
            connection.query('UPDATE room SET status = ?, roomStatus = ?,location = ?, roomTypeID = ? WHERE roomID = ?;',[status,roomStatus,location,roomTypeID,roomID], function (err, rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log(err);
                }
                else {

                        console.log("updated");
                        connection.release();
                        var Data =
                        {
                            status:200,
                            data:"updated"
                        }
                        callback(null,Data);

                }
            });
        }
    });
}
////////////////////////////////////////////////////////////////////////////////
//checked
function updatePackage(packageID,packageName,roomTypeID,noOfRooms,mealPlan,wifi,swimPool,price,callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        }
        else {

            console.log("step................................2");
          if(wifi==true){
              wifi="yes";

       }
       else{
           wifi="No";

       }

       if(swimPool==true){
         swimPool="yes";

       }
       else{
           swimPool="No";

       }


            connection.query('UPDATE package SET packageName = ?, roomTypeID = ?, noOfRooms= ?,mealPlan = ?,wifi= ?, swimPool= ?,price= ? WHERE packageID = ?;',[packageName,roomTypeID,noOfRooms,mealPlan,wifi,swimPool,price,packageID], function (err, rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log(err);

                }
                else {

                        console.log("updated");
                        connection.release();
                        var Data =
                        {
                            status:200,
                            data:"updated"
                        }
                        callback(null,Data);

                }
            });
        }
    });
}
////////////////////////////////////////////////////////////
//checked
function updateStaff(EID,jobRole,email,username,password,contactNo,status,callback) {
    //hash password
    var pass;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err,hash) {
            if(err){

              callback(err,null);
            }
            console.log(hash);
            pass = hash;
            console.log("////////////////hashing");
        });
    });

    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        }
        else {
            console.log("step................................2");
            connection.query('UPDATE staff SET 	jobRole = ?, email = ?, username = ?, password = ?, contactNo = ? WHERE EID = ?;',[jobRole,email,username,pass,contactNo,EID], function (err, rows) {

                if (err) {
                    connection.release();
                    callback(err, null);

                }
                else {

                        console.log("updated");
                        connection.release();
                        var Data =
                        {
                            status:200,
                            data:"updated"
                        }
                        callback(null,Data);

                }
            });
        }
    });
}
/////////////////////////////////////////////////////////////

/*
function viewCustomerDetails(customerID, callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        }
        else {
            connection.query('SELECT * FROM customer WHERE customerID = ? ;', [customerID], function (err, rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                }
                else {
                    if(!rows[0]) {
                        connection.release();
                        callback(null, false);
                    } else {
							connection.release();
                            callback(err,rows);
                         }
                }
            });
        }
    });
}

function customerCheckOut(customerID, callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        }
        else {
            connection.query('SELECT * FROM customer WHERE customerID = ? ;',[customerID], function (err, rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                }
                else {
                    if(!rows[0]) {
                        connection.release();
                        callback(null, false);
                    } else {
							connection.release();
                            callback(err,rows);
                         }
                }
            });
        }
    });
}*/
//module.exports.viewBookingDetails = viewBookingDetails;



/////////////////////////////////////////////////////////////
function customerUpdate(
    NIC,
    firstName,
    lastName,
    gender,
    email,
    DOB,
    contactNo,
    country,

    callback){
      main_con_pool.getConnection(function (err,connection) {
    if (err) {
    callback(err, null);
    }
            else {
       /*         var post = {
        NIC:NIC,
        firstName:firstName,
        lastName:lastName,
        gender:gender,
        email:email,
        DOB:DOB,
        contactNo:contactNo,
        country:country,

    }//address:address, */
       // connection.query('UPDATE customer SET ?',[post], function(err,result){
   connection.query('UPDATE customer SET firstName = ?, lastName = ?, gender= ?, email = ?, DOB = ?,contactNo = ?,country = ?  WHERE NIC = ?;',[firstName,lastName,gender,email,DOB,contactNo,country,NIC], function (err, rows) {

    console.log("customer data.///////////////");
        if (err) {


    connection.release();
    callback(null,Data);
    console.log("error with updating db");


    }
    else{
    console.log('customer data update');
    //callback(null,{status:true,msg:"Customer is registered successfully"});
    var Data = {
        status:200,
         data:"customer updated"
    }

     connection.release();
        callback(null,Data);

    }

     });

        }
     }
            )};
///////////////////////////////////////////////////////////////
//updateCustomerBooking

function updateCustomerBooking(
                            bookingID,
                             NIC,
                             noOfChildren,
                             noOfAdults,
                             noOfRooms,
                             bookingstatus,
                             bookingType,
                             checkInDate,
                             checkOutDate,
                             EID,
                             packageID,


                        callback) {
    console.log("stepv 1");


    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();

        }
        else {

            var status;

            var post = {
                bookingID:bookingID,
                NIC:NIC,
                noOfChildren:noOfChildren,
                noOfAdults: noOfAdults,
                noOfRooms:noOfRooms,
                bookingstatus:bookingstatus,
                bookingType: bookingType,
                checkInDate: checkInDate,
                checkOutDate:checkOutDate,
                EID:EID,
                packageID:packageID,
            }


            connection.query(' UPDATE booking SET NIC = ? , noOfChildren = ?, noOfAdults = ?, noOfRooms = ?, bookingstatus = ?, bookingType = ?, checkInDate = ?, checkOutDate = ?, EID = ?, packageID =?  WHERE bookingID = ? ;', [NIC,noOfChildren, noOfAdults,noOfRooms,bookingstatus,bookingType,checkInDate,checkOutDate,EID,packageID,bookingID], function (err, rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log(err);
                }
                else {
                       /* var Data = {
                           status:200,
                           data:"customer updated"
                     } */
                       ///////////////////////////////////////////////////////////

                       if(bookingstatus=="canceled"){
                            status= "free";
                            console.log("1");
                                 roomstatusUpdating(bookingID, status,callback);
                       }
                       else if(bookingstatus=="booked"){
                            status= "booked";
                            console.log("2");
                            roomstatusUpdating(bookingID, status,callback);

                       }
                       else if(bookingstatus=="checkedOut"){
                        status= "free";
                        console.log("3");
                        roomstatusUpdating(bookingID, status,callback);

                   }
                      else if(bookingstatus=="reserved"){
                                 status= "reserved";
                                 console.log("4");
                                 roomstatusUpdating(bookingID, status,callback);
                    }

                    else{
                        connection.release();
                        callback(err, null);

                    }




                       /////////////////////////////////////////////////////////////

                }
            });
        }
    });
}

var  roomstatusUpdating = function(bookingID, status,callback){
     main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        }
        else {
            console.log("step................................2"+status);
             connection.query('UPDATE room SET status = ? WHERE  bookingID= ?;',[status,bookingID], function (err, rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log(err);

                }
                else {

                        console.log(" room updated");
                        connection.release();
                        var Data =
                        {
                            status:200,
                            data:"updated"
                        }
                      callback(null,Data);

                }
            });
       }//
    });//



}

///////////////////////////////////////////////////////////////
module.exports.updateRoomType = updateRoomType;
module.exports.updateStaff = updateStaff;
module.exports.updatePackage = updatePackage;
module.exports.updateRoom = updateRoom;
module.exports.customerUpdate= customerUpdate;
module.exports.updateCustomerBooking= updateCustomerBooking;
//updateCustomerBooking
// customerUpdate
