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
