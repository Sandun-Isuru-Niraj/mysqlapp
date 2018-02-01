

//Node.js core modules
var path = require('path');

//3rd party modules
var mysql = require('mysql');

//custom modules
var config = require('../configurations/config');

//creating main pool connection
var main_con_pool = mysql.createPool(config.config_main_db_pool_con_options);

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function roomAvailabiltyChecking(roomType,packageType,checkInDate,checkOutDate,callback) {

   var roomTypeArray = [];
   var packageTypeArray = [];
   var Data;
 //  var roomType;
  // var packageType;

 var roomTypeChecking = function(roomType,checkInDate,checkOutDate, callback) {

    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        }
        else {
            console.log(roomType,checkInDate,checkOutDate);
//this is cooreect//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//connection.query('SELECT roomandbooking.roomID FROM roomandbooking WHERE roomandbooking.roomTypeID = ? AND ((roomandbooking.checkInDate < ? AND roomandbooking.checkOutDate > ?)OR(roomandbooking.checkInDate > ? AND (roomandbooking.checkInDate < ? AND roomandbooking.checkOutDate > ?))OR( roomandbooking.checkOutDate < ? AND (roomandbooking.checkInDate < ? AND roomandbooking.checkOutDate > ?))OR(roomandbooking.checkInDate > ? AND roomandbooking.checkOutDate < ?));', [roomType,checkInDate,checkOutDate,checkInDate,checkOutDate,checkOutDate,checkOutDate,checkInDate,checkInDate,checkInDate,checkOutDate], function (err,rows) {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SELECT rooms.reservationID FROM rooms WHERE rooms.reservationID NOT IN
            ////////////////////////////////////////////////////////////////
            // connection.query('SELECT roomTypeID FROM roomType WHERE roomTypeName = ?;',[roomTypeName], function (err, rows) {
            //     //  console.log(rows[0].password);
            //       if (err) {
            //           connection.release();
            //           callback(err, null);

            //       }
            //       else {
            //           if(!rows[0]) {
            //               connection.release();
            //               callback(err,null);
            //               /* var data = "no rooms available";
            //               var Data ={
            //                   status:300,
            //                   data }*/


            //              console.log("step................................3");
            //           }
            //           else{

            //         roomType = rows[0].roomTypeID
            //           console.log(rows);
            //        //  roomType = rows[0].roomtypeID;
            //       console.log(roomType+"////////////////////////////////////////////////");
            //         // connection.release();
            //                 //  callback(err,{status:true});


            //////////////////////////////////////////////////////////////
           // connection.query('SELECT roomandbooking.roomID  FROM roomandbooking WHERE roomandbooking.roomTypeID = ? AND roomandbooking.roomID NOT IN(SELECT roomandbooking.roomID FROM roomandbooking WHERE roomandbooking.roomTypeID = ? AND (roomandbooking.bookingstatus = ? OR roomandbooking.bookingstatus = ?) AND ((roomandbooking.checkInDate <= ? AND roomandbooking.checkOutDate >= ?)OR(roomandbooking.checkInDate >= ? AND (roomandbooking.checkInDate <= ? AND roomandbooking.checkOutDate >= ?))OR( roomandbooking.checkOutDate <= ? AND (roomandbooking.checkInDate <= ? AND roomandbooking.checkOutDate >= ?))OR(roomandbooking.checkInDate >= ? AND roomandbooking.checkOutDate <= ?)));', [roomType,roomType,"booked","reserved",checkInDate,checkOutDate,checkInDate,checkOutDate,checkOutDate,checkOutDate,checkInDate,checkInDate,checkInDate,checkOutDate], function (err,rows) {

           connection.query('SELECT roomandbooking.roomID, roomandbooking.location  FROM roomandbooking WHERE roomandbooking.roomTypeID = ? AND roomandbooking.roomID NOT IN(SELECT roomandbooking.roomID FROM roomandbooking WHERE roomandbooking.roomTypeID = ? AND (roomandbooking.bookingstatus = ? OR roomandbooking.bookingstatus = ?) AND ((roomandbooking.checkInDate <= ? AND roomandbooking.checkOutDate >= ?)OR(roomandbooking.checkInDate >= ? AND (roomandbooking.checkInDate <= ? AND roomandbooking.checkOutDate >= ?))OR( roomandbooking.checkOutDate <= ? AND (roomandbooking.checkInDate <= ? AND roomandbooking.checkOutDate >= ?))OR(roomandbooking.checkInDate >= ? AND roomandbooking.checkOutDate <= ?)));', [roomType,roomType,"booked","reserved",checkInDate,checkOutDate,checkInDate,checkOutDate,checkOutDate,checkOutDate,checkInDate,checkInDate,checkInDate,checkOutDate], function (err,rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log("something wrong");
                }
                else {
                   // console.log("query successful....");
                    if(!rows[0]) {

                       // console.log(raws[0]);
                       var data = "no rooms available";
                       var Data;
                       Data={
                        status:300,
                        data

                    }
                    callback(null,Data);
                    connection.release();
                    console.log("there are no matching raws");
                       // callback(null,{status:true,msg:"data isn't found "});
                    }
                     else {


                        console.log("there are  matching raws ");

                        console.log(rows);
                        roomTypeArray = rows;
                        var data = roomTypeArray;
                         Data={
                            status:200,
                            data

                        }
                        callback(null,Data);
                        connection.release();

                       // callback(null,{status:true,msg:"data is found"});

                        }


                }
            });
     //   }//===============================

    //    }//====================================
   // });//================
        }
    });
};

var  packageTypeChecking = function(packageType,checkInDate,checkOutDate,callback){
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        }
        else {
            ////////////////////////////////////////////////////////////////////////////////////////
            // connection.query('SELECT packageID FROM package WHERE packageName = ?;',[packageTypeName], function (err, rows) {
            //     //  console.log(rows[0].password);
            //       if (err) {
            //           callback(err, null);
            //           connection.release();

            //       }
            //       else {
            //           if(!rows[0]) {
            //               connection.release();
            //               callback(err, false);
            //              console.log("step................................3");
            //           }

            //          packageType = rows[0].packageID;
            //          console.log( packageType+"////////////////////////////////////////////////");
            //         // connection.release();
            //                 //  callback(err,{status:true});

            /////////////////////////////////////////////////////////////////////////////////////////

            connection.query('SELECT roomandbooking.roomID FROM roomandbooking WHERE roomandbooking.packageID = ? AND roomandbooking.roomID NOT IN(SELECT roomandbooking.roomID FROM roomandbooking WHERE roomandbooking.	packageID = ? AND (roomandbooking.bookingstatus = ? OR roomandbooking.bookingstatus = ?) AND ((roomandbooking.checkInDate <= ? AND roomandbooking.checkOutDate >= ?)OR(roomandbooking.checkInDate >= ? AND (roomandbooking.checkInDate <= ? AND roomandbooking.checkOutDate >= ?))OR( roomandbooking.checkOutDate <= ? AND (roomandbooking.checkInDate <= ? AND roomandbooking.checkOutDate >= ?))OR(roomandbooking.checkInDate >= ? AND roomandbooking.checkOutDate <= ?)));', [packageType,packageType,"booked","reserved",checkInDate,checkOutDate,checkInDate,checkOutDate,checkOutDate,checkOutDate,checkInDate,checkInDate,checkInDate,checkOutDate], function (err,rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                }
                else {
                    console.log("query successful....");

                    if(!rows[0]) {

                      console.log("there are no matching raws");
                       callback(err,null);
                       connection.release();
                    }
                     else {
                        console.log("there are matching raws ");
                        packageTypeArray = rows;

                        console.log(rows);
                        var data =  packageTypeArray ;
                        Data={
                            status:200,
                            data
                        }
                        callback(null,Data);
                        connection.release();




                        }


                }
            });
     //   }//============
  //  });  //=================

        }//--
    });
};

if(roomType==null){
    packageTypeChecking(packageType,checkInDate,checkOutDate, callback);
}
else if(roomType==0){
    packageTypeChecking(packageType,checkInDate,checkOutDate, callback);
}
/* else if(packageType==null){

    roomTypeChecking(roomType,checkInDate,checkOutDate, callback);
} */
else{
    roomTypeChecking(roomType,checkInDate,checkOutDate, callback);
  /*   setTimeout (function(){
    packageTypeChecking(packageType,checkInDate,checkOutDate, callback);
},5000); */
}

/* setTimeout(function(){

    Data={
       status:200,
       data:
       packageTypeArray,
       roomTypeArray

   }

    callback(null,Data)
},8000); */



}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//checked
function checkOutDateChecker(roomType,checkOutDate,callback) {

    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();


        }
        else {

            //change this and then it wiill ok....
            connection.query('SELECT roomID FROM roomandbooking WHERE roomTypeID = ? AND checkOutDate < ?;',[roomType,checkOutDate], function (err, rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log("error...........");
                }
                else {
                    if(!rows[0]) {
                        connection.release();
                        var data = "no rooms available";
                        var Data ={
                            "status":200,
                            data
                        }
                        callback(null,Data);
                        console.log("error----------------------");
                    }
                    else {
						console.log(rows);
                        connection.release();
                        var Data ={
                            "status":200,
                            data:rows
                        }

                        callback(null,Data);


                    }
                }
            });
        }
    });
}
///////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////
module.exports.roomAvailabiltyChecking = roomAvailabiltyChecking;
module.exports.checkOutDateChecker = checkOutDateChecker;
