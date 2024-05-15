require("dotenv").config()
const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILAPPPASSWORD,
    },
  });

// Send email
const sendMailToUser =  async (userId, OTP)=>{
    // Define email options
    const mailOptions = {
        from: process.env.MAILUSER,
        to: userId,
        subject: 'Welcome to NHG Finance',
        html: `Your One time Password(OTP) is ${OTP}`
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error occurred while sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}

module.exports = {
    sendMailToUser
}