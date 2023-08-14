const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'kartikmehtatest@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function sendMailToUser(fromEmail, ToEmail, message) {
  let mailOptions = {
    from: fromEmail,
    to: ToEmail,
    subject: 'There is a new message for you, from ' + fromEmail,
    text: message,
    html: '',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = {
  sendMailToUser,
};
