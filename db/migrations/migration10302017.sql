
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  firstname VARCHAR(255),
  lastname VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  group_name VARCHAR(255) UNIQUE NOT NULL,
  user_id INT REFERENCES users(id),
  location VARCHAR(1024)
);

CREATE TABLE IF NOT EXISTS calendarevents (
  id SERIAL PRIMARY KEY,
  day INT UNIQUE NOT NULL,
  description VARCHAR(2000) NOT NULL
);