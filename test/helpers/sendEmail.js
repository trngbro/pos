const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: subject,
      html: text,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve('Email sent successfully');
        }
      });
    });
  } catch (error) {
    console.error("email not sent");
    console.error(error);
    throw error; // Re-throw lỗi để bên ngoài có thể xử lý nếu cần
  }
};

module.exports = sendEmail;