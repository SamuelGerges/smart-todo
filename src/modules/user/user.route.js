import { Router } from 'express';
import * as userController from "./user.controller.js";
import { errorHandling } from "../../middleware/error-handler-middleware.js";
import { validationMiddleware } from "../../middleware/validation.js";
import { signUpSchema} from "./user.schema.js";


const router = Router();

router.post(
  '/sign-up',
  validationMiddleware(signUpSchema),
  errorHandling(userController.signUp)
);

router.get('/verify-email/:token', errorHandling(userController.verifyEmail));

router.post(
  '/sign-in', 
  errorHandling(userController.signIn)
)

export default router;