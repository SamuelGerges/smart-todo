import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as taskController from "./task.controller.js";
import { errorHandling } from "../../middleware/error-handler-middleware.js";
import { validationMiddleware } from "../../middleware/validation.js";
import { addTask, updateTask, updateTaskStatus, shareTaskSchema } from "./task.schema.js";

const router = Router();

router.post(
  "/add-task",
  auth(),
  validationMiddleware(addTask),
  errorHandling(taskController.addTask)
);

router.get("/", auth(), errorHandling(taskController.getTasks));

router.put(
  "/update-task/:taskId",
  auth(),
  validationMiddleware(updateTask),
  errorHandling(taskController.updateTask)
);

router.delete(
  "/delete-task/:taskId",
  auth(),
  errorHandling(taskController.deleteTask)
);

router.patch(
  "/update-task-status/:taskId",
  auth(),
  validationMiddleware(updateTaskStatus),
  errorHandling(taskController.updateTaskStatus)
);


router.patch(
  "/update-task-share/:taskId",
  auth(),
  validationMiddleware(shareTaskSchema),
  errorHandling(taskController.shareTask)
);

export default router;
