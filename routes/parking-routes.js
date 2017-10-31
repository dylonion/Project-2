const express = require('express');
const parkingRoutes = express.Router();
const parkingController = require('../controllers/parking-controller');
const authHelpers = require('../services/auth/auth-helpers.js')

parkingRoutes.get('/', authHelpers.loginRequired, parkingController.index);//pizzaHelpers.getLatLong, pizzaHelpers.getRestaurantsList,
parkingRoutes.get('/new', authHelpers.loginRequired,(req,res) => {
  console.log(req.user);
  res.render('new',{user:req.user.id});
})
parkingRoutes.post('/', authHelpers.loginRequired, parkingController.createCar);

parkingRoutes.get('/:id', parkingController.show);
parkingRoutes.put('/:id', authHelpers.loginRequired, parkingController.update);
parkingRoutes.put('/status/:id',authHelpers.loginRequired, parkingController.updateStatus);
parkingRoutes.delete('/:id', authHelpers.loginRequired, parkingController.delete);

module.exports = parkingRoutes;
