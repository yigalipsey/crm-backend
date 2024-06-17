import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

export const SendEmail = async (data) => {
  try {
    if (!data?.email || !data?.subject || !data?.text)
      return {
        err: true,
        msg: "The parameters must be entered: email + subject + text",
      };
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: `${data.email}`,
      subject: `${data.subject}`,
      text: `${data.text}`,
    };

    const info = await transporter.sendMail(mailOptions);
    return { err: false, msg: info.response };
  } catch (error) {
    return { err: true, msg: error.message };
  }
};
