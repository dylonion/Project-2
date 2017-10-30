const express = require('express');
const parkingRoutes = express.Router();
const parkingController = require('../controllers/todo-controller');
const authHelpers = require('../services/auth/auth-helpers.js')

parkingRoutes.get('/', authHelpers.loginRequired, todoController.index);//pizzaHelpers.getLatLong, pizzaHelpers.getRestaurantsList,
parkingRoutes.get('/new', authHelpers.loginRequired,(req,res) => {
  console.log(req.user);
  res.render('new',{user:req.user.id});
})
parkingRoutes.post('/', authHelpers.loginRequired, todoController.create);

parkingRoutes.get('/:id', todoController.show);
parkingRoutes.put('/:id', authHelpers.loginRequired, todoController.update);
parkingRoutes.put('/status/:id',authHelpers.loginRequired, todoController.updateStatus);
parkingRoutes.delete('/:id', authHelpers.loginRequired, todoController.delete);

module.exports = parkingRoutes;
