-- Setup
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS rsos CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS universities CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS universityrso CASCADE;
DROP TABLE IF EXISTS rsoevent CASCADE;
DROP TABLE IF EXISTS attending CASCADE;
DROP TABLE IF EXISTS rsouser CASCADE;
DROP TABLE IF EXISTS eventreview CASCADE;
DROP TABLE IF EXISTS eventuser CASCADE;

CREATE TABLE users (
  user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  university_id INT,
  access BOOLEAN,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created date default current_date
);

CREATE TABLE rsos (
  rso_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  admin_id INT,
  is_private BOOLEAN
);

CREATE TABLE events (
  event_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  category VARCHAR(255),
  description VARCHAR(255),
  date DATE,
  length_minutes INT,
  rso_id INT,
  is_private BOOLEAN,
  is_rso BOOLEAN,
  is_public BOOLEAN
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
  location VARCHAR(255),
  students INT
);

CREATE TABLE universityrso (
  university_id INT,
  rso_id INT
);

CREATE TABLE rsoevent (
  rso_id INT,
  event_id INT
);

CREATE TABLE attending (
  user_id INT,
  event_id INT
);

CREATE TABLE rsouser (
  user_id INT,
  rso_id INT
);

CREATE TABLE eventreview (
  event_id INT,
  review_id INT
);

CREATE TABLE eventuser (
  event_id INT,
  user_id INT
);


-- Fill out database
INSERT INTO users (email, password)
VALUES
('student1@ucf.edu', 'password1'),
('student2@ucf.edu', 'password2'),
('student3@ucf.edu', 'password3'),
('student4@ucf.edu', 'password4'),
('student5@ucf.edu', 'password5');

INSERT INTO rsos (name, admin_id)
VALUES
('rso1', 1),
('rso2', 2),
('rso3', 3);

INSERT INTO universities (name, description, location)
VALUES
('UCF', 'Big university with 70,000 students!', 'Orlando');

INSERT INTO events (name, category)
VALUES
('Event1', 'Cat 1');