CREATE DATABASE UCFEVENTS;

-- \c ucfevents

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    category VARCHAR(255),
    description VARCHAR(255),
    date DATE,
    length_minutes INT
);
