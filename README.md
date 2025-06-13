
# Library Management System (Node.js + Express + EJS)

## Overview

This is a simple Library Management System built with Node.js, Express, and EJS. It includes basic user authentication, session handling, and CRUD operations for books.

## Features

- **User Signup and Login**
  - Users can create an account and log in securely.
  - Passwords are hashed using bcrypt for security.
  - User sessions are managed using express-session.

- **Book Management**
  - View all books in the library.
  - Add a new book to the library.
  - Issue a book (mark as "Issued").
  - Return a book (mark as "Available").
  - Delete a book from the list.

## Tech Stack

- Node.js
- Express.js
- EJS (Embedded JavaScript Templating)
- bcrypt (for password hashing)
- express-session (for session management)

## File Structure

- `app.js` — Main application file containing routes and logic.
- `views/` — Contains EJS templates:
  - `signup.ejs`
  - `login.ejs`
  - `home.ejs`
- `public/` — (Optional for styling or JS)
- `package.json` — Project metadata and dependencies

## Usage

### 1. Install Dependencies
```
npm install express body-parser express-session bcrypt ejs
```

### 2. Start Server
```
node app.js
```

### 3. Access in Browser
```
http://localhost:3000
```

## Demo Flow

1. Signup at `/signup` with a unique username and password.
2. Login at `/login`.
3. View the library, add books, issue, return, or delete them.
4. Logout using the logout button.

## Note

This project uses an **in-memory** data store, which resets every time the server restarts. In production, use a database like MongoDB or PostgreSQL.

## Learning Outcomes

- Implemented secure authentication with hashed passwords.
- Understood session management using express-session.
- Practiced dynamic rendering using EJS templates.
- Learned full CRUD operation implementation in Express.
- Gained experience building an end-to-end web app with authentication.

