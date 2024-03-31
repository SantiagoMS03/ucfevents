DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS rsos CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS attendees CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE users (
  user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) UNIQUE,
  full_name VARCHAR(255)
);

CREATE TABLE rsos (
  rso_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  admin_id INT
);

CREATE TABLE events (
  event_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  category VARCHAR(255),
  description VARCHAR(255),
  date DATE,
  length_minutes INT,
  rso_id INT
);

CREATE TABLE attendees (
  user_id INT,
  event_id INT,
  is_attending BOOLEAN
);

CREATE TABLE reviews (
  review_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  event_id INT,
  name VARCHAR(255),
  review TEXT,
  rating INT check(rating >=1 and rating <=5)
);

CREATE TABLE universities (
  university_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  description VARCHAR(255),
  location VARCHAR(255)
);

rso part of university
student part of rso
student of university
