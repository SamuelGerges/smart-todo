import express from "express";
import { globalErrorHandlingMiddleware } from "./middleware/error-handler-middleware.js";
import userRoute from "./modules/user/user.route.js";
import taskRoute from "./modules/task/task.route.js";

const app = express();
// express.json is a middleware factory, call it
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the TODO API 🚀" });
});

// Mount user routes under /users
app.use('/users', userRoute);
app.use('/tasks', taskRoute);
app.use(globalErrorHandlingMiddleware);

export default app;
