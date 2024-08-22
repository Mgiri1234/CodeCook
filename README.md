# CodeCook - An Online Judge Platform

Welcome to the CodeCook! This project is a web-based system that allows users to practice coding by solving problems, submitting solutions, and receiving immediate feedback.


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)


## Features
- User Authentication
  - Sign Up
  - Login
  - Logout
  - Forgot Password
- User Authorization
  - Two types of Users- Admin and User
  - Different rendering for each type
- Problem Management
  - Add/Edit/Delete Problems
  - List Problems
  - View Problem Details
- Code Submission and Evaluation
  - Support for multiple languages (C, C++, Java, Python)
  - Code Compilation
  - Code Execution
  - Test Case Validation
- Submission Verdict
  - View Submitted Solutions
  - View Submission Status (Passed/Failed)
- Notifications
  - Success and Error Messages
- Profile Page
  - User Details
  - Profile Photo
  - Heatmap of submissions
- Admin Panel
  - For user promotion to admin or demotion to user

## Technologies Used

- Node.js

- Express.js

- MongoDB

- React.js

- Cloudinary

- Docker

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your local machine:
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (Optional, for running the judge in a containerized environment)

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-username/CodeCook.git
    cd CodeCook
    ```

2. **Install backend dependencies**
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

4. **Install compiler dependencies**
    ```bash
    cd ../compiler
    npm install
    ```

5. **Set up environment variables**
    Create a `.env` file in the `backend` directory and add your configuration details:
    ```env
    PORT=3000
    MONGODB_URI=
    FRONTEND_URL=http://localhost:5173
    COMPILER_URL=http://localhost:5000

    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=
    RESET_PASSWORD_TOKEN_SECRET=

    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

    EMAIL= 
    PASSWORD= 
    ```

6. **Set up environment variables**
    Create a `.env` file in the `frontend` directory and add your configuration details:
    ```env
    VITE_BACKEND_URL = http://localhost:3000
    ```

7. **Start the backend server**
    ```bash
    cd backend
    npm start
    ```

8. **Start the frontend server**
    ```bash
    cd ../frontend
    npm run dev
    ```

9. **Start the compiler server**
    ```bash
    cd ../compiler
    npm start
    ```

## Usage

Once the installation is complete, you can start using the platform by navigating to `http://localhost:5173` in your web browser.

- **Sign Up**: Create a new account.
- **Login**: Login to your account.
- **Submit Code**: Choose a problem, write your solution in the editor, and submit it for evaluation.
- **View Results**: Check the results of your submissions in the verdict.
- **See stats**: Check the number and distributions of problems solved.


## Project Structure

```plaintext
online-judge/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utilities/
│   ├── middlewares/
│   ├── .env
│   ├── app.js
│   ├── database.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── Axios.js
│   │   └── main.jsx
│   ├── .env
│   └── package.json
├── compiler/
│   ├── index.js
│   ├── executeCpp.js
│   ├── executeC.js
│   ├── executePython.js
│   ├── executeJave.js
│   └── package.json
└── README.md
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgements

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)