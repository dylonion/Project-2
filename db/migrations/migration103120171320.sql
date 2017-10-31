CREATE TABLE IF NOT EXISTS cars_users (
  id SERIAL PRIMARY KEY,
  car_id INT REFERENCES cars(id),
  user_id INT REFERENCES users(id)
);
