const db = require('../db/config');

const Park = {};

Park.showCars = (id) => {
  return db.query(`
    SELECT *
    FROM cars
    WHERE user_id = $1
  `, [id]);
};

Park.findById = (id) => {
  return db.oneOrNone(`
    SELECT *
    FROM Park
    WHERE id = $1
  `, [id]);
};

Park.createCar = (Park) => {
  console.log('firing createCar',Park);
  return db.one(`
    INSERT INTO cars
    (group_name, user_id, description)
    VALUES ($1, $2, $3)
    RETURNING *
  `,[Park.group_name, Park.user_id, Park.description])
}

Park.createReference = (Park) => {
  console.log('firing createReference',Park);
  return db.one(`
    INSERT INTO cars_users
    (car_id, user_id)
    VALUES($1, $2)
    RETURNING *
    `,[Park.id, Park.user_id]);
}

Park.update = (Park, id) => {
  return db.one(`
    UPDATE Park SET
    title = $1,
    category = $2,
    description = $3,
    user_id = $4,
    status = $5
    WHERE id = $6
    RETURNING *
  `, [Park.title, Park.category, Park.description, Park.user_id, Park.status, id]);
};

Park.updateStatus = (Park, id) => {
  return db.one(`
    UPDATE Park SET
    status = $1
    WHERE id = $2
    RETURNING *
  `,[Park.status, id]);
}
Park.destroy = (id) => {
  return db.none(`
    DELETE FROM Park
    WHERE id = $1
  `, [id]);
};

module.exports = Park;
