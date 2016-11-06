//Converts into radians
var rad = function(x) {
  return x * Math.PI / 180;
};

//Function with two parameters getting location objects
var getDistance = function(loc1, loc2) {
  
var R = 6378137; // Earth's mean radius in meter

//Differences in radians of both locations
var dLat = rad(loc2.latitude - loc1.latitude);
var dLong = rad(loc2.longitude - loc1.longitude);


  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(loc1.latitude)) * Math.cos(rad(loc2.latitude)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
//returns the distance in meter
  return d; 
};