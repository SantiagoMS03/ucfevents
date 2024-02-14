CREATE DATABASE UCFEVENTS;

-- \c ucfevents

CREATE TABLE users {
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  full_name VARCHAR(255)
};

CREATE TABLE rsos {
  rso_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
}

CREATE TABLE events (
  event_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  category VARCHAR(255),
  description VARCHAR(255),
  date DATE,
  length_minutes INT,
  FOREIGN KEY (rso_id) REFERENCES rsos(rso_id)
)

CREATE TABLE attendees {
  FOREIGN KEY (user_id) REFERENCES users(user_id)
  FOREIGN KEY (event_id) REFERENCES events(event_id)
  is_attending VARCHAR(255)
};
