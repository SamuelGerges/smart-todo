import Joi from "joi";

export const signUpSchema = {
  body: Joi.object({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string()
      .email({
        minDomainSegments: 1,
        tlds: { allow: ["com", "net"] },
        maxDomainSegments: 3,
      })
      .required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    gender: Joi.string().valid("male", "female").required(),
  }),
};
