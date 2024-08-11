const nodemailer = require("nodemailer");

module.exports = class Mail {
  constructor(user, url) {
    this.user = user;
    this.url = url;
  }

  createTransporter() {
    return nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: 587,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  async send(subject) {
    const mailOptions = {
      from: "wild-oasis <your-verified-email@example.com>",
      to: this.user.email,
      subject,
      text: `reset url : ${this.url}`,
    };

    await this.createTransporter().sendMail(mailOptions);
  }

  async sendForgotPassword() {
    await this.send("forgot password");
  }
};
