# Aidvocacy API Documentation

## Table of Contents
1. [Base Endpoint](#base-endpoint)
2. [Organization Endpoints](#organization-endpoints)
   - [Get All Organizations](#1-get-all-organizations)
   - [Add a New Organization](#2-add-a-new-organization)
   - [Add a New Donation](#3-add-a-new-donation)
   - [Approve Donation](#4-approve-donation)
   - [Get a Single Organization](#5-get-a-single-organization)
   - [Add an Event](#6-add-an-event)
   - [Add Donation Details to an Organization](#7-add-donation-details-to-an-organization)
   - [Get Donation Details of an Organization](#8-get-donation-details-of-an-organization)
   - [Get Event Image](#9-get-event-image)
   - [Get Organization QR Code](#10-get-organization-qr-code)
   - [Get a specific Donation Data](#11-get-a-donation-data)
   - [Get all donations](#12-get-all-donations)
3. [Authentication Endpoints](#authentication-endpoints)
   - [User Authentication](#1-user-authentication)
   - [User Login](#2-user-login)
   - [User Registration](#3-user-registration)

---

## **Base Endpoint**
- **Base URL**: `/api`

---

## **Organization Endpoints**

### 1. **Get All Organizations**
- **Endpoint**: `/api/getorganizations`
- **Method**: `GET`
- **Access**: Requires authorization
- **Description**: Retrieves a list of all registered organizations.

---

### 2. **Add a New Organization**
> [!NOTE]  
> Do not use this endpoint directly, it may cause issues. Instead, use `/admin/addorganizations`.

- **Endpoint**: `/api/addorganizations`
- **Method**: `POST`
- **Access**: Requires authorization
- **Description**: Allows the addition of a new organization. 

  **Request Body**:
  ```json
  {
      "organizationName": "Name of the organization",
      "organizationDescription": "Description of the organization",
      "organizationPhoneNumber": "Contact number of the organization",
      "organizationAddress": "Physical address of the organization",
      "organizationAbbreviation": "Short form of the organization name",
      "representativeName": "Name of the representative",
      "representativeContactNumber": "Contact number of the representative"
  }
  ```

---

### 3. **Add a New Donation**
- **Endpoint**: `/api/donate`
- **Method**: `POST`
- **Description**: Allows the addition of a new donation.

  **Request Body**:
  ```json
  {
      "OrganizationID": "Org ID (int)",
      "DonatorName": "Donator Name",
      "DonationAmount": "Donation Amount (int)",
      "Verified": false
  }
  ```

---

### 4. **Approve Donation**
- **Endpoint**: `/api/verifydonation`
- **Method**: `POST`
- **Access**: Requires authorization
- **Description**: Approves a donation.

  **Request Body**:
  ```json
  {
      "DonationID": 1
  }
  ```

---

### 5. **Get a Single Organization**
- **Endpoint**: `/api/get/organization`
- **Method**: `GET`
- **Description**: Retrieves details of a single organization.

  **Request Body**:
  ```json
  {
      "organizationID": 1
  }
  ```

---

### 6. **Add an Event**
- **Endpoint**: `/api/addevent`
- **Method**: `POST`
- **Access**: Requires Authorization
- **Description**: Adds a new event for an organization.

  **Request Body**:
  ```json
  {
      "organizationID": 123,
      "nameOfEvent": "Charity Gala 2024",
      "descriptionOfEvent": "A night of fundraising for local children’s education programs.",
      "location": "Downtown Convention Center, Main Hall",
      "date": "2024-12-15",
      "time": "19:00:00"
  }
  ```

---

### 7. **Add Donation Details to an Organization**
- **Endpoint**: `/api/adddonationdescription`
- **Method**: `POST`
- **Access**: Requires Authorization
- **Description**: Links donation details (e.g., bank account info) to an organization.

  **Request Body**:
  ```json
  {
      "organizationID": 1,
      "nameOfAccountHolder": "John Doe",
      "bankAccountName": "Doe Enterprises",
      "bankAccountBank": "ABC Bank",
      "bankAccountNumber": "1234567890"
  }
  ```

---

### 8. **Get Donation Details of an Organization**
- **Endpoint**: `/api/getdonationdescription/`
- **Method**: `GET`
- **Description**: Retrieves the donation details of a specific organization.

---

### 9. **Get Event Image**
- **Endpoint**: `/api/eventimage/:organizationId`
- **Method**: `GET`
- **Description**: Retrieves the image for an organization's event.

---

### 10. **Get Organization QR Code**
- **Endpoint**: `/api/organizationqr/:organizationId`
- **Method**: `GET`
- **Description**: Retrieves the Gcash/QrPH QR code for an organization.

### 11. **Get a donation data**
- **Endpoint**: `/api/get/donation/:donationID`
- **Method**: `GET`
- **Description**: Retrieves a specific donation data.

### 12. **Get ALL donations**
- **Endpoint**: `/api/get/alldonations/`
- **Method**: `GET`
- **Description**: Retrieves all donations in the database.

---

## **Authentication Endpoints**

### 1. **User Authentication**
- **Endpoint**: `/auth`
- **Purpose**: Handles user authentication.

---

### 2. **User Login**
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns user details in a JSON object.

  **Request Body**:
  ```json
  {
      "username": "user username",
      "password": "user password"
  }
  ```

---

### 3. **User Registration**
- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user with the provided credentials.

  **Request Body**:
  ```json
  {
      "username": "user username",
      "password": "user password"
  }
  ```

