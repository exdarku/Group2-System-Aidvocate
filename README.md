# Aidvocate

Welcome to **Aidvocate**! Our mission is to create a centralized platform that connects individuals with charities and non-governmental organizations (NGOs) for donations and volunteering opportunities. Whether you want to give back to your community or support a cause you care about, Aidvocate makes it easy to find the right organization for you.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Search and Discover**: Easily search for charities and NGOs based on cause, location, and type of involvement.
- **Donation Portal**: A secure and straightforward interface for making donations directly to your chosen organizations.
- **Volunteer Opportunities**: Find and sign up for volunteer activities that fit your schedule and interests.
- **User Profiles**: Create and manage a personal profile to track your donations and volunteer hours.
- **Responsive Design**: Access Aidvocate on any device, from desktop to mobile.

## Tech Stack

Aidvocate is built using the following technologies:

- **Frontend**: 
  - HTML
  - CSS
  - JavaScript

- **Backend**: 
  - Node.js
  - Express.js
  - MySQL

## Installation

To set up Aidvocate locally, follow these steps:

1. **Clone the repository**:
   ```bash
   https://github.com/exdarku/Aidvocate.git
   cd Aidvocate
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - We're using MySQL. For a smoother development experience, we recommend using MySQL Workbench to do queries and such.
   - Create a MySQL database and configure the connection in the `.env` file.
      - `.env` template is at `/documentation`
      - Your MySQL credentials should be filled up in the `.env` file.
   - Copy the query from `/documentation/query/onequery.sql` and run it in MySQL Workbench to initialize your database.
   

4. **Run the application**:
   ```bash
   node server/server.js
   ```

5. Open your browser and navigate to `http://localhost:3000/register` to register a user.

6. Go to `http://localhost:3000/login` to login to your newly created account.

## Usage

- **Browse Organizations**: Use the search feature to find charities and NGOs that resonate with you.
- **Donate**: Select an organization and follow the prompts to make a donation securely.
- **Volunteer**: View available volunteer opportunities and register to get involved.

## Contributing

We welcome contributions to Aidvocate! If you'd like to help improve the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'feat/fix: Add your message'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For inquiries, suggestions, or feedback, please contact us at [support@aidvocate.com](mailto:support@aidvocate.com).

---

Thank you for visiting Aidvocate! Together, we can make a difference in our communities and support causes that matter. Happy advocating!