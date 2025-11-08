# Smart TODO API

A small TODO API built with **Node.js, Express, and MongoDB**.
Users can sign up, sign in, verify their email, and manage tasks.
Tasks can have a title, description, status, priority, due date, and can be shared with other users.
This project focuses on structured code, validation, authentication, error handling, email integration, and testing.

---

## Project Structure

```
src/
├── app.js                # Express app setup and middleware
├── server.js             # Server entrypoint
├── config/
│   └── db.js             # MongoDB connection setup
├── middleware/
│   ├── auth.js           # Authentication middleware
│   ├── error-handler.js  # Centralized error handling middleware
│   └── validation.js     # Request validation middleware using Joi
├── models/
│   ├── User.js           # User model (Mongoose)
│   └── Task.js           # Task model (Mongoose)
├── modules/
│   ├── user/             # User module
│   │   ├── user.controller.js
│   │   ├── user.route.js
│   │   └── user.schema.js
│   └── task/             # Task module
│       ├── task.controller.js
│       ├── task.route.js
│       └── task.schema.js
├── services/
│   └── sendEmail.js      # Service for sending emails using Nodemailer
└── utils/
    └── error-handler.js  # Custom error class and helpers

__tests__/
├── app.test.js           # Tests for app routes
└── user.test.js          # Tests for user routes
```

---

## Features

### 1. User Management

* Sign up with validation
* Sign in with JWT authentication
* Email verification for new users via **Nodemailer**
* Secure password storage using bcrypt

### 2. Task Management

* Create, read, update, delete tasks (**soft delete implemented**)
* Update task **status** (`pending`, `in-progress`, `completed`)
* Set task **priority** (`low`, `medium`, `high`)
* Add optional **due date**
* **Share tasks** with other users by their IDs
* Tasks are linked to the owner (user)

### 3. Validation & Error Handling

* Request validation using **Joi** schemas
* Centralized error handling for all routes
* Proper error messages for invalid inputs

### 4. Email Service

* Send verification emails during signup using **Nodemailer**

### 5. Authentication

* JWT-based authentication
* Middleware for protected routes
* Users can only access their own tasks or shared tasks

### 6. Testing & CI

* Tests written using **Jest** and **Supertest**
* `__tests__/app.test.js` for general routes
* `__tests__/user.test.js` for user routes
* Continuous Integration via GitHub Actions workflow

---

## Environment Variables

Create a `.env` file with:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/smart-todo
MONGO_URL_TEST=mongodb://127.0.0.1:27017/smart-todo-test
JWT_SECRET_KEY=your_jwt_secret

```

---

## Requirements

* Node.js >= 20
* npm >= 9
* MongoDB running locally for development

---

## Installation

```bash
git clone https://github.com/SamuelGerges/smart-todo.git
cd smart-todo
npm install
```

---

## Run the App

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

---

## Run Tests

Tests are run with Jest and Supertest. MongoDB test database is used.

```bash
npm test
```

---

## Routes Overview

### User Routes

| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| POST   | /users/sign-up             | Register new user     |
| POST   | /users/sign-in             | Sign in existing user |
| GET    | /users/verify-email/:token | Verify user email     |

### Task Routes

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| GET    | /tasks            | Get all tasks for logged-in user |
| POST   | /tasks            | Create new task                  |
| GET    | /tasks/:id        | Get a single task by ID          |
| PUT    | /tasks/:id        | Update task                      |
| DELETE | /tasks/:id        | Soft-delete task                 |
| PATCH  | /tasks/:id/status | Update task status               |
| POST   | /tasks/:id/share  | Share task with other users      |

---

## What You Will Learn

1. Node.js and Express basics
2. MongoDB with Mongoose
3. Request validation with Joi
4. Authentication & Authorization using JWT
5. Centralized error handling
6. Soft delete and task sharing logic
7. Sending emails with Nodemailer
8. Organizing a Node.js project with modules

---

## Repository

[Smart TODO API on GitHub](https://github.com/SamuelGerges/smart-todo.git)
``
