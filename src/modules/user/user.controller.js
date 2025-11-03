import User from "../../models/user.model.js";
import { ErrorHandlerClass } from "../../utils/error-handler.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmailService } from "../../services/send.email.js";

export const signUp = async (req, res, next) => {
  const { name, email, password, gender } = req.body;

  const existingUser = await User.findOne({
    email: email,
  });

  if (existingUser) {
    next(
      new ErrorHandlerClass(
        "409",
        "Email already exists",
        "Email already exists",
        "signUp function",
        { email: email }
      )
    );
  }

  const hashedPassword = hashSync(password, 10);
  const user = new User({
    name: name,
    email: email,
    password: password,
    gender: gender,
  });

  // generate token for userId in the verification email
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  const verificationEmail = `${req.protocol}://${req.headers.host}/users/verify-email/${token}`;

  // send welcome email
  const isSentEmail = await sendEmailService({
    to: email,
    subject: "Verification Email For NoteApp",
    textMessage: `Hello ${name},\n\nThank you for signing up! We're excited to have you on board.\n\nBest regards,\nThe Team`,
    htmlMessage: `<a href="${verificationEmail}">please verify your email address!</a>`,
  });

  if (isSentEmail.rejected.length) {
    next(
      new ErrorHandlerClass(
        "500",
        "Failed to send verification email",
        "Failed to send verification email",
        "signUp function",
        { email: email }
      )
    );
  }
  const userSaved = await user.save();
  res.status(201).json({ message: "User created successfully", userSaved });
};

export const verifyEmail = async (req, res, next) => {
  const { token } = req.params;

  const dataDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findOneAndUpdate(
    { _id: dataDecoded?.userId, isConfirmed: false },
    { isConfirmed: true },
    { new: true }
  );

  if (!user) {
    next(
      new ErrorHandlerClass(
        404,
        "Verify email failed",
        "User not found",
        "verifyEmail function"
      )
    );
  }

  return res.status(200).json({ message: "Email verified successfully", user });
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email,
    isConfirmed: true
  });


  if (!user) {
    next(
      new ErrorHandlerClass(
        404,
        "Authentication failed",
        "User not found",
        "signin function"
      )
    );
  }

  const isPasswordMatch = compareSync(password, user.password);

  if (!isPasswordMatch) {
    next(
      new ErrorHandlerClass(
        404,
        "Authentication failed",
        "email and password not correct",
        "signin function"
      )
    );
  }

  const token = jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  return res
    .status(200)
    .json({ message: "User signed in successfully", user, token });
};
