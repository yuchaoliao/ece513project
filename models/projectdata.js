var db = require("../db");

// Define the schema
var projectDataSchema = new db.Schema({
    deviceId:   String,
    userEmail:  String,
    longitude:  Number,
    latitude:   Number,
	UVintensity: Number,
	speed: Number,
    submitTime: { type: Date, default: Date.now }
});

// Creates a Devices (plural) collection in the db using the device schema
var ProjectData = db.model("ProjectData", projectDataSchema);

module.exports = ProjectData;

