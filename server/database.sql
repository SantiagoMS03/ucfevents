DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS rsos CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS universities CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS universityrso CASCADE;
DROP TABLE IF EXISTS rsoevent CASCADE;
DROP TABLE IF EXISTS attending CASCADE;
DROP TRIGGER rsouser_membership_trigger ON rsouser;  
DROP TABLE IF EXISTS rsouser CASCADE;
DROP TABLE IF EXISTS eventreview CASCADE;


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
  is_private BOOLEAN,
  status VARCHAR(255) DEFAULT 'Inactive' CHECK (status IN ('Active', 'Inactive'))
);

CREATE TABLE events (
  event_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  category VARCHAR(255),
  description VARCHAR(255),
  date DATE,
  length_minutes INT,
  visibility VARCHAR(255),
  location VARCHAR (255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(255),
  rso_id INT,
  admin_id INT,
  CONSTRAINT location_unique UNIQUE (location, date)
);

CREATE TABLE attendees (
  user_id INT,
  event_id INT,
  is_attending BOOLEAN,
  is_private BOOLEAN,
  is_rso BOOLEAN,
  is_public BOOLEAN,
  CONSTRAINT fk_attendees FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events(event_id)
);


CREATE TABLE reviews (
  review_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  event_id INT,
  name VARCHAR(255),
  review TEXT,
  rating INT check(rating >=1 and rating <=5),
  user_id INT
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
  event_id INT,
  admin_id INT,
  rso_id INT,
  CONSTRAINT fk_event_admin_event FOREIGN KEY (event_id) REFERENCES events(event_id),
  CONSTRAINT fk_event_admin_admin FOREIGN KEY (admin_id) REFERENCES users(user_id),
  CONSTRAINT fk_event_rso FOREIGN KEY (rso_id) REFERENCES rsos(rso_id)
);

CREATE TABLE attending (
  user_id INT,
  event_id INT
);

CREATE TABLE rsouser (
  user_id INT,
  rso_id INT,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_rso FOREIGN KEY (rso_id) REFERENCES rsos(rso_id)
);


CREATE TABLE eventreview (
  event_id INT,
  review_id INT
);


INSERT INTO users (email)
VALUES
('student1@ucf.edu'),
('student2@ucf.edu'),
('student3@ucf.edu'),
('student4@ucf.edu'),
('student5@ucf.edu'),
('student6@ucf.edu'),
('student7@ucf.edu'),
('student8@ucf.edu'),
('student9@ucf.edu'),
('student10@ucf.edu');

INSERT INTO rsos (name, admin_id)
VALUES
('rso1', 1),
('rso2', 2),
('rso3', 3),
('rso4', 4),
('rso5', 5);

INSERT INTO universities (name)
VALUES
('UCF');

INSERT INTO events (name)
VALUES
('Event1'),
('Event2'),
('Event3'),
('Event4'),
('Event5'),
('Event6'),
('Event7'),
('Event8'),
('Event9'),
('Event10'),
('Event11'),
('Event12'),
('Event13'),
('Event14'),
('Event15'),
('Event16'),
('Event17'),
('Event18'),
('Event19'),
('Event20');

INSERT INTO universityrso (university_id, rso_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);

INSERT INTO rsoevent (rso_id, event_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 9),
(3, 10),
(3, 11),
(3, 12),
(4, 13),
(4, 14),
(4, 15),
(4, 16),
(5, 17),
(5, 18),
(5, 19),
(5, 20);

INSERT INTO attending (user_id, event_id)
VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(4, 7),
(4, 8),
(5, 9),
(5, 10),
(6, 11),
(6, 12),
(7, 13),
(7, 14),
(8, 15),
(8, 16),
(9, 17),
(9, 18),
(10, 19),
(10, 20);

INSERT INTO rsouser (user_id, rso_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(3, 2),
(4, 2),
(5, 3),
(6, 3),
(7, 4),
(8, 4),
(9, 5),
(10, 5);

CREATE OR REPLACE FUNCTION check_rso_membership()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF (SELECT COUNT(*) FROM rsouser WHERE rso_id = NEW.rso_id) >= 5 THEN
            UPDATE rsos SET status = 'Active' WHERE rso_id = NEW.rso_id;
        ELSE
            UPDATE rsos SET status = 'Inactive' WHERE rso_id = NEW.rso_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF (SELECT COUNT(*) FROM rsouser WHERE rso_id = OLD.rso_id) < 5 THEN
            UPDATE rsos SET status = 'Inactive' WHERE rso_id = OLD.rso_id;
        END IF;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rsouser_membership_trigger
AFTER INSERT OR DELETE ON rsouser
FOR EACH ROW EXECUTE FUNCTION check_rso_membership();
