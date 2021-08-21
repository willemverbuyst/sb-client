const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: 'Admin SportBettingApp <info@sportbettingapp.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };
  // Send email with Nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
