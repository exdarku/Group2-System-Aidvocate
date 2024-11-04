-- One Query SQL

-- Fill up your details here, to be used for registration
-- MAKE SURE TO CHANGE THIS TO YOUR OWN DETAILS
set @firstName = "Your First Name"; 
set @lastName = "Your Last Name"; 
set @username = "Your Username";
set @password = "Your Password";

drop table users;

create table users (
	userID int NOT NULL AUTO_INCREMENT,
    firstName varchar(255),
    lastName varchar(255) NOT NULL,
    username varchar(255),
    password varchar(255),
    PRIMARY KEY (userID)
);

INSERT INTO users (firstName, lastName, username, password) VALUES (@firstName, @lastName, @username, @password);

-- Showing the final user table
select * from users;
