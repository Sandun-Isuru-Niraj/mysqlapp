
//Node.js core modules
var path = require('path');

//3rd party modules
var mysql = require('mysql');

//custom modules
var router = require('../routes/router');
var config = require('../configurations/config');
//to get authcode
//var auth = require('./mysql_db_bookingEngine');

//creating main pool connection
var main_con_pool = mysql.createPool(config.config_main_db_pool_con_options);

function customerRegistration(
                NIC,
                firstName,
                lastName,
                gender,
                email,
                DOB,
                contactNo,
                country,
                no,
                street,
                town,

                callback){
                main_con_pool.getConnection(function (err,connection) {

 var Data1;
 var Data;

  var data1;
  var data;


if (err) {
     callback(err, null);
}
     else {
        var post = {
            NIC:NIC,
            firstName:firstName,
            lastName:lastName,
            gender:gender,
            email:email,
            DOB:DOB,
            contactNo:contactNo,
            country:country,
            no:no,
            street:street,
            town:town,


}//address:address,
     connection.query('INSERT INTO customer SET ?',[post], function(err,result){
//
    console.log("customer data.///////////////");
if (err) {

     var Data = {
        status:200,
        data:"Customer has been already registered"
    }
    // console.log(result);
     connection.release();
     callback(null,Data);
     console.log("error with inserting db");


}
else{
    console.log('customer data inserted');
    //callback(null,{status:true,msg:"Customer is registered successfully"});
    var Data = {
        status:200,
        data:"registered"
    }
     console.log(result);
     connection.release();
     callback(null,Data);
  //////////////////////////////////////////////////////////////////////////////////////////
}

});

     }
    }
)};
 //////////////////////////////////////////////////////////////////////////////////
function confirmCustomerBooking(
    noOfChildren,
    noOfAdults,
    status,
    bookingType,
    checkInDate,
    checkOutDate,
    EID,
    NIC,
    roomTypeID,
    roomArray,
    packageID,
    noOfRoom,
        callback) {
            console.log(roomArray);

    main_con_pool.getConnection(function (err, connection) {
        if (err) {
             callback(err, null);
            connection.release();
        }
        else {

        var roomIDArray = [];
        roomIDArray = roomArray;
        var i ;
        var  RoomCount = ((roomIDArray.length)-1);
        var  noOfRooms;
        var updatedNoOfRooms;
        var bookingID;
        var RoomID;
        console.log(roomIDArray);

        // console.log( roomIDArray+"okkkkkkkkkkkkkkkkkkkkkk");
            console.log("step............");
            var enterData = {
                noOfChildren:noOfChildren,
                noOfAdults:noOfAdults,
              //  noOfRooms:noOfRooms,
                bookingstatus:status,
                checkInDate:checkInDate,
                checkOutDate:checkOutDate,
                EID:EID,
                NIC: NIC,
                noOfRooms:noOfRoom,
                bookingType:bookingType,
                //roomTypeID:roomTypeID,
               // roomID:roomID,
                packageID:packageID,

            };
             connection.query('INSERT INTO booking SET ?',enterData, function (err, result) {
			  //  console.log(rows[0].password);
                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log(err);

                }
                else {
////////////////////////////////////////////////////////////////////////////////////////
connection.query('SELECT bookingID FROM booking WHERE NIC = ? ORDER BY bookingID DESC  limit 1;',[NIC], function(err,rows){

    //  console.log(rows[0].password);
      if (err) {
          connection.release();
          callback(err, null);
          console.log(err);

      }
      else {
          if(!rows[0]) {
              connection.release();
              callback(err,null);

          }
           else {
            bookingID = rows[0].bookingID;
            console.log(bookingID);
            console.log("selecting booking iididdidid");
            console.log(roomIDArray.length);
            reducingRooms( RoomID,packageID,bookingID,updatedNoOfRooms,noOfRooms,RoomCount,status,roomTypeID,roomIDArray,i,callback);
               }
      }
  });

////////////////////////////////////////////////////////////////////////////////////////


                }
            });
        }
    }

       )};



/////////////////////////////////////////////////
var   reducingRooms = function(RoomID,packageID,bookingID,updatedNoOfRooms, noOfRooms,RoomCount,status,roomTypeID,roomIDArray,i,callback){
  for(i = 0 ; i <roomIDArray.length ;i++){
      console.log('running for llopppp'+i);
      console.log(roomTypeID);
      console.log(roomIDArray[i]+">>>>>_______________________________________.");
      RoomID=roomIDArray[i];
    updatingRoomStatus( packageID,bookingID,i, updatedNoOfRooms,noOfRooms,RoomCount,status,roomTypeID,RoomID,callback);
                    }

        }
/////////////////////////////////////////
var updatingRoomStatus = function(packageID,bookingID,i, updatedNoOfRooms,noOfRooms,RoomCount,status,roomTypeID,RoomID,callback){
    main_con_pool.getConnection(function (err,connection) {
        if (err) {
            connection.release();
            callback(err, null);
        }
        else {
           console.log(packageID+"/////////////////////////"+RoomID+"//////////////////////"+bookingID);
            connection.query('UPDATE room SET status = ?, packageID = ?, bookingID = ? WHERE RoomID = ?;',[status,packageID,bookingID,RoomID], function (err,rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log(err);
                    console.log(" ........query Error....");
                }
                else {
                    console.log(roomTypeID);
                    if(i==RoomCount){
                      console.log(RoomCount+"gdfggfgfgfgfgjhjhjhjhhhjhjhjhjhjhjhjh");
                        data = "booking details inserted";
                        updatingnoOfRooms(updatedNoOfRooms,noOfRooms,RoomCount,roomTypeID,callback);
                        console.log(roomTypeID+"66666666666666666666666666666666666666666");

                    }

                   // reducingRoomsNO(roomType,callback)

                    //connection.release();


                }

         })

        }
    })

};
///////////////////////////////////////////////



var updatingnoOfRooms = function(updatedNoOfRooms,noOfRooms,RoomCount,roomTypeID,callback){

    main_con_pool.getConnection(function (err,connection) {
        if (err) {
            connection.release();
            callback(err,null);
        }

        else {
            console.log(roomTypeID+"---------------------------------------");
            /////////////////////////////////////////////////////////////////////
           // connection.query('SELECT * FROM room WHERE roomTypeID = ?;',roomTypeID, function (err,get) {
            connection.query('SELECT noOfRooms FROM roomtype WHERE roomTypeID = ?;',[roomTypeID],function (err, rows) {
                    console.log("step ok..");
                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log("query notsuccessfull");
                }

                else {
                    console.log(rows);
                    if(!rows[0]) {
                     connection.release();
                       console.log("no room available...");
                       callback(err,null);
                    }
                     else {

                      noOfRooms = rows[0].noOfRooms;
                      updatedNoOfRooms = noOfRooms-(RoomCount+1);
                      console.log(updatedNoOfRooms + "ttttttttttttttttttttttttt");
                      console.log(roomTypeID + "rrrrrrrrrrrrrrrrrrrrrrrrr");
     connection.query('UPDATE roomtype SET noOfRooms = ? WHERE RoomTypeID = ?;',[updatedNoOfRooms,roomTypeID], function (err,rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log(" ........query Error....");
                }
                else {

                    console.log("within updating no of rooms function");
                    console.log(">>>>>>>>>>>>updated>>>>>>>>>>>");
                    var data1 = "updated";
                    var Data1={
                        status:200,
                        data1
                    }

                    ///////////////////////////////////////////////
                    var data ={
                        passRoomTypeID:roomTypeID,
                        passNoOfRooms:updatedNoOfRooms
                    }
                   var Data = {
                       // "HotelID":HotelID,
                       // "authcode": auth,
                        data
                   };

                // "status": 200,
                     sendApi(Data);
                    callback(null,Data1);

                    connection.release();
                    ///////////////////////////////////////////////////

                    console.log("sending data...."+Data);
                    //call API

                }

         });

      }
   }
  })

        }
    });



};
////////////////////////////////////////////////////////////////////////////
var sendApi = function(Data){
    var http = require('http');
    var post_req  = null,
       // post_data = sendingNoOfRoomToApiArray.toString();
       // console.log( post_data);
      post_data =  JSON.stringify(Data);

    //////////////////////////////////////////////////////////////////////////////
  //  hostname: '10.10.30.127',
    //  hostname: 'admin.pal.morasquad.me',
   //   port    : 8000,
     // path    : '/api/check',
  //   path    : '/api/reportback',
    //////////////////////////////////////////////////////////////////////////////////////
    var post_options = {
        hostname: '10.10.30.127',
       // hostname: 'admin.pal.morasquad.me',
        port    : 8000,
        path    : '/api/reportback',
       // path    : '/api/check',
        json: true,
        method  : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Length': post_data.length
        }
    };

    post_req = http.request(post_options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ', chunk);
        });
    });

    post_req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    //JSON.stringify
    post_req.write(post_data);
    post_req.end();

    }
//////////////////////////////////////////////////////////////////////////////////////////////
/*
function confirmBooking(
    noOfChildren,
    noOfAdults,
    noOfRooms,
    status,
    checkInDate,
    checkOutDate,
    EID,
    roomTypeID,
    roomID,
    packageID,

    noOfChildren,
    noOfAdults,
    noOfRooms,
    status,
    checkInDate,
    checkOutDate,
    NIC,
    EID,
    roomTypeID,
    roomID,
    packageID,

    callback){main_con_pool.getConnection(function (err,connection) {
if (err) {
    callback(err, null);
}
else {
var myone = {
    noOfChildren:noOfChildren,
                noOfAdults:noOfAdults,
                noOfRooms:noOfRooms,
                status:status,
                checkInDate:checkInDate,
                checkOutDate:checkOutDate,
                EID:EID,
                roomTypeID:roomTypeID,
                roomID:roomID,
                packageID:packageID,
};
var query = connection.query('INSERT INTO booking SET ?',myone,function(err,result){
//
console.log("cuboboobobo data.///////////////");

if (err) {
console.log("errorbboboobo with query");
connection.release();
callback(err,null);
console.log(err);

}
else{
//console.log('customerbobbob data inserted');
callback(null,result);
connection.release();
console.log(result);

}
});

}
}
)};
*/
module.exports.customerRegistration = customerRegistration;
module.exports.confirmCustomerBooking = confirmCustomerBooking;
//////////////////////////////////////////////////////////////////////////////////////////////
/*
function ustomerRegistration(
                NIC,
                firstName,
                lastName,
                gender,
                email,
                DOB,
                contactNo,
                country,
                noOfChildren,
                noOfAdults,
                noOfRooms,
                status,
                checkInDate,
                checkOutDate,
                EID,
                roomTypeID,
                roomID,
                packageID,

                        callback) {main_con_pool.getConnection(function (err, connection) {
    if (err) {
    callback(err, null);
 }
     else {

        var post = {
            NIC:NIC,
            firstName:firstName,
            lastName:lastName,
            gender:gender,
            email:email,
            DOB:DOB,
            contactNo:contactNo,
            country:country,
};

 var query = connection.query('INSERT INTO customer SET ?', post, function(err,result){
//customer register
    if (err) {
        console.log(" error with query");
        connection.release();
        callback(err, null);
        console.log(err);

    }
    else{
        console.log('customer data inserted');
        connection.release();
       // callback(null,{status:true,msg:"Customer is registered successfully"});
        console.log(result);

    }


});
///////////// room register
//var status = "booked";
var roomReservation = {
    noOfChildren:noOfChildren,
    noOfAdults:noOfAdults,
    noOfRooms:noOfRooms,
    status:status,
    checkInDate:checkInDate,
    checkOutDate :checkOutDate,
    EID: EID,
    roomTypeID :roomTypeID,
    roomID:roomID,
    packageID:packageID,
       // status:status,
       //numberOfRooms:numberOfRooms,
};
////////////////////////////////////////////////////////////
//var selectRoomNo = {numberOfRooms:numberOfRooms,};
//var status = "free";
var selectRoomNo = connection.query('SELECT * FROM rooms WHERE roomType = ? AND status = ? ;', [roomType,status], function (err, rows) {
           // console.log( numberOfRooms);
            if (err) {
                connection.release();
               // callback(err, null);
            }
            else {
                if(!rows[0]) {
                    connection.release();
                    callback(null, false);
                } else {
                      //  connection.release();
                      //  callback(err,rows);
                    var i=0;
                    var selectRoomNo = {numberOfRooms:numberOfRooms,};
                    while(i<(selectRoomNo.numberOfRooms)){
                        console.log("///////////////////////////////"+rows[i].roomNo+"///////////////////////////////");
                        i++;

                    }

                    }
            }
        });



//////////////////////////////////////////////////////////
var query = connection.query('INSERT INTO rooms SET ?',roomReservation, function(err,result){

    if (err) {
        console.log(" error with query............................");
        connection.release();
        callback(err, null);
        console.log(err);

    }
    else{
        console.log('room data is inserted');
       // connection.release();
        //callback(null,{status:true,msg:"room is registered successfully"});
        console.log(result);

    }


    });


}
//////////////////////////////////////-------------------------------------------------------

/*var http = require("http");
var request = http.get("http://hasanthasameera18.000webhostapp.com/retjson.php"+"madu"+".json",function(res){
	console.dir(res);
});*/
/*
var http = require("http");
var options = {
  hostname: 'admin.morasquad.me',                    //'www.postcatcher.in', http://postcatcher.in/
  port: 80,
  path: '/api/check' ,                             //'catchers/5a60ee6dffd9bf0400000004', //http://postcatcher.in/catchers/5a60ee6dffd9bf0400000004
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  }
};
var req = http.request(options, function(res) {
  console.log('Status: ' + res.statusCode);
  console.log('Headers: ' + JSON.stringify(res.headers));
  //res.setEncoding('utf8');
  res.on('data', function (body) {
    console.log('Body: ' + body);
     console.log('request sent succesfully');
  });
});
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
// write data to request body
//var booking =config.config_session_secret;
//router.bookingToken;
//router.bookingToken;
req.write('{"string": "Hello, World"}');
//req.write( '{booking}');//('{"string": "Hello, World"}');
req.end();

//////////////////////////////////////-------------------------------------------------------
callback(null,{status:true,msg:"room is registered successfully"});



});
     }


         //  module.exports.hotelCustomer = hotelCustomer;
  /*
         var roomReservation = {
    noOfChildren:noOfChildren,
    noOfAdults:noOfAdults,
    noOfRooms:noOfRooms,
    status:status,
    checkInDate:checkInDate,
    checkOutDate :checkOutDate,
    NIC:NIC,
    EID: EID,
    roomTypeID :roomTypeID,
    roomID:roomID,
    packageID:packageID,
};

var query = connection.query('INSERT INTO booking SET ?', roomReservation, function(err,result){
    //
    if (err) {
        console.log(" error with query");
        connection.release();
        callback(err, null);
        console.log(err);

    }
    else{
        console.log('customer data inserted');
       // connection.release();
        callback(null,{status:true,msg:"Customer is registered successfully"});
        console.log(result);

}
});*/
