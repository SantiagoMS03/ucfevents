-- Setup
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS rsos CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS attendees CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE users (
  user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  university_id INT,
  access BOOLEAN,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created date default current_date,
  CONSTRAINT fk_university FOREIGN KEY(university_id) REFERENCES universities(university_id)
);

CREATE TABLE rsos (
  rso_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  admin_id INT,
  CONSTRAINT fk_admin FOREIGN KEY(admin_id) REFERENCES users(user_id)
);

CREATE TABLE events (
  event_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  category VARCHAR(255),
  description VARCHAR(255),
  date DATE,
  length_minutes INT,
  rso_id INT,
  CONSTRAINT fk_rso FOREIGN KEY(rso_id) REFERENCES rsos(rso_id)
);

CREATE TABLE attendees (
  user_id INT,
  event_id INT,
  is_attending BOOLEAN,
  CONSTRAINT fk_attendees FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE reviews (
  review_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  event_id INT,
  name VARCHAR(255),
  review TEXT,
  rating INT check(rating >=1 and rating <=5),
  CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events(event_id)
);


CREATE TABLE universities (
  university_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  description VARCHAR(255),
  location VARCHAR(255),
  students INT,
);