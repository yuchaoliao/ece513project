var express = require('express');
var router = express.Router();
var Device = require("../models/device");
var HwData = require("../models/hwdata");
var ProjectData = require("../models/projectdata");

/* POST: Register new device. */
router.post('/hit', function(req, res, next) {

    var responseJson = { 
       status : "",
       message : ""
    };

    // Ensure the POST data include properties id and email
    if( !req.body.hasOwnProperty("deviceId") ) {
        responseJson.status = "ERROR";
        responseJson.message = "Request missing deviceId parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }

    if( !req.body.hasOwnProperty("apikey") ) {
        responseJson.status = "ERROR";
        responseJson.message = "Request missing apikey parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }
    
    if( !req.body.hasOwnProperty("longitude") ) {
        responseJson.status = "ERROR";
        responseJson.message = "Request missing longitude parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }
    
    if( !req.body.hasOwnProperty("latitude") ) {
        responseJson.status = "ERROR";
        responseJson.message = "Request missing latitude parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }

    // Find the device and verify the apikey
    Device.findOne({ deviceId: req.body.deviceId }, function(err, device) {
        if (device !== null) {
           if (device.apikey != req.body.apikey) {
               responseJson.status = "ERROR";
               responseJson.message = "Invalid apikey for device ID " + req.body.deviceId + ".";
               return res.status(201).send(JSON.stringify(responseJson));
           }
           else {
               // Create a new hw data with user email time stamp 
               var newHwData = new HwData({
                  userEmail: device.userEmail,
                  deviceid: req.body.deviceId,
                  longitude: req.body.longitude,
                  latitude: req.body.latitude
               });

               // Save device. If successful, return success. If not, return error message.                                                        
               newHwData.save(function(err, newHwData) {
                 if (err) {
                   responseJson.status = "ERROR";
                   responseJson.message = "Error saving data in db.";
                   return res.status(201).send(JSON.stringify(responseJson));
                 }
                 else {
                   responseJson.status = "OK";
                   responseJson.message = "Data saved in db with object ID " + newHwData._id + ".";
                   return res.status(201).send(JSON.stringify(responseJson));
                 }
               });
           }
        } 
        else {
           responseJson.status = "ERROR";
           responseJson.message = "Device ID " + req.body.deviceId + " not registered.";
           return res.status(201).send(JSON.stringify(responseJson));        
        }
    });
});

/* POST: post data from device. */
router.post('/UVFit', function(req, res, next) {

    var responseJson = { 
       status : "",
       message : ""
    };

    // Ensure the POST data include properties id, apikey, longtitude,latitude, UVintensity, speed  
    if( !req.body.hasOwnProperty("deviceId") ) {
        responseJson.status = "ERROR";
        responseJson.message = "Request missing deviceId parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }

    if( !req.body.hasOwnProperty("apikey") ) {
        responseJson.status = "ERROR";
        responseJson.message = "Request missing apikey parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }
    
    if( !req.body.hasOwnProperty("longitude") ) {
        responseJson.status = "ERROR";
        responseJson.message = "Request missing longitude parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }
    
    if( !req.body.hasOwnProperty("latitude") ) {
        responseJson.status = "ERROR";
        responseJson.message = "Request missing latitude parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }
	
	if( !req.body.hasOwnProperty("UVintensity") ) {
        responseJson.status = "ERROR";
        responseJson.message = "Request missing UVintensity parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }

	if( !req.body.hasOwnProperty("speed") ) {
        responseJson.status = "ERROR";
        responseJson.message = "Request missing speed parameter.";
        return res.status(201).send(JSON.stringify(responseJson));
    }
	
    // Find the device and verify the apikey
    Device.findOne({ deviceId: req.body.deviceId }, function(err, device) {
        if (device !== null) {
           if (device.apikey != req.body.apikey) {
               responseJson.status = "ERROR";
               responseJson.message = "Invalid apikey for device ID " + req.body.deviceId + ".";
               return res.status(201).send(JSON.stringify(responseJson));
           }
           else {
               // Create a new project data with user email time stamp, and requiredata
               var newProjectData = new ProjectData({
                  userEmail: device.userEmail,
                  deviceid: req.body.deviceId,
                  longitude: req.body.longitude,
                  latitude: req.body.latitude,
				  UVintensity: req.body.UVintensity,
				  speed: req.body.speed
               });

               // Save projectdata. If successful, return success. If not, return error message.                                                        
               newProjectData.save(function(err, newProjectData) {
                 if (err) {
                   responseJson.status = "ERROR";
                   responseJson.message = "Error saving data in db.";
                   return res.status(201).send(JSON.stringify(responseJson));
                 }
                 else {
                   responseJson.status = "OK";
                   responseJson.message = "Data saved in db with object ID " + newProjectData._id + ".";
                   return res.status(201).send(JSON.stringify(responseJson));
                 }
               });
           }
        } 
        else {
           responseJson.status = "ERROR";
           responseJson.message = "Device ID " + req.body.deviceId + " not registered.";
           return res.status(201).send(JSON.stringify(responseJson));        
        }
    });
});
module.exports = router;
