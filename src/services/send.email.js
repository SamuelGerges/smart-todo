import nodemailer from "nodemailer";

export const sendEmailService = async ({
  to = "",
  subject = "",
  textMessage = "",
  htmlMessage = "",
  attachments = [],
} = {}) => {
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 587,
    secure: false,
    auth: {
      user: "samoulgerges00@gmail.com",
      pass: "neja exrh gfla vcuc",
    },
    service: "gmail",
  });

  const info = await transporter.sendMail({
    from: "No-Reply <samoulgerges00@gmail.com>",
    to: to,
    subject: subject,
    text: textMessage,
    html: htmlMessage,
    attachments: attachments,
  });
  
  return info;
};
