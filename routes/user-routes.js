const express = require('express');
const userRoutes = express.Router();

const usersController = require('../controllers/users-controller');
const authHelpers = require('../services/auth/auth-helpers');
const locationHelpers = require('../services/location-helpers/location-helpers')
const carsHelpers = require('../services/location-helpers/cars-helpers')
userRoutes.get('/', authHelpers.loginRequired, carsHelpers.findCars,  usersController.index);
userRoutes.get('/getLocation',locationHelpers.getGeonamesLocation, usersController.returnLocation);
module.exports = userRoutes;
