-- One Query SQL

drop table users;

create table users (
	userID int NOT NULL AUTO_INCREMENT,
    firstName varchar(255),
    lastName varchar(255) NOT NULL,
    username varchar(255),
    password varchar(255),
    PRIMARY KEY (userID)
);

INSERT INTO users (firstName, lastName, username, password) VALUES ("INIT", "INIT", "INIT", "INIT");

-- Showing the final user table
select * from users;
