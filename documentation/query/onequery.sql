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

CREATE TABLE organizationData (
    organizationID INT AUTO_INCREMENT PRIMARY KEY,
    organizationRegisterDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    organizationProfilePicture BLOB,
    organizationName VARCHAR(255) NOT NULL,
    organizationDescription TEXT,
    organizationPhoneNumber VARCHAR(20),
    organizationAddress VARCHAR(255),
    organizationAbbreviation VARCHAR(50),
    representativeName VARCHAR(255),
    representativeContactNumber VARCHAR(20),
    totalDonationCollected DECIMAL(15, 2) DEFAULT 0.00
);


-- Showing the final user table
select * from users;
