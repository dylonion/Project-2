const Parking = require('../models/Parking');

const ParkingController = {};

ParkingController.index = (req, res) => {
  Parking.showCars(req.user.id)
    .then(Parking => {
      res.render('view',{
          Parking:Parking
      }).catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  })
};

ParkingController.createCar = (req, res) => {
  Parking.createCar({
    group_name: req.body.group_name,
    user_id: parseInt(req.user.id),
    description: req.body.description
  })
  .then(data => {
    Parking.createReference({
      car_id: data.id,
      user_id: data.user_id
    }).then(Parking => {
      res.redirect('/user');
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

ParkingController.show = (req, res) => {
  if(req.params.id==='new'){
    res.render('add');
  }else{
    Parking.findById(req.params.id)
    .then(Parking => {
      if(req.query.edit === "y"){
        console.log('req query edit',req.query.edit);
        Parking.showedit = '';
      }
      res.render('show', {Parking});
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
};

ParkingController.create = (req, res) => {
  console.log(req.body);
  Parking.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      user_id:parseInt(req.user.id)
    }).then(Parking => {
      res.redirect(`/Parking/${Parking.id}`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

ParkingController.update = (req, res) => {
  Parking.update({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    user_id:req.user.id,
    status: req.body.status,
    }, req.params.id).then(Parking => {
      res.redirect(`/Parking/${Parking.id}`);
    }).catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Update failed',
      error: err,
    });
  });
};
ParkingController.updateStatus = (req, res) => {
  Parking.updateStatus({
    status: req.body.status
  }, req.params.id).then(Parking => {
      res.redirect(`/Parking/${Parking.id}`);
    }).catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Update failed',
      error: err,
    });
  });
}
ParkingController.delete = (req, res) => {
  Parking.destroy(req.params.id)
    .then(() => {
      res.redirect('/Parking');
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Delete failed',
        error: err,
      });
    });
};

module.exports = ParkingController;
