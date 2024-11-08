-- One Query SQL
-- Updated Nov 8, 2024 | 4:47PM

-- Drop tables manually (adjust based on your needs)
DROP TABLE IF EXISTS organizationEvents, organizationDonationDescription, donationTable, organizationData;

-- Create tables

-- Create `users` table
CREATE TABLE IF NOT EXISTS users (
    userID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (userID)
);

-- Create `organizationData` table
CREATE TABLE IF NOT EXISTS organizationData (
    organizationID INT AUTO_INCREMENT PRIMARY KEY,
    organizationRegisterDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    organizationProfilePicture LONGBLOB,
    organizationFeaturePicture LONGBLOB,
    organizationName VARCHAR(255) NOT NULL,
    organizationDescription TEXT,
    organizationPhoneNumber VARCHAR(20),
    organizationEmail VARCHAR(255),
    organizationAddress VARCHAR(255),
    organizationAbbreviation VARCHAR(50),
    representativeName VARCHAR(255),
    representativeContactNumber VARCHAR(20),
    totalDonationCollected DECIMAL(15, 2) DEFAULT 0.00
);

-- Create `donationTable` table
CREATE TABLE IF NOT EXISTS donationTable (
    DonationID INT AUTO_INCREMENT PRIMARY KEY,
    DonationTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    OrganizationID INT,
    DonatorName VARCHAR(255),
    DonationAmount DECIMAL(10, 2) NOT NULL,
    Verified BOOLEAN DEFAULT FALSE,
    DonationProof BLOB,
    FOREIGN KEY (OrganizationID) REFERENCES organizationData(organizationID)
);

-- Create `organizationEvents` table
CREATE TABLE IF NOT EXISTS organizationEvents (
    eventID INT AUTO_INCREMENT PRIMARY KEY,
    organizationID INT NOT NULL,
    nameOfEvent VARCHAR(255) NOT NULL,
    descriptionOfEvent TEXT,
    imageOfEvent_posters LONGBLOB,
    location VARCHAR(255),
    date DATE,
    time TIME,
    status INT,
    FOREIGN KEY (organizationID) REFERENCES organizationData(organizationID) ON DELETE CASCADE
);

-- Create `organizationDonationDescription` table
CREATE TABLE IF NOT EXISTS organizationDonationDescription (
    organizationID INT NOT NULL, 
    nameOfAccountHolder VARCHAR(255),
    gcashQr LONGBLOB,
    bankAccountName VARCHAR(255),
    bankAccountBank VARCHAR(255),
    bankAccountNumber VARCHAR(50),
    FOREIGN KEY (organizationID) REFERENCES organizationData(organizationID) ON DELETE CASCADE,
    PRIMARY KEY (organizationID)
);
