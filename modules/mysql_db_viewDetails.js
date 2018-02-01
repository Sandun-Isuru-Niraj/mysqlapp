
//Node.js core modules
var path = require('path');

//3rd party modules
var mysql = require('mysql');

//custom modules
var config = require('../configurations/config');
//F:\Project_Level-2\MySQLApp\modules\mysql_db_bookingEngine.js


//creating main pool connection
var main_con_pool = mysql.createPool(config.config_main_db_pool_con_options);

//asynchronous function to use in login operation



//checked
function viewRoomsDetails(callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } 
        else {
            connection.query('SELECT * FROM room;', function (err, rows) {
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
                            var data = rows;
                            var Data = {
                                status:200,
                                data

                            }
							connection.release();
                            callback(err,Data);
                         }
                }
            });
        }
    });
}
///////////////////////////////////////////////////////
///viewRoomsDetails
function viewRoomTypeDetails(roomType,callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } 
        else {
            connection.query('SELECT * FROM roomtype;', function (err, rows) {
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
                            var data = rows;
                            var Data = {
                                status:200,
                                data

                            }
							connection.release();
                            callback(err,Data);
                         }
                }
            });
        }
    });
}
///////////////////////////////////////////////////////
//checked
function viewPackageTypeDetails(callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } 
        else {
            connection.query('SELECT * FROM package;', function (err, rows) {
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
                            var data = rows;
                            var Data = {
                                status:200,
                                data

                            }
							connection.release();
                            callback(err,Data);
                         }
                }
            });
        }
    });
}
//////////////////////////////////////////////////////

function viewCustomerDetails(NIC, callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } 
        else {
            connection.query('SELECT * FROM customer WHERE NIC = ? ;', [NIC], function (err, rows) {
		
                if (err) {
                    connection.release();
                    callback(err, null);
                } 
                else {
                    if(!rows[0]) {
                        connection.release();
                        callback(null, false);
                    } else {
                            var data = rows;
                            connection.release();
                            var Data = {
                                status:200,
                                data
                            }
                            callback(err,Data);
                         }
                }
            });
        }
    });
}
///////////////////////////////////////////////////////////////
//checked
function viewAllHotelRoomsDetails(callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
        } 
        else {
            //'SELECT roomID,condition,location,roomTypeID FROM roomandroomtype ;'
           // connection.query('SELECT * FROM customer WHERE NIC = ? ;', [NIC], function (err, rows) {
		 connection.query('SELECT roomID,roomCondition,location,roomTypeID FROM roomandroomtype ORDER BY roomID  ;',function(err, rows) {
			  // 
                if (err) {
                    connection.release();
                    callback(err, null);
                    console.log(err);
                } 
                else {
                     if(!rows[0]) {
                        connection.release();
                        callback(err,null);
                        console.log(err);
                    } else {
                            var data = rows;
                            connection.release();
                            var Data = {
                                status:200,
                                data
                            }
                            callback(null,Data);
                         }
                }
            });
        }
    });
}

///////////////////////////////////////////////////////////////////

function viewCustomerCheckOut(NIC,callback) {
    console.log(request.body.NIC);
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } 
        else {
            connection.query('SELECT * FROM booking WHERE NIC = ? ORDER BY bookingID DESC ;',[NIC], function (err, rows) {
		
                if (err) {
                    connection.release();
                    callback(err, null);
                } 
                else {
                    if(!rows[0]) {
                        connection.release();
                        callback(null, false);
                    } else {
                            var data = rows;
                            connection.release();
                            var Data= {
                                status:200,
                                data
                            }
                            callback(err,Data);
                         }
                }
            });
        }
    });
}
///////////////////////////////////////////////////////////////////
//checked
function viewAllRooms(callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
        } 
        else {
            connection.query('SELECT roomID,location,roomTypeName FROM roomandroomtype WHERE status = ? AND roomStatus = ? ;',["free","enable"], function (err, rows) {
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
                        
                       
                            var data = rows;
                            var Data = {
                                status:200,
                                data

                            }
							connection.release();
                            callback(err,Data);
                         }
                }
            });
        }
    });
}

//checked
function viewAllBandRRooms(callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
            
        } 
        else {
            connection.query('SELECT roomID,checkInDate,checkOutDate FROM roomandbooking WHERE (status = ? OR status = ? ) AND roomStatus = ? ;',["booked","reserved","enable"], function (err, rows) {
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
                        console.log("heee");
                    }
                     else {
                            var data = rows;
                            var Data = {
                                status:200,
                                data

                            }
							connection.release();
                            callback(null,Data);
                         }
                }
            });
        }
    });
}

//////////////////////////////////////////////////////////////////////
//viewAllStaff
//checked
function viewAllStaff(staff,callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
            
        } 
        else {
            connection.query('SELECT EID,jobRole,email,username,contactNo,status,regDate FROM staff ORDER BY EID ;', function (err, rows) {
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
                            var data = rows;
                            var Data = {
                                status:200,
                                data

                            }
							connection.release();
                            callback(null,Data);
                         }
                }
            });
        }
    });
}

///////////////////////////////////////////////////////////////////////////
function viewCustomerBooking(NIC,callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
            
        } 
        else {
           // connection.query('SELECT EID,jobRole,email,username,contactNo,status,regDate FROM staff ORDER BY EID ;', function (err, rows) {
            connection.query('SELECT * FROM booking WHERE NIC = ? ORDER BY bookingID DESC  limit 1;',[NIC], function(err,rows){

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
                            var data = rows;
                            var Data = {
                                status:200,
                                data

                            }
							connection.release();
                            callback(null,Data);
                         }
                }
            });
        }
    });
}
//-----------------------------------------------------------------------------------


////////////////////////////////////////////////////////////////
function monthlyBookingReport(callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
            
        } 
        else {
            connection.query('SELECT * FROM analysingbooking ;', function (err, rows) {
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

                        
//console.log( authCodeChecker+"///////////////////////////////////////////////////////" );
                            var data = rows;
                            var Data = {
                                status:200,
                                data

                            }
							connection.release();
                            callback(null,Data);
                         }
                }
            });
        }
    });
}


//////////////////////////////////////////////////////////////////
function countryBookingReport(callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
            
        } 
        else {
            connection.query('SELECT * FROM analysingcustomer ;', function (err, rows) {
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
                            var data = rows;
                            var Data = {
                                status:200,
                                data

                            }
							connection.release();
                            callback(null,Data);
                         }
                }
            });
        }
    });
}

///////////////////////////////////////////////////////////////////////
function roomTypeBookingReport(callback) {
    main_con_pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null);
            connection.release();
            
        } 
        else {
            connection.query('SELECT * FROM analysingroomtype ;', function (err, rows) {
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
                            var data = rows;
                            var Data = {
                                status:200,
                                data

                            }
							connection.release();
                            callback(null,Data);
                         }
                }
            });
        }
    });
}


/////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
module.exports.viewCustomerCheckOut = viewCustomerCheckOut;
module.exports.viewCustomerDetails = viewCustomerDetails;
module.exports.viewRoomTypeDetails = viewRoomTypeDetails;
module.exports.viewRoomsDetails = viewRoomsDetails;
module.exports.viewAllRooms = viewAllRooms;
module.exports.viewPackageTypeDetails = viewPackageTypeDetails;
module.exports.viewAllBandRRooms = viewAllBandRRooms;
module.exports.viewAllHotelRoomsDetails = viewAllHotelRoomsDetails;
module.exports.viewAllStaff = viewAllStaff;
module.exports.viewCustomerBooking = viewCustomerBooking;
module.exports.monthlyBookingReport = monthlyBookingReport;
module.exports.countryBookingReport = countryBookingReport;
module.exports. roomTypeBookingReport =  roomTypeBookingReport;


//countryBookingReport
//monthlyBookingReport
//viewCustomerBooking
// viewAllBandRRooms
//viewPackageTypeDetails
//viewRoomsDetails