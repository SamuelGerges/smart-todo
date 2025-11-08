# Smart TODO API

A small TODO API built with **Node.js, Express, and MongoDB**.  
Users can sign up, sign in, verify their email, and manage tasks.  
Tasks can have a title, description, status, priority, due date, and can be shared with other users.  
This project focuses on structured code, validation, authentication, and error handling.

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
│   └── sendEmail.js      # Service for sending emails
└── utils/
    └── error-handler.js  # Custom error class and helpers
```

---

## Features

### 1. User Management
- Sign up with validation
- Sign in with JWT authentication
- Email verification for new users
- Secure password storage using bcrypt

### 2. Task Management
- Create, read, update, delete tasks (**soft delete implemented**)
- Update task **status** (`pending`, `in-progress`, `completed`)
- Set task **priority** (`low`, `medium`, `high`)
- Add optional **due date**
- **Share tasks** with other users by their IDs
- Tasks are linked to the owner (user)

### 3. Validation & Error Handling
- Request validation using **Joi** schemas
- Centralized error handling for all routes
- Proper error messages for invalid inputs

### 4. Email Service
- Send verification emails during signup

### 5. Authentication
- JWT-based authentication
- Middleware for protected routes
- Users can only access their own tasks or shared tasks

---

## Environment Variables

Create a `.env` file with:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/smart-todo
JWT_SECRET_KEY=your_jwt_secret
EMAIL_HOST=smtp.example.com
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

---

## Installation

```bash
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

## Routes Overview

### User Routes
| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| POST   | /users/sign-up           | Register new user            |
| POST   | /users/sign-in           | Sign in existing user        |
| GET    | /users/verify-email/:token | Verify user email           |

### Task Routes
| Method | Endpoint                     | Description                        |
|--------|------------------------------|------------------------------------|
| GET    | /tasks                       | Get all tasks for logged-in user   |
| POST   | /tasks                       | Create new task                     |
| GET    | /tasks/:id                    | Get a single task by ID             |
| PUT    | /tasks/:id                    | Update task                         |
| DELETE | /tasks/:id                    | Soft-delete task                     |
| PATCH  | /tasks/:id/status             | Update task status                  |
| POST   | /tasks/:id/share              | Share task with other users         |

---

## What You Will Learn

1. **Node.js and Express basics**  
   - Modular routes, controllers, and middleware  

2. **MongoDB with Mongoose**  
   - Schemas, models, references, and query methods  

3. **Validation**  
   - Using Joi to validate requests  

4. **Authentication & Authorization**  
   - JWT tokens, middleware protection, user access  

5. **Error handling**  
   - Centralized error approach for consistent responses  

6. **Soft delete and task sharing logic**  
   - Update documents instead of removing them  

7. **Email integration**  
   - Sending verification emails  

8. **Project organization**  
   - Separation of concerns, modules per entity

---

This README documents the **project structure, features, environment setup, routes, and learning outcomes** in a simple, clear way for beginners.

