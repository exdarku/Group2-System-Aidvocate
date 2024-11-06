### API Documentation Overview

#### Base Endpoint
- `/api`

### Endpoints for Organizations

#### 1. **Get All Organizations**
- **Endpoint**: `/api/getorganizations`
- **Method**: GET
- **Access**: Requires authorization
- **Description**: Retrieves a list of all registered organizations.

#### 2. **Add a New Organization**
> [!NOTE]  
> Do not use this endpoint, will just make you crazy. Just use /admin/addorganizations.
- **Endpoint**: `/api/addorganizations`
- **Method**: POST
- **Access**: Requires authorization
- **Description**: Allows the addition of a new organization. The request should include the following JSON body:

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

#### 3. **Add a New Donation**
- **Endpoint**: `/api/donate`
- **Method**: POST
- **Description**: Allows the addition of a new donation. The request should include the following JSON body:

```json
{
    "OrganizationID": "Org ID (int)",
    "DonatorName": "Donator Name",
    "DonationAmount": "Donation Amount (int)",
    "Verified": false // Doesn't matter, will always be false.
}
```

#### 4. **Add a New Donation**
- **Endpoint**: `/api/verifydonation`
- **Method**: POST
- **Access**: Requires authorization
- **Description**: Approves a donation. The request should include the following JSON body:

```json
{
    "DonationID": 1
}
```

#### 5. **Get a single organization**
- **Endpoint**: `/api/get/organization`
- **Method**: GET
- **Description**: Get a single organization. The request should include the following JSON body:
```json
{
    "organizationID": 1
}
```



### Authentication Endpoints

#### 1. **User Authentication**
- **Endpoint**: `/auth`
- **Purpose**: Handles user authentication.

#### 2. **User Login**
- **Endpoint**: `/auth/login`
- **Method**: POST
- **Description**: Authenticates a user based on the provided credentials and returns user details in a JSON object.
- **Expected JSON body**:
```json
{
    "username": "user username",
    "password": "user password"
}
```

#### 3. **User Registration**
- **Endpoint**: `/auth/register`
- **Method**: POST
- **Description**: Registers a new user with the provided credentials.
- **Expected JSON body**:
```json
{
    "username": "user username",
    "password": "user password"
}
```

