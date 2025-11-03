import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ErrorHandlerClass } from "../utils/error-handler.js";

export const auth = () => {
  return async (req, res, next) => {
    try {
      // Get token from authorization header
      const token = req.headers.authorization;

      if (!token) {
        return next(
          new ErrorHandlerClass(
            401,
            "Failed Sign In",
            "Please sign in first — no token provided",
            "auth middleware"
          )
        );
      }

      if (!token.startsWith("Bearer ")) {
        return next(
          new ErrorHandlerClass(
            401,
            "Invalid Token",
            "Authorization token must start with 'Bearer '",
            "auth middleware"
          )
        );
      }

      const originalToken = token.split(" ")[1];

      let decodedData;
      try {
        decodedData = jwt.verify(originalToken, process.env.JWT_SECRET_KEY);
      } catch (error) {
        return next(
          new ErrorHandlerClass(
            401,
            "Invalid Token",
            "Token verification failed or expired",
            "auth middleware"
          )
        );
      }

      if (!decodedData?.userId) {
        return next(
          new ErrorHandlerClass(
            401,
            "Invalid Token",
            "Token does not contain valid user data",
            "auth middleware"
          )
        );
      }

      const user = await User.findById(decodedData.userId).select(
        "-password -__v"
      );

      if (!user) {
        return next(
          new ErrorHandlerClass(
            401,
            "User Not Found",
            "Please sign up and then log in",
            "auth middleware"
          )
        );
      }

      req.authUser = user;
      next();
    } catch (error) {
      next(
        new ErrorHandlerClass(
          500,
          "Internal Server Error",
          error.message,
          "auth middleware"
        )
      );
    }
  };
};
