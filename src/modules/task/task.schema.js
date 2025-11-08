import Joi from "joi";

export const addTask = {
  body: Joi.object({
    title: Joi.string().required().min(3).max(30),
    description: Joi.string().allow("", null),
    status: Joi.string()
      .valid("pending", "in-progress", "completed")
      .default("pending"),
    priority: Joi.string().valid("low", "medium", "high").default("medium"),
    dueDate: Joi.date().optional(),
  }),
};

export const updateTask = {
  body: Joi.object({
    title: Joi.string().min(3).max(30).optional(),
    description: Joi.string().allow("", null).optional(),
    dueDate: Joi.date().optional(),
  })
    .min(1)
    .messages({
      "object.min": "You must provide at least one field to update.",
    }),
};

export const updateTaskStatus = {
  body: Joi.object({
    status: Joi.string()
      .valid("pending", "in-progress", "completed")
      .default("pending"),
  })
    .min(1)
    .max(1)
    .messages({
      "object.min": "You must provide at least one field to update.",
    }),
};

export const shareTaskSchema = {
  body: Joi.object({
    sharedWith: Joi.array()
      .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)) // MongoDB ObjectId format
      .required()
      .messages({
        "array.base": "sharedWith must be an array",
        "array.min": "You must share the task with at least one user",
        "string.pattern.base": "Each user ID must be a valid Mongo ID",
        "any.required": "sharedWith is required",
      }),
  }).unknown(false),
};
