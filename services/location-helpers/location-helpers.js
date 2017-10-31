require('isomorphic-fetch');
require('dotenv').config();
const GOOGLE_API_KEY = process.env.GOOGLE;

function getLatLong(req, res, next) {
  if(req.query.address){
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${GOOGLE_API_KEY}`)//GOOGLE_API_KEY
    .then((fetchRes) => {
      return fetchRes.json();
    }).then((jsonFetchRes) => {
      let locs = {
        lat: jsonFetchRes.results[0].geometry.location.lat,
        lng: jsonFetchRes.results[0].geometry.location.lng
      }
      console.log(locs);
      res.locals.locs = locs;
      next();
    })
  }else{
    next();
  }
}

module.exports = {
  getLatLong: getLatLong,
}
