require('isomorphic-fetch');
require('dotenv').config();
const GOOGLE_API_KEY = process.env.GOOGLE;
const GEONAMES_USERNAME = process.env.GEONAMES;

function getLatLong(req, res, next) {
  if(req.query.lat&&req.query.long){
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.lat},${req.query.long}&key=${GOOGLE_API_KEY}`)
    .then((fetchRes) => {
      return fetchRes.json();
    }).then((jsonFetchRes) => {
      let locs = {
        lat: jsonFetchRes.results[0].geometry.location.lat,
        lng: jsonFetchRes.results[0].geometry.location.lng
      }
      console.log(locs);
      res.locals.coords = locs;
      next();
    })
  }else{
    next();
  }
}

function getGeonamesLocation(req, res, next) {
  if(req.query.lat&&req.query.long){
    fetch(`http://api.geonames.org/findNearestIntersectionJSON?lat=${req.query.lat}&lng=${req.query.long}&username=${GEONAMES_USERNAME}`)
    .then((fetchRes) => {
      return fetchRes.json();
    }).then((jsonFetchRes) => {
      let locs = {
        street1: jsonFetchRes.intersection.street1,
        street2: jsonFetchRes.intersection.street2
      }
      console.log(locs);
      res.locals.coords = locs;
      next();
    })
  }else{
    next();
  }

}

function findNearbyStreets(req, res, next) {
  if(req.query.lat&&req.query.long){
    fetch(`http://api.geonames.org/findNearbyStreetsJSON?lat=${req.query.lat}&lng=${req.query.long}&username=${GEONAMES_USERNAME}`)
    .then((fetchRes) => {
      return fetchRes.json();
    }).then((jsonFetchRes) => {
      console.log('findNearbyStreets result returned: ',jsonFetchRes);
      let names = [];
      for(let i=0;i<jsonFetchRes.streetSegment.length;i++){
        names.push(jsonFetchRes.streetSegment[i].name);
      }
      var uniqueNames = [];
      let firstStreet = names[0];
      uniqueNames.push(firstStreet);
      if(firstStreet.match(/[Ss][Tt][Rr .]?/g)){
        for(let i=1;i<names.length;i++){
          if(!names[i].match(/[Ss][Tt][Rr .]?/g)){
            uniqueNames.push(names[i]);
          }
        }
      }
      console.log('uniqueNames: ', uniqueNames);
      let uniquerNames = [];
      uniqueNames.map(function(el){
        if(uniquerNames.indexOf(el)=== -1) {
            uniquerNames.push(el);
        }
      });
      console.log('uniquerNames: ',uniquerNames);
      res.locals.streets = uniquerNames;
      next();
    })
  }else{
    next();
  }
}

module.exports = {
  getLatLong: getLatLong,
  getGeonamesLocation: getGeonamesLocation,
  findNearbyStreets: findNearbyStreets,
}
