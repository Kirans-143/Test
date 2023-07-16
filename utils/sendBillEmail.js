const nodemailer = require('nodemailer');

module.exports = (email, bill) => {
  // Configure a nodemailer transporter (update with your own SMTP details)
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@example.com',
      pass: 'your-password',
    },
  });

  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Bill Generated',
    text: `Dear user, your bill has been generated. Total amount: $${bill.total_amount}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
