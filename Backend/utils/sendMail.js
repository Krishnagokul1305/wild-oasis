const nodeMailer = require("nodemailer");

const sendMail = async (options) => {
  console.log("mailtrap entered");
  const transporter = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3cdee7ce347300",
      pass: "269f4524e75e06",
    },
  });
  const mailOptions = {
    from: "gokul <krishnagokul1729@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
