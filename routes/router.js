
//Node.js core modules
var path = require('path');
//3rd party modules
var express = require('express');
//Custom modules
var mysql_db_operation = require(path.join(__dirname, '/../modules/mysql_db_operation'));
var mysql_db_customer = require(path.join(__dirname, '/../modules/mysql_db_customer'));
var mysql_db_viewDetails = require(path.join(__dirname, '/../modules/mysql_db_viewDetails'));
var mysql_db_reservation = require(path.join(__dirname, '/../modules/mysql_db_reservation'));
var mysql_db_bookingEngine = require(path.join(__dirname, '/../modules/mysql_db_bookingEngine'));
var mysql_db_updateTable = require(path.join(__dirname, '/../modules/mysql_db_updateTable'));

var config = require('../configurations/config');
var tokenVerification = require('../configurations/tokenVerification');
//Router
var router = express.Router();

var app = express();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// secret variable
app.set('superSecret',config.config_session_secret);

//checked ok
///////////////////////////////////////////////////////////---------------------
router.post('/onlineCustomerRegister', function(request,response) {
    console.log(" hotel customer");
    if(request.body.action=="cancel"){
///////////////////////////////////////////////////////////////////////////////////
mysql_db_bookingEngine.onlineCustomerCancel( 
    request.body.action,
       request.body.HotelID,
       request.body.authcode,
       request.body.userData,

       
       request.body.rooms.TypeA,
       request.body.rooms.TypeB,
       request.body.rooms.TypeC,
       request.body.rooms.TypeD,
       request.body.rooms.TypeE,
       request.body.rooms.TypeF,
       request.body.reason,
       response,                              
             function(err,customer) {

if(err) {
response.statusCode = 500;
response.json({"status":response.statusCode});
} else if(!customer) {
response.statusCode = 404;
response.json({"status":response.statusCode});
} else {
response.json(customer);
}
});

   
 //////////////////////////////////////////////////////////////////////////////////   
}
else{
///////////////////////////////////////////////////////////////////////////////
mysql_db_bookingEngine.onlineCustomer(  request.body.HotelID,
    request.body.authcode,
    request.body.userData.NIC,
    request.body.userData.Name,
    request.body.reservation.checkin_date,
    request.body.reservation.checkout_data,
    request.body.reservation.payment,
    request.body.rooms.TypeA,
    request.body.rooms.TypeB,
    request.body.rooms.TypeC,
    request.body.rooms.TypeD,
    request.body.rooms.TypeE,
    request.body.rooms.TypeF,
                              
          function(err,customer) {

if(err) {
response.statusCode = 500;
response.json({"status":response.statusCode});
} else if(!customer) {
response.statusCode = 404;
response.json({"status":response.statusCode});
} else {
response.json(customer);
}
});
//////////////////////////////////////////////////////////////////////////////////////
}
//console.log();
});
////////////////////////////////////////////////////////////---------------------
////////////////////////////////////////////////////////////////////////////////////
//checked ok
router.post('/onlineCustomerRegisterCancel', function(request,response) {
    //console.log("hi hih i hotel customer");
    mysql_db_bookingEngine.onlineCustomerCancel( 
                                         request.body.action,
                                            request.body.HotelID,
                                            request.body.authcode,
                                            request.body.userData,
                            
                                            
                                            request.body.rooms.TypeA,
                                            request.body.rooms.TypeB,
                                            request.body.rooms.TypeC,
                                            request.body.rooms.TypeD,
                                            request.body.rooms.TypeE,
                                            request.body.rooms.TypeF,
                                            request.body.reason,
                                            response,                              
                                                  function(err,customer) {
     
        if(err) {
            response.statusCode = 500;
            response.json({"status":response.statusCode});
        } else if(!customer) {
            response.statusCode = 404;
            response.json({"status":response.statusCode});
        } else {
            response.json(customer);
        }
    });
	//console.log();
});
/////////////////////////////////////////////////////////////////////////////////////
//response whole user details
//loginok checked
router.post('/login', function(request,response) {
	console.log(request.body.username + " --> " + request.body.password);
    mysql_db_operation.login(request.body.username, request.body.password, function(err,db_user) {
        if(err) {
            response.statusCode = 500;
            response.json({"status":response.statusCode });
        } else if(!db_user) {
            response.statusCode = 404;
            response.json({"status":response.statusCode });
            //response.json({" status":"300"});
        } else {
           // response.json({status:true,msg:"login successful"});
          //  response.json({"user":db_user});

                       // if user is found and password is right
                        // create a token with only our given payload
                        // we don't want to pass in the entire user since that has the password
                        const payload = {
                            username:db_user
                    };
                        //var token = jwt.sign(payload,app.get('superSecret')//,{
                        var token = jwt.sign(payload, app.get('superSecret'),{
                            expiresIn: 60*60*24
                             // expires in 24 hours
                        });

                      //response.json({"user":{"status":response.statusCode }});
                        // return the information including token as JSON
                        response.json({
                            status:"200",
                            data:{
                            jobRole: db_user,
                            token: token
                            }
                        });
                        console.log(db_user);
        }
    });
	console.log(request.body);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
// route middleware to verify a token
// router.use(function(req, res, next) {
//
//       // check header or url parameters or post parameters for token
//       var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//       // decode token
//       if (token) {
//
//         // verifies secret and checks exp
//         jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//           if (err) {
//             return res.json({ success: false, message: 'Failed to authenticate token.' });
//           } else {
//             // if everything is good, save to request for use in other routes
//             req.decoded = decoded;
//             next();
//           }
//         });
//
//       } else {
//
//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//
//       }
//     });

    // route to show a random message (GET http://localhost:8080/api/)


    // route to return all users (GET http://localhost:8080/api/users)

//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////
//checked 18
router.post('/customerRegistration',tokenVerification,function(request,response) {
	//console.log(request.body.username + " --> " + request.body.password);
    mysql_db_customer.customerRegistration(
        request.body.NIC,
        request.body.firstName,
        request.body.lastName,
        request.body.gender,
        request.body.email,
        request.body.DOB,
        request.body.contactNo,
        request.body.country,
        request.body.no,
        request.body.street,
        request.body.town,
       


                                            function(err,customer) {
        if(err) {
            response.statusCode = 500;
            response.json({"status": response.statusCode});
        } else if(!customer) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
            response.json(customer);
        }
    });
	console.log(request.body);
});

//not completed
//tokenVerification,
router.post('/confirmCustomerBooking',  function(request, response) {
	//console.log(request.body.roomType + " --> " + request.body.checkInDate);
    mysql_db_customer.confirmCustomerBooking(
        request.body.noOfChildren,
        request.body.noOfAdults,
        request.body.status,
        request.body.bookingType,
        request.body.checkInDate,
        request.body.checkOutDate,
        request.body.EID,
        request.body.NIC,
        request.body.roomTypeID,
        request.body.room,
        request.body.packageID,
         
        function(err, db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"status":response.statusCode});
            //response.json({"Error":"Internal"});
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({ "status":response.statusCode});
           // response.json({"Error":"User Not Found"});
        } else {
            //console.log('data inserted successfuly');
            response.json(db_msg);
        }
    });
	console.log(request.body);
});


///////////////////////////////////////////////////////////////////////////////////////
// tokenVerification

//checked19
router.post('/roomAvailabilty',tokenVerification,function(request,response) {
	console.log(request.body.roomType + " --> " + request.body.checkInDate);
    mysql_db_reservation.roomAvailabiltyChecking(request.body.roomType,request.body.packageType,request.body.checkInDate,request.body.checkOutDate, function(err,db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({ "status":response.statusCode});
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
            //console.log('data inserted successfuly');
            response.json(db_msg);
        }
    });
	console.log(request.body);
});
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//tokenVerification

//checked17
router.post('/userRegistration',tokenVerification, function(request, response) {
    console.log(request.body.username + " --> " + request.body.password);
   
    mysql_db_operation.registration(
                                    request.body.jobRole,
                                    request.body.email,
                                    request.body.username,
                                    request.body.password,
                                    request.body.contactNo,
                                    request.body.status,  
                                    function(err,db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"status": response.statusCode});
            //callback(null,{status:200,data:{msg:"User is registered successfully"}});
           // response.json({"user":{status:response.statusCode}});
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
           // response.json({"user":{status:response.statusCode}});
           // response.json({"Error":"User Not Found"});
           
        } else {
            //console.log('data inserted successfuly');
            response.json(db_msg);
        }
    });
	console.log(request.body);
});
//////////////////////////////////////////////////////////////
/* router.post('/checkOutDateChecker', tokenVerification, function(request, response) {
	console.log(request.body.roomType + " --> " + request.body.checkOutDate);
    mysql_db_reservation.checkOutDateChecker(request.body.roomType,request.body.checkOutDate,function(err, db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"status": response.statusCode});
           
        } else if(!db_msg) {
            response.statusCode = 300;
            response.json({"status": response.statusCode});
        } else {
            
            response.json(db_msg);
        }
    });
	console.log(request.body);
});
 */
////////////////////////////////////////////////////////////////////////////////////////////
/*
router.post('/viewBookingDetails',tokenVerification,function(request, response) {
	//console.log(request.body.roomType + " --> " + request.body.checkInDate);
    mysql_db_viewDetails.viewBookingDetails(request.body.roomType, function(err,db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"Error":"Internal"});
        } else if(!db_msg) {
            response.statusCode = 300;
            response.json({"Error":"User Not Found"});
        } else {
            //console.log('data inserted successfuly');
            response.json({"user":db_msg});
        }
    });
	console.log(request.body);
});*/
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////online booking
/*
 router.post('/hotelCustomerRegister', tokenVerification, function(request,response) {
    //console.log(request.body.username + " --> " + request.body.password);
    ///
    mysql_db_customer.hotelCustomer ( request.body.customerID,
                                            request.body.customerName,
                                            request.body.mobileNumber,
                                            request.body.email,
                                            request.body.country,
                                            request.body.roomType,
                                            request.body.checkInDate,
                                            request.body.checkOutDate,
                                            request.body.numberOfAdults,
                                            request.body.numberOfChildren,
                                            request.body.numberOfRooms,
                                                  function(err,customer) {
        if(err) {
            response.statusCode = 500;
            response.json({"Error":"Internal"});
        } else if(!customer) {
            response.statusCode = 300;
            response.json({"Error":"User Not Found"});
        } else {
            response.json({"user":customer});
        }
    }); 
	console.log(request.body);
});
*/
////////////////////////////////////////////////////////
/*
router.post('/roomBooking', tokenVerification, function(request, response) {
	//console.log(request.body.roomType + " --> " + request.body.checkInDate);
    mysql_db_viewDetails.viewBookingDetails(request.body.roomType,
                                            request.body.checkInDate,
                                            request.body.checkOutDate,
                                            request.body.numberOfAdults,
                                            request.body.numberOfChildren,
                                            request.body.numberOfRooms,
                                                             function(err, db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"Error":"Internal"});
        } else if(!db_msg) {
            response.statusCode = 300;
            response.json({"Error":"User Not Found"});
        } else {
            //console.log('data inserted successfuly');
            response.json({"user":db_msg});
        }
    });
	console.log(request.body);
});*/
//////////////////////////////////////////////////////////////////////////////////////

///update rooom Type
//checked12
router.post('/updateRoomType', tokenVerification, function(request, response) {
    //console.log(request.body.roomType + " --> " + request.body.checkInDate);
    console.log(request.body.roomType);
    mysql_db_updateTable.updateRoomType(request.body.roomTypeID,
                                        request.body.roomType,
                                        request.body.noOfRooms,
                                        request.body.roomCondition,
                                        request.body.price,
                                        request.body.roomTypeName,
  
                                        function(err,db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"status":response.statusCode});
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status":response.statusCode});
        } else {
            //console.log('data inserted successfuly');
            response.json(db_msg);
        }
    });
	
});
///////////////////////////////
//checked11
router.post('/updatePackage',tokenVerification, function(request, response) {
    //console.log(request.body.roomType + " --> " + request.body.checkInDate);
    //packageName,roomTypeID,noOfRooms,mealPlan,wifi,swimPool,price,packageID
    mysql_db_updateTable.updatePackage(
                                       request.body.packageID,
                                       request.body.packageName,
                                      request.body.roomTypeID, 
                                      request.body.noOfRooms, 
                                      request.body.mealPlan, 
                                      request.body.wifi, 
                                      request.body.swimPool, 
                                      request.body.price, 
                                      
                                      
                                      function(err,db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"status":response.statusCode});
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status":response.statusCode});
           // response.json({"Error":"User Not Found"});
        } else {
            //console.log('data inserted successfuly');
            response.json(db_msg);
        }
    });
	
});
//////////////////////////////

//checked10
router.post('/updateStaff', tokenVerification, function(request, response) {
	//console.log(request.body.roomType + " --> " + request.body.checkInDate);
    mysql_db_updateTable.updateStaff(request.body.EID,
                                     request.body.jobRole,
                                     request.body.email,
                                     request.body.username,
                                     request.body.password,
                                     request.body.contactNo,
                                     request.body.status,
                                     
                                     function(err,db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"status":response.statusCode});
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status":response.statusCode});
        } else {
            //console.log('data inserted successfuly');
            response.json(db_msg);
        }
    });
	console.log(request.body);
});

/////////////////////////////
//checked13
    router.post('/updateRoom', tokenVerification, function(request, response) {
        //console.log(request.body.roomType + " --> " + request.body.checkInDate);
        mysql_db_updateTable.updateRoom(request.body.roomID,
                                        request.body.status,   
                                        request.body.roomStatus,  
                                        request.body.location,   
                                        request.body.roomTypeID, 
                              

                                                             function(err,db_msg) {
            if(err) {
                response.statusCode = 500;
                response.json({"status":response.statusCode});
            } else if(!db_msg) {
                response.statusCode = 404;
                response.json({"status":response.statusCode});
            } else {
                //console.log('data inserted successfuly');
                response.json(db_msg);
            }
        });
        console.log(request.body);
    });

/////////////////////////////////


//checked9
router.post('/checkOutDateChecker', tokenVerification, function(request, response) {
	console.log(request.body.roomType + " --> " + request.body.checkOutDate);
    mysql_db_reservation.checkOutDateChecker(request.body.roomType,request.body.checkOutDate,function(err, db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"status": response.statusCode});
           
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
            
            response.json(db_msg);
        }
    });
	console.log(request.body);
});
///////////////////////////////
/*
router.post('/viewCustomerCheckOut', tokenVerification, function(request, response) {
	//console.log(request.body.roomType + " --> " + request.body.checkOutDate);
    mysql_db_viewDetails.viewCustomerCheckOut(request.body.NIC,function(err, db_msg) {
        console.log(request.body.NIC);
        if(err) {
            response.statusCode = 500;
            response.json({"status": response.statusCode});
           
        } else if(!db_msg) {
            response.statusCode = 300;
            response.json({"status": response.statusCode});
        } else {
            
            response.json(db_msg);
        }
    });
	console.log(request.body);
});
*/
////////////////////////////
//checked8
router.post('/viewCustomerDetails', tokenVerification, function(request, response) {
    console.log(request.body.NIC);
	//console.log(request.body.roomType + " --> " + request.body.checkOutDate);
    mysql_db_viewDetails.viewCustomerDetails(request.body.NIC,function(err, db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"status": response.statusCode});
           
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
            
            response.json(db_msg);
        }
    });
	console.log(request.body);
});
//////////////////////////////
//checked7
router.get('/viewRoomTypeDetails',tokenVerification,function(request, response) {
	console.log("connecting...");
    mysql_db_viewDetails.viewRoomTypeDetails(request.body.roomType,function(err, db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"status": response.statusCode});
           
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
            
            response.json(db_msg);
        }
    });
	
});
/////////////////////////////
//checked6
router.get('/viewRoomsDetails',tokenVerification,function(request, response) {
	console.log("connecting...");
    mysql_db_viewDetails.viewRoomsDetails(function(err, db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"status": response.statusCode});
           
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
            
            response.json(db_msg);
        }
    });
	
});
///////////////////////////////
//checked5
router.get('/viewPackageTypeDetails',tokenVerification,function(request, response) {
	console.log("connecting...");
    mysql_db_viewDetails.viewPackageTypeDetails(function(err, db_msg) {
        if(err) {
            response.statusCode = 500;
            response.json({"status": response.statusCode});
           
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
            
            response.json(db_msg);
        }
    });
	
});
///////////////////////////////
//mobile functions
//checked4
router.get('/viewAllRooms',tokenVerification,function(request,response) {
    console.log("connecting...");
    mysql_db_viewDetails.viewAllRooms(function(err, db_msg) {
        if(err) {
            response.statusCode = 500;
           response.json({"status": response.statusCode});
           
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
            
            response.json(db_msg);
        }
    });
	
});
//////////////////////////////////
//checked3
router.get('/viewAllHotelRoomsDetails',tokenVerification,function(request, response) {
    console.log("connecting...");
    mysql_db_viewDetails.viewAllHotelRoomsDetails(function(err, db_msg) {
        
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});
///////////////////////////
//viewAllHotelRoomsDetails
//checked2
router.get('/viewAllBandRRooms',tokenVerification,function(request,response) {
    console.log("connecting...");
    mysql_db_viewDetails.viewAllBandRRooms(function(err, db_msg) {
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});
/////////////////////////////////////////////////////
//checked1
router.post('/viewAllStaff', tokenVerification,function(request, response) {
  
    mysql_db_viewDetails.viewAllStaff(request.body.staff,function(err, db_msg) {
        console.log("connecting...");
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});
//////////////////////////////////////////////////////
//checked14
router.post('/registerRoom', tokenVerification,function(request, response) {
  
    mysql_db_operation.registerRoom(request.body.status,
                                       request.body.roomStatus,
                                       request.body.location,
                                       request.body.roomTypeID,
                                      
                                       request.body.packageID,
        
                                    function(err, db_msg) {
        console.log("connecting...");
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});
///////////////////////////////////////////////////////
//checked15
router.post('/registerPackage', tokenVerification,function(request, response) {
  
    mysql_db_operation.registerPackage(request.body.packageName,
                                       request.body.roomTypeID,
                                       request.body.noOfRooms,
                                       request.body.mealPlan,
                                       request.body.wifi,
                                       request.body.swimPool,
                                       request.body.price,
        
                                    function(err, db_msg) {
        console.log("connecting...");
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});
//chekced16
////////////////////////////////////////////////////////

router.post('/registerRoomType', tokenVerification,function(request, response) {
  
    mysql_db_operation.registerRoomType(
                                       request.body.roomType,
                                       request.body.noOfRooms,
                                       request.body.roomCondition,
                                       
                                       request.body.price,
                                       request.body.roomTypeName,
        
                                    function(err, db_msg) {
        console.log("connecting...");
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});
//checked ok..
///////////////////////////////////////////////////////
router.post('/PaymentProcess', tokenVerification,function(request, response) {
  
    mysql_db_operation.PaymentProcess(
                                       request.body.amount,
                                       request.body.paymentType,
                                       request.body.status,
                                       request.body.NIC,       
                                       request.body.EID,
        
                                    function(err, db_msg) {
        console.log("connecting...");
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});


//checked ok
////////////////////////////////////////////////////////////////////
//
router.post('/customerUpdate', tokenVerification,function(request, response) {
  
    mysql_db_updateTable.customerUpdate(
                                       request.body.NIC,
                                       request.body.firstName,
                                       request.body.lastName,
                                       request.body.gender,       
                                       request.body.email,
                                       request.body.DOB,
                                       request.body.contactNo,
                                       request.body.country,
                                      
        
                                    function(err, db_msg) {
        console.log("connecting...");
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});

/////////////////////////////////////////
//checked okk
router.post('/viewCustomerBooking', tokenVerification,function(request, response) {
  
    mysql_db_viewDetails.viewCustomerBooking(
                                       request.body.NIC,
                                    
                                      
                                    function(err, db_msg) {
        console.log("connecting...");
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});
//////////////////////////////////////////////////////////////
//checked okk
router.post('/updateCustomerBooking', tokenVerification,function(request, response) {
  
    mysql_db_updateTable.updateCustomerBooking(
                                       request.body.bookingID,
                                       request.body.NIC,
                                       request.body.noOfChildren,
                                       request.body.noOfAdults,
                                       request.body.noOfRooms,
                                       request.body.bookingstatus,
                                       request.body.bookingType,
                                       request.body.checkInDate,
                                       request.body.checkOutDate,
                                       request.body.EID,
                                       request.body.packageID,
                                      
                                      
                                    function(err, db_msg) {
        console.log("connecting...");
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});
//checked
///////////////////////////////////////////////////////////////
router.get('/monthlyBookingReport', tokenVerification,function(request, response) {
  
    mysql_db_viewDetails.monthlyBookingReport(
                                       
                                      
                                    function(err, db_msg) {
        console.log("connecting...");
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});
//checked
//////////////////////////////////////////////////////////
router.get('/countryBookingReport', tokenVerification,function(request, response) {
  
    mysql_db_viewDetails.countryBookingReport(
                                       
                                      
                                    function(err, db_msg) {
        console.log("connecting...");
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});
//checked
/////////////////////////////////////////////////////////
router.get('/roomTypeBookingReport', tokenVerification,function(request, response) {
  
    mysql_db_viewDetails.roomTypeBookingReport(
                                       
                                      
                                    function(err, db_msg) {
        console.log("connecting...");
        if(err) {
            response.statusCode = 500;
        
            response.json({"status": response.statusCode});
            
        } else if(!db_msg) {
            response.statusCode = 404;
            response.json({"status": response.statusCode});
        } else {
           
            response.json(db_msg);
        }
    });
	
});
/////////////////////////////////////////////////////////////
module.exports = router;
