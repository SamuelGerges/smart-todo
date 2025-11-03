import { ErrorHandlerClass } from "../utils/error-handler.js";

// api => endpoint
export const errorHandling = (api) => {
  return (req, res, next) => {
    api(req, res, next).catch((error) => {
      const inSights = {
        error: "unhandled error",
      };
      next(
        new ErrorHandlerClass(
          500,
          "Internal server Error from error handling middleware",
          error.stack,
          "ErrorHandlerClass",
          inSights
        )
      );
    });
  };
};

export const globalErrorHandlingMiddleware = (error, req, res, next) => {
  if (error) {
    res.status(error["statusCode"] || 400).json({
      message: "Error",
      error: error?.message || "",
      stack: error?.stack,
      errPosition: error?.name || "",
      data: error?.data || {},
    });
  }
};
