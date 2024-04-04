-- Setup
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

CREATE TABLE universityrso {
  university_id INT,
  rso_id INT
}

CREATE TABLE attendees (
  user_id INT,
  event_id INT,
  is_attending BOOLEAN
);


-- Fill out database
INSERT INTO TABLE users (username, full_name)
VALUES
("student1", "Jake"),
("student2", "Finn"),
("student3", "BMO"),
("student4", "Bubblegum"),
("student5", "Marceline");

INSERT INTO TABLE rsos (name, admin_id)
VALUES
("rso1", 1)
("rso2", 2)
("rso3", 3);

INSERT INTO TABLE universities (name, description, location)
VALUES
("UCF", "Big university with 70,000 students!", "Orlando")

INSERT INTO TABLE events (name, category, description, date, length_minutes, rso_id)
VALUES
("Event1", "")