# Smart TODO API

A small TODO API built with Node.js and Express. It includes user signup, email verification, validation middleware, and centralized error handling.

## Project structure (key files)

- `src/app.js` - Express app bootstrap and middleware mounting
- `src/server.js` - Server entrypoint (starts the app)
- `src/modules/user/` - User module (controller, route, schema)
- `src/middleware/validation.js` - Request validation middleware
- `src/middleware/error-handler-middleware.js` - Route-level error wrapper
- `src/utils/error-handler.js` - Error class and helpers
- `src/models/` - Mongoose models (User, Task)

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or remote)

## Environment variables

Create a `.env` file at the project root with at least the following:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/smart-todo
JWT_SECRET_KEY=your_jwt_secret
# add email service credentials if used by send.email service
```

## Install

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

This runs the app with `nodemon` and will watch for file changes.

## Available scripts

Check `package.json` for the exact scripts. At minimum the repo includes `dev` which starts the app.

## Routes (quick reference)

- `GET /` - test route that returns a welcome message
- `POST /users/sign-up` - register a new user (validation middleware applies)
- `POST /users/sign-in` - sign in an existing user
- `GET /users/verify-email/:token` - verify a user's email using token

Note: user routes are mounted at `/users` in `src/app.js`. So `/sign-up` in the router becomes `/users/sign-up` when mounted.

## Example: signup request

```bash
curl -X POST http://localhost:3000/users/sign-up \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret","gender":"female"}'
```

## Validation & Error handling

- Request validation is done in `src/middleware/validation.js` using the schemas in each module (e.g., `user.schema.js`).
- Route handlers are wrapped with a route-level error handler (`errorHandling`) and there is a global error handler mounted in `app.js`.

## Troubleshooting

- If the server crashes with a `PathError` mentioning `Missing parameter name at index`, this usually means a router method (like `router.post`) received a function as the first argument instead of a path string. Make sure you register routes like:

```js
// correct
router.post('/sign-up', validationMiddleware(signUpSchema), errorHandling(signUp));

// incorrect - this will crash path-to-regexp
// router.post(validationMiddleware(signUpSchema), errorHandling(signUp));
```

- If JSON body parsing fails, ensure `app.use(express.json())` is used (note the parentheses).

## Tests

No automated tests included by default. Adding a couple of unit/integration tests for the signup flow and validation would be recommended.

## Next steps / suggestions

- Add automated tests (Jest + supertest) for user routes
- Add ESLint rule or a code review checklist to prevent accidentally passing middleware as a route path
- Add Postman or OpenAPI spec for easier API exploration

---

If you want, I can also:
- Add a minimal OpenAPI spec or Postman collection
- Add a simple integration test for `POST /users/sign-up`

