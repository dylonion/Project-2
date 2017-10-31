const bcrypt = require('bcryptjs');
const User = require('../models/User');

const usersController = {};

usersController.index = (req, res) => {
  console.log('userid: ',req.user.id);
  User.findById(parseInt(req.user.id))
  .then(user => {
    let carInfo = ''
    if(typeof(res.locals.cars)!=='undefined'){
      carInfo = res.locals.cars;
      console.log('setting carInfo. ', carInfo);
    }
    res.render('user',{
      userInfo: user,
      cars: carInfo
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
};

usersController.returnLocation = (req, res) => {
  console.log('firing returnLocation', res.locals.coords);
  res.json(res.locals.coords);
}

usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username:  req.body.username,
    email: req.body.email,
    password_digest: hash,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }).then(user => {
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/user');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
};

module.exports = usersController;
