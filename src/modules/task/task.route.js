import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as taskController from "./task.controller.js";
import { errorHandling } from "../../middleware/error-handler-middleware.js";
import { validationMiddleware } from "../../middleware/validation.js";
import { addTask } from "./task.schema.js";

const router = Router();

router.post(
  "/add-task",
  auth(),
  validationMiddleware(addTask),
  errorHandling(taskController.addTask)
);

router.get("/", auth(), errorHandling(taskController.getTasks));

export default router;
