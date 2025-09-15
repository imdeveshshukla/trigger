import nodemailer from "nodemailer" ;
import dotenv from 'dotenv'
dotenv.config();

interface emailTemplate{
  to:string,
  subject:string,
  body:string
}
export default async function sendEmail({to,subject,body}:emailTemplate){
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });
    let mailOptions = {
      to,
      subject,
      html: `<p>${body}</p>`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log({ message: "Error sending email", error });
      }
    });
}