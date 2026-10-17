# ProfileFlow – Interactive Registration System

## Project Overview

ProfileFlow is a responsive web-based registration application developed as part of the Cognifyz Full Stack Development Internship.

The application allows users to create a professional profile by entering personal information, selecting skills, and writing a short biography.

It implements client-side and server-side validation to ensure that the submitted information meets the required conditions before a profile is created.

## Objectives

- Develop an interactive registration form.
- Implement client-side form validation using JavaScript.
- Validate submitted data on the server using Express.js.
- Create dynamic web pages using EJS templates.
- Display submitted information on a personalized profile page.
- Provide a responsive and user-friendly interface.

## Features

### 1. Interactive Registration Form

Users can enter their full name, email address, phone number, date of birth, password, gender, skills, and biography.

### 2. Client-Side Validation

JavaScript validates user input before the form is submitted.

The application checks:

- Full name length.
- Email address format.
- Phone number format.
- Password length.
- Password confirmation.
- Gender selection.
- Skill selection.
- Biography length.
- Terms and conditions acceptance.

### 3. Live Biography Character Counter

The biography field includes a character counter that updates as the user types.

The field accepts a maximum of 250 characters and requires at least 20 characters.

### 4. Password Validation

The application requires a minimum password length of eight characters.

The password and confirmation fields must match.

Passwords are not displayed on the generated profile page or stored in the temporary profile object.

### 5. Server-Side Validation

The Express.js server validates submitted information independently of the client-side JavaScript.

Invalid submissions are returned to the registration page with validation error messages.

### 6. Dynamic Profile Generation

After successful validation, the application generates a personalized profile page using EJS.

The page displays the user's name, email, phone number, date of birth, gender, selected skills, and biography.

### 7. Responsive User Interface

The application uses CSS to provide a visually consistent registration experience across desktop and smaller screens.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- EJS
- npm

## Project Structure

```text
Task-2-Interactive-Registration/
│
├── public/
│   ├── script.js
│   └── style.css
│
├── views/
│   ├── index.ejs
│   └── profile.ejs
│
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

The `node_modules` directory is generated when dependencies are installed and is not included in the Git repository.

## Installation and Setup

### Prerequisites

Install the following software:

- Node.js
- npm
- Visual Studio Code

### Step 1: Clone the repository

```bash
git clone https://github.com/sowndharya2007-SA/cognifyz-full-stack-task-2.git
```

### Step 2: Open the project directory

```bash
cd cognifyz-full-stack-task-2
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the application

```bash
npm start
```

### Step 5: Open the application

Open the following address in your browser:

http://localhost:3001

## Application Workflow

1. The user opens the registration page.
2. The user enters the required information.
3. Client-side JavaScript checks the form fields.
4. The form submits the information to the Express.js server.
5. The server performs its own validation.
6. Invalid submissions return to the registration page with error messages.
7. Valid submissions are temporarily stored in server memory.
8. An EJS template generates the personalized profile page.

## Testing

The application should be tested with the following cases:

| Test Case | Expected Result |
|---|---|
| Valid registration details | Profile is created |
| Name shorter than three characters | Validation error |
| Invalid email address | Validation error |
| Phone number containing fewer or more than ten digits | Validation error |
| Password shorter than eight characters | Validation error |
| Passwords do not match | Validation error |
| No gender selected | Validation error |
| No skill selected | Validation error |
| Biography shorter than twenty characters | Validation error |
| Biography longer than 250 characters | Input is restricted or rejected |
| Terms and conditions not accepted | Submission is rejected |
| Valid information submitted | Personalized profile is displayed |

## Data Storage

This project uses temporary in-memory storage on the server.

Registered profile information is not permanently stored in a database. The data is lost when the server process restarts.

Database integration is outside the current implementation.

## Security Considerations

- Server-side validation is performed before creating a profile.
- Passwords are excluded from the generated profile object.
- Passwords are not permanently stored by this application.
- The current implementation is an educational demonstration and is not intended for production authentication.

## Internship Task

**Internship:** Cognifyz Full Stack Development Internship

**Task:** Task 2 – Interactive Registration System

**Project Name:** ProfileFlow

## Conclusion

ProfileFlow demonstrates the development of an interactive registration application using HTML, CSS, JavaScript, Node.js, Express.js, and EJS.

The project combines client-side validation, server-side validation, dynamic profile generation, and responsive styling to create a complete registration workflow.