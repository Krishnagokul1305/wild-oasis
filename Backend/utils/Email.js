const nodemailer = require("nodemailer");

module.exports = class Mail {
  constructor(user, url) {
    this.user = user;
    this.url = url;
  }

  createTransporter() {
    return nodemailer.createTransport({
      host: "smtp.mailersend.net",
      port: 587,
      auth: {
        user: "MS_W3M6Zu@trial-pr9084znjqj4w63d.mlsender.net",
        pass: "4YhBJxM1YSpDLFk4",
      },
    });
  }

  async send(subject) {
    const mailOptions = {
      from: "wild-oasis  <gokulakrishnan.ec22@bitsathy.ac.in>",
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
