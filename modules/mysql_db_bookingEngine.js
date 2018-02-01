

 //// if (typeof localStorage === "undefined" || localStorage === null) {
  //     var LocalStorage = require('node-localstorage').LocalStorage;
  //     localStorage = new LocalStorage('./scratch');
//}

//Node.js core modules

var path = require('path');

//3rd party modules
var mysql = require('mysql');

//custom modules
var config = require('../configurations/config');

//creating main pool connection
var main_con_pool = mysql.createPool(config.config_main_db_pool_con_options);

//var authCodeChecker;
// update function for update room type status and booking
                //update(res,pass,bookingID,array,RoomTypeID,callback,p,sendingNoOfRoomToApiArray);

//select roomid from related  to the roomType
 ////////////////////////////////////////
 ////////////////////////////////////////
////data,RoomTypeID,res,p,sendingNoOfRoomToApiArray

////////////////////////////////////////////

///////////////////////////////////////////////

            //sendingNoOfRoom(res,array,RoomTypeID,callback,p,sendingNoOfRoomToApiArray);
/////////////////////////////////////////////////////

/////////////////////////////////////////////



function onlineCustomer(
    HotelID,
    authcode,
    userNIC,
    userName,
    checkInDate,
    checkOutDate,
    payment,
    roomTypeA,
    roomTypeB,
    roomTypeC,
    roomTypeD,
    roomTypeE,
    roomTypeF,


        callback) {

    var array = [roomTypeA,roomTypeB, roomTypeC, roomTypeD,roomTypeE,roomTypeF];
    var arrayRoomTypeID =[];
    var bookingID;

   var data1;
   var i ;
   var j = 0;
   var k;
   var roomID;
   var RoomCount;
   var roomIDArray =[];
   var roomNoSendingArray =[];
   var p = 0;
   var sendingNoOfRoomToApiArray =[];
   var passRoomTypeID;
   var passNoOfRooms;
   var bookingType ="online";
   var bookingstatus = "reserved";


 //  localStorage.setItem("authcode",authcode);
 //  var authCodeChecker = localStorage.getItem("authcode");

    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        }
        else {
///////////////////////////////////////////////////////////////////////////////

connection.query('SELECT * FROM service WHERE HotelID = ? ;',[HotelID],function (err,rows) {

    if (err) {
        connection.release();
        callback(err, null);
        console.log("query notsuccessfull");
    }

    else {

    if(!rows[0]) {

           callback(err,null);
           connection.release();
        }
     else {
        console.log(rows[0].authCode);
        console.log("authcode ok..............."+rows[0].authCode);
        if(rows[0].authCode==authcode){
        access = true;
        console.log("auth code are match/////////////////////////////////////////");
////////////////////////////////////////////////////////////////////////////
            //auth code getting
            localStorage.setItem("authcode",rows[0].authCode);
            authCodeChecker = localStorage.getItem("authcode");
            console.log( authCodeChecker);

////////////////////////////////////////////////////////////////////////////

/* connection.query('SELECT * FROM service WHERE HotelID = ?;',[authcode,HotelID], function (err,rows) {

    if (err) {
        connection.release();
        callback(err, null);
        console.log("query notsuccessfull");
    }

    else {

        if(!rows[0]) {

           callback(err,null);
           connection.release();
        }
         else {
        console.log("authcode ok...............");
        access = true;
    }
}
});    */


/////////////////////////////////////////////////////////////////////////////
     var pos = {
             NIC:userNIC,
             firstName:userName

    };
    var post = {
        NIC:userNIC,
        bookingType:bookingType,
        bookingstatus:bookingstatus
      //  firstName: userName
      //filll those data
        };
    /////////////////////////////////////////////////////////////////////////////////
    connection.query('INSERT INTO customer SET ?',pos,function(err,result){

        if (err) {

/////////-------------------------------------------------------------------------
connection.query('INSERT INTO  booking SET ?',post,function(err,result){

    if (err) {
        console.log("error with query");
        connection.release();
        callback(err, null);
        console.log(err);

    }
    else{
        //callback(null,result);
       // connection.release();
       connection.query('SELECT bookingID FROM booking WHERE NIC = ? ORDER BY bookingID DESC limit 1;',userNIC, function (err, rows) {
        //  console.log(rows[0].password);
          if (err) {
              connection.release();
              callback(err, null);

          }
          else {
              if(!rows[0]) {
                  connection.release();
                  callback(err, false);

              } else {

                    console.log(rows[0].bookingID);
                    bookingID = rows[0].bookingID;
                    console.log(access);
                    startingForLoop();

                    var money = {
                        amount:payment,
                        bookingID:bookingID,
                        NIC:userNIC,

                    };
////////////////////////////////////////////////////////////////////////////////////////////
      connection.query('INSERT INTO  billing SET ?',money,function(err,result){

               if (err) {
                    console.log("error with query");
                    connection.release();
                    callback(err, null);
                    console.log(err);

                        }
                        else{
                            console.log("billing ok");

                        }

                    }
                );


                connection.release();
    //////////////////////////////////////////////////////////////////////////////////////////////

                   }
          }
      });//

    }//

    });//

////////////////////////////////////////////////////////////////////////
           //  console.log("error with query");
         //connection.release();
           // callback(err, null);
            // console.log(err);

         }
         else{
           console.log("inserted");
    /////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////
     connection.query('INSERT INTO  booking SET ?',post,function(err,result){

    if (err) {
        console.log("error with query");
        connection.release();
        callback(err, null);
        console.log(err);

    }
    else{
        //callback(null,result);
       // connection.release();
       connection.query('SELECT bookingID FROM booking WHERE NIC = ? ORDER BY bookingID DESC limit 1;',userNIC, function (err, rows) {
        //  console.log(rows[0].password);
          if (err) {
              connection.release();
              callback(err, null);

          }
          else {
              if(!rows[0]) {
                  connection.release();
                  callback(err, false);

              } else {

                    console.log(rows[0].bookingID);
                    bookingID = rows[0].bookingID;
                    console.log(access);
                    startingForLoop();

                    var money = {
                        amount:payment,
                        bookingID:bookingID,
                        NIC:userNIC,

                    };
////////////////////////////////////////////////////////////////////////////////////////////
      connection.query('INSERT INTO  billing SET ?',money,function(err,result){

               if (err) {
                    console.log("error with query");
                    connection.release();
                    callback(err, null);
                    console.log(err);

                        }
                        else{
                            console.log("billing ok............");

                        }

                    }
                );


                connection.release();
    //////////////////////////////////////////////////////////////////////////////////////////////

                   }
          }
      });//

    }//

    });//

//////////////---------------------------------------------------------------------------------
        }//
     } );//


    }//
     }//
    }//

 });//


/////////////////////////check herer

 //function step0(){

 //if(access==true){
var startingForLoop = function(){
 for(i = 0 ; i <array.length;i++){
                         /////////////////////////////////////////////////////////////////////////////////
            connection.query('SELECT roomTypeID,noOfRooms FROM roomtype WHERE roomType = ?;',i, function (err,rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log("ok...........");
                }
                else {

                   //converting room type according to no of room sending order from booking
                    arrayRoomTypeID[j]= rows[0].roomTypeID;
                    RoomTypeID = arrayRoomTypeID[j];
                    noOfRooms = rows[0].noOfRooms;
                    RoomCount = array[j];
                   console.log("step...");
                   console.log("ready....");
                    j++;
                    //no of room updating....
                    roomNoUptade(RoomTypeID,noOfRooms,RoomCount,callback);
                     connection.release();  //****have to change this

                }

            });

    }
  }

 setTimeout(function(){
//    function step1(){

           for(i = 0 ; i < arrayRoomTypeID.length;i++){
            console.log(arrayRoomTypeID[i]+"room type id");


           for(k = 0 ;k <array[i];k++){

            console.log(array[i]+"room count////////////////////////");
           //RoomTypeID =  arrayRoomTypeID[i];
           console.log ("passing m value is step1______"+p);
              console.log("check this did you see.........."+p+"..........");
            select(arrayRoomTypeID[i],k,bookingID,array,callback,p,sendingNoOfRoomToApiArray);


            }
        p++;
        }
         }


, 6000);

setTimeout(function(){
//function step2(){
    //sending data to api
    console.log (sendingNoOfRoomToApiArray.length);
   console.log (sendingNoOfRoomToApiArray);
   var data = sendingNoOfRoomToApiArray;
    console.log("check this did you see finnallllllllll.........."+p+"..........");

    //////////
   // j = 0;

   var Data1 = {
        "status": 200,
        "HotelID":HotelID,
        "authcode":  authcode,
        data
   };

   Data = {
    "HotelID":HotelID,
    "authcode":  authcode,
    data
};
   // connection.release();
    callback(null,Data1);
    sendApi();

    ////////////
   /* res.json({
        "status": 200,
        "HotelID":HotelID,
        "authcode":  authcode,
        data
   });*/
}
, 12000);
    /////////////////////////
 //}
    //////////////////////////////
/////////////////////////////////////////////////////////////////
var sendApi = function(){
    console.log("within------------------------api-------------------");
    var http = require('http');
    var post_req  = null,
       // post_data = sendingNoOfRoomToApiArray.toString();
       // console.log( post_data);
      post_data =  JSON.stringify(Data);

    var post_options = {
        //hostname: '10.10.30.127',
        hostname: 'booking.pal.morasquad.me',
        port    : 80,
       // path    : '/api/check',
       path    : '/api/reportback',
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
 ///////////////////////////
 var sendingNoOfRoomToApi = function(data1,RoomTypeID,array,callback,p,sendingNoOfRoomToApiArray){
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        }
        else {

            console.log("-----------------------------------"+p+"----------------------------------------");
            //get type id and roomTypeID  to a passobject
                var passObject ={
                    passRoomTypeID:RoomTypeID,
                    passNoOfRooms:data1
                };

                sendingNoOfRoomToApiArray[p] = passObject;
                console.log(sendingNoOfRoomToApiArray[p]);
               // console.log("value of p is __________________"+p);
               console.log("within sendingNoOfRoomToApi function");
               console.log("check this did you see.........."+p+"..........");
               connection.release();
              // connection.release();
              //  p++;

        }
    })

};
/////////////////////////////////////////////////////////////////////
var sendingNoOfRoom = function(array,RoomTypeID,callback,p,sendingNoOfRoomToApiArray){

    main_con_pool.getConnection(function (err,connection) {
        if (err) {
            connection.release();
            callback(err, null);

        }
        else {

                connection.query('SELECT noOfRooms FROM roomtype WHERE roomTypeID = ?;',[RoomTypeID], function (err,rows) {

                    if (err) {

                        connection.release();
                        callback(err, null);
                        console.log("query notsuccessfull");
                    }
                    else{

                        if(!rows[0]) {

                            callback(err,null);
                             connection.release();
                             /*res.json({
                                "msg":"somethinh wrong"
                             });*/

                          }
                    else {

                        data1 = rows[0].noOfRooms;
                        console.log("within sendingNoOfRoom function******************************************************8");
                       // console.log ("passing p value is step4______"+p);
                      // console.log("check this did you see.........."+p+"..........");
                        sendingNoOfRoomToApi(data1,RoomTypeID,array,callback,p,sendingNoOfRoomToApiArray);
                       // connection.release();

                      //res.json({

                        //   massage: 'go message'

                       // });

                      }
                    }
                    })



           // }


        }
    })

};

//////////////////////////////////////////////////////////////////////
var roomNoUptade = function(RoomTypeID,noOfRooms,RoomCount,callback){
    main_con_pool.getConnection(function (err,connection) {
        if (err) {
            connection.release();
            callback(err, null);
        }
        else {
            console.log(noOfRooms+"________________"+RoomCount);
            updatedNoOfRooms = noOfRooms-RoomCount;

            connection.query('UPDATE roomType SET noOfRooms = ? WHERE RoomTypeID = ?;',[updatedNoOfRooms,RoomTypeID], function (err,rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log(" ........query Error....");
                }
                else {
                    console.log("within roomNoUptade function");
                    console.log(">>>>>>>>>>>>updated>>>>>>>>>>>");
                   // connection.release();


                }

         })

        }
    })

};
///////////////////////////////////////////////////////////////////
//arrayRoomTypeID[i],k,bookingID,array,callback,p,sendingNoOfRoomToApiArray
var select =function(RoomTypeID,k,bookingID,array,callback,p,sendingNoOfRoomToApiArray){
    main_con_pool.getConnection(function (err, connection) {
      if (err) {
          connection.release();
          callback(err, null);
      }
      else {
  var st = "free";
  var rs = "enable";

  connection.query('SELECT roomID FROM room WHERE roomTypeID = ? AND status = ? AND roomStatus = ?;',[RoomTypeID,st,rs], function (err,rows) {

   if (err) {
       connection.release();
       callback(err, null);
       console.log("query notsuccessfull");
   }

   else {

       if(!rows[0]) {

          callback(err,null);
          connection.release();
          console.log(rows+"----------------------no rooms--------------------------");
          console.log("*******************************rooms not available*********************************");
          // res.json({
          //    "msg":"no room"
          // });

       }
        else {
            console.log(rows);
            console.log(rows[k].roomID+"_____________");
             pass = rows[k].roomID;
           //k++;
          // s++;

          console.log("within select function");
          console.log ("passing p value is step2______"+p);
          update(pass,bookingID,array,RoomTypeID,callback,p,sendingNoOfRoomToApiArray);
           //connection.release();

    }
     }
   })
}
          }

          )};
///////////////////////////////////////////////////////////////////
var update = function(roomID,bookingID,array,RoomTypeID,callback,p,sendingNoOfRoomToApiArray){

    main_con_pool.getConnection(function (err, connection) {
        if (err) {

            callback(err, null);
            connection.release();

        }
        else {

var reserved = "reserved";
     //update room table by changing status as reserved
      connection.query('UPDATE room SET bookingID = ?,status = ? WHERE roomID = ?;',[bookingID,reserved,roomID], function (err,rows) {

       if (err) {
           connection.release();
           callback(err, null);
           console.log(" updating ........query Error....");
       }
       else {
           console.log(" updating......query successful....");

           //getting updated roomTypeId pass it
           console.log ("passing p value is step3______"+p);
           console.log("UPDATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
            sendingNoOfRoom(array,RoomTypeID,callback,p,sendingNoOfRoomToApiArray);
           // connection.release();
            //callback(null,raws);
             console.log("within update function");

       }

})
        }
    }
    )
};
///////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
        }
      //  connection.release();
    }///take this
)};



//////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


function onlineCustomerCancel(
    action,
    HotelID,
    authcode,
    userNIC,
    roomTypeA,
    roomTypeB,
    roomTypeC,
    roomTypeD,
    roomTypeE,
    roomTypeF,
    reason,
    res,

        callback) {

   var array = [roomTypeA,roomTypeB, roomTypeC, roomTypeD,roomTypeE,roomTypeF];
   var arrayRoomTypeID =[];
   var bookingID;
   var data1;
   var i ;
   var j = 0;
   var k;
   var roomID;
   var RoomCount;
   var roomIDArray =[];
   var roomNoSendingArray =[];
   var p = 0;
   var sendingNoOfRoomToApiArray =[];
   var passRoomTypeID;
   var passNoOfRooms;
   var RoomTypeID;
   var noOfRooms;
   var statusChecker;
   var Data;


//    localStorage.setItem("authcode",authcode);
//    var authCodeChecker = localStorage.getItem("authcode");

    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        }
        else {
        //////////////////////////////////////////////////////////////////////////////////////////
       //    connection.query('SELECT * FROM customer WHERE NIC = ? ;', [NIC], function (err, rows) {

        connection.query('SELECT * FROM service WHERE HotelID = ? ;',[HotelID],function (err,rows) {

            if (err) {
                connection.release();
                callback(err, null);
                console.log("query notsuccessfull");
            }

            else {

            if(!rows[0]) {

                   callback(err,null);
                   connection.release();
                }
             else {
                console.log(rows[0].authCode);
                console.log("authcode ok..............."+rows[0].authCode);
                if(rows[0].authCode==authcode){
                access = true;
                console.log("auth code are match/////////////////////////////////////////");


        //////////////////////////////////////////////////////////////////////////////////////////
            var post = {
                NIC:userNIC,
            }
            connection.query('SELECT bookingID,bookingstatus FROM booking WHERE NIC = ? ORDER BY bookingID DESC;',userNIC, function (err, rows) {
                //  console.log(rows[0].password);
                  if (err) {
                      connection.release();
                      callback(err, null);
                  }
                  else {
                      if(!rows[0]) {
                          connection.release();
                          callback(err,null);
                         // console.log("no user");
                      } else {
                            console.log(rows[0].bookingID+"usere is found");
                            bookingID = rows[0].bookingID;
                            statusChecker=rows[0].bookingstatus;

   //should checkeeee                        if (statusChecker=="canceled"){
                                //  connection.release();
                                //  callback(err,null);
                              //  }

                           //  else{
                            console.log(rows[0].bookingstatus+"-------------------\\\\\\\\\\\\\=-----------------------------------------------------------------")
                              //  connection.release();
                    //   connection.query('UPDATE roomType SET noOfRooms = ? WHERE RoomTypeID = ?;',[updatedNoOfRooms,RoomTypeID], function (err,rows) {

                 connection.query('UPDATE booking SET bookingstatus = ? WHERE  bookingID = ?;',["canceled", bookingID ], function (err, rows) {
                //  console.log(rows[0].password);
                  if (err) {
                      connection.release();
                      callback(err, null);
                  }
                  else {

                    console.log("updated booking");
                    var sts= "free";
                    connection.query('UPDATE room SET status = ? WHERE bookingID = ?;',[sts,bookingID], function (err, rows) {
                //  console.log(rows[0].password);
                  if (err) {
                      connection.release();
                      callback(err, null);
                  }
                  else {
                     console.log(bookingID+"*************************************************88");
                      console.log("updated room////////////////////////777777777777777777777777777");
                      increasingNoOfRooms(array,i,callback);
                      connection.release();

                  }
              });
                           // console.log(rows[0].bookingID+"usere nis found");
                           // bookingID = rows[0].bookingID;
                            //connection.release();

                  }
              });

                         //  }
                  }
                }
              });

            }
        }
    }
        });
              //////////////////////////////

        }

    });
//if (statusChecker!="canceled"){

var increasingNoOfRooms = function(array,i,callback){
    console.log(array);
    for(i = 0 ; i <array.length;i++){
        selectingNoOfRooms(array[i],i,callback);
    }

 };

 var selectingNoOfRooms = function(RoomCount,i,callback){

    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        }
        else {

            connection.query('SELECT roomTypeID,noOfRooms FROM roomtype WHERE roomType = ?;',i, function (err,raws) {

                if (err) {
                    connection.release();
                    callback(err, null);

                }
                else {

                   //converting room type according to no of room sending oreder from booking
                    arrayRoomTypeID[j]= raws[0].roomTypeID;
                    RoomTypeID = arrayRoomTypeID[j];
                    noOfRooms = raws[0].noOfRooms;
                    RoomCount = array[j];
                   console.log("step...");
                    j++;
                    updatingNoOfRooms(RoomTypeID,j,noOfRooms,RoomCount,arrayRoomTypeID,callback);
                    connection.release();

                }

            });

    }
})
};
var updatingNoOfRooms = function(RoomTypeID,j,noOfRooms,RoomCount,arrayRoomTypeID,callback){

    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        }
        else {

            console.log(noOfRooms+"________________"+RoomCount);
            updatedNoOfRooms = noOfRooms+RoomCount;
                //'UPDATE roomType SET noOfRooms = ? WHERE RoomTypeID = ?;',[updatedNoOfRooms,RoomTypeID],
            connection.query('UPDATE roomType SET noOfRooms = ? WHERE RoomTypeID = ?;',[updatedNoOfRooms,RoomTypeID], function (err,rows) {

                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log(" ........query Error....");
                }
                else {
                    console.log("within roomNoUptade function");
                    console.log(">>>>>>>>>>>>updated>>>>>>>>>>>");
                    connection.release();
                }

         })

    }
})


};
//if (access = true){
setTimeout(function(){


    for(i = 0 ; i <array.length;i++){

        selectingSendNoOfRooms(array,callback,i);
    }
}
,6000);
//}

var selectingSendNoOfRooms = function(array,callback,i){

        main_con_pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
                connection.release();
            }
            else {

                connection.query('SELECT roomTypeID,noOfRooms FROM roomtype WHERE roomType = ?;',i, function (err,rows) {

                    if (err) {
                        connection.release();
                        callback(err, null);

                    }
                    else {

                        if(!rows[0]) {
                            callback(err,null);
                             connection.release();
                             /*res.json({
                                "msg":"somethinh wrong"
                             });*/
                          }
                    else {

                         data1 = rows[0].noOfRooms;
                         RoomTypeID  =rows[0].roomTypeID
                         sendingUpdatedNoOfRoomToApi(data1,RoomTypeID,res,array,i,p,sendingNoOfRoomToApiArray,callback);
                         connection.release();

                    }
                    }

                });
        }
    })
}
///////////////////////////////////////////

var sendingUpdatedNoOfRoomToApi = function(data1,RoomTypeID,res,array,i,p,sendingNoOfRoomToApiArray,callback){
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        }

        else {

            // if (statusChecker=="canceled"){
            //     connection.release();
            //    // callback(err,null);
            // }
            // else{
            console.log("-----------------------------------"+p+"----------------------------------------");
            //get type id and roomTypeID  to a passobject
                var passObject ={
                    passRoomTypeID:RoomTypeID,
                    passNoOfRooms:data1
                };

                sendingNoOfRoomToApiArray[i] = passObject;
                console.log(sendingNoOfRoomToApiArray[i]);
               // p++;
               // console.log("value of p is __________________"+p);
               console.log("within sendingNoOfRoomToApi function");
               console.log("check this did you see.........."+p+"..........");
               connection.release();

           // connection.release();
        //}
    }
    })

};
//if (access = true){
setTimeout(function(){
    data = sendingNoOfRoomToApiArray;
     Data = {
        "HotelID":HotelID,
        "authcode":  authcode,
        data
   };

   Data1 = {
    "status": 200,
    "HotelID":HotelID,
    "authcode":  authcode,
};
// "status": 200,
   sendApi();
    callback(null,Data);
    console.log(sendingNoOfRoomToApiArray);
   // connection.release();

}
,12000);
/////////////////////////////////////////////////////////
var sendApi = function(){
var http = require('http');
var post_req  = null,
   // post_data = sendingNoOfRoomToApiArray.toString();
   // console.log( post_data);
  post_data =  JSON.stringify(Data);

//////////////////////////////////////////////////////////////////////////////
var post_options = {
    //hostname: '10.10.30.127',
    hostname: 'booking.pal.morasquad.me',
    port    : 80,
    path    : '/api/reportback',
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
//////////////////////////////////////////////////////////////////
};
        //}
//};

module.exports.onlineCustomer = onlineCustomer;
module.exports.onlineCustomerCancel = onlineCustomerCancel;

//var authCodeChecker



/*
var sendioOfRoom = function( RoomTypeID,noOfRooms){
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        }
        else {

        }
    })

};
*/
