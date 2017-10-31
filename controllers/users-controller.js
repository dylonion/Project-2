const bcrypt = require('bcryptjs');
const User = require('../models/User');

const usersController = {};

usersController.index = (req, res) => {
  console.log('userid: ',req.user.id);
  User.findById(parseInt(req.user.id))
  .then(user => {
    res.render('user',{
      userInfo: user
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
};

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
      res.redirect('/parking');
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
};

module.exports = usersController;
