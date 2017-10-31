const Parking = require('../../models/Parking');

const findCars = (req,res,next) => {
  Parking.showCars(parseInt(req.user.id))
  .then(data => {
    console.log('findCars fired: ', data);
    res.locals.cars = data;
    next();
  })
}

module.exports = {
  findCars:findCars,
}
