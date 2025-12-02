const nodeMailer = require("nodemailer");
const APIError = require("./errors");

const sendEmail = async (mailOptions) => {
  const transporter = await nodeMailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred while sending email:", error);
      throw new APIError("Mail gönderilirken bir hata oluştu")
    }
    console.log("info :", info);
    return true;
  });
};

module.exports = sendEmail;
