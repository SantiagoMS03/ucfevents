DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS rsos CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS attendees CASCADE;

CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) UNIQUE,
  full_name VARCHAR(255),
  PRIMARY KEY(user_id)
);

CREATE TABLE rsos (
  rso_id INT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  user_id INT,
  PRIMARY KEY(rso_id),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE events (
  event_id INT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  category VARCHAR(255),
  description VARCHAR(255),
  date DATE,
  length_minutes INT,
  rso_id INT,
  PRIMARY KEY(event_id),
  CONSTRAINT fk_rso FOREIGN KEY(rso_id) REFERENCES rsos(rso_id)
);

CREATE TABLE attendees (
  user_id INT,
  event_id INT,
  is_attending BOOLEAN,
  CONSTRAINT fk_attendees FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events(event_id)
);
