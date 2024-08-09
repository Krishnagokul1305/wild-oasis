const nodemailer = require("nodemailer");

module.exports = class Mail {
  constructor(user, url) {
    this.user = user;
    this.url = url;
  }

  createTransporter() {
    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3cdee7ce347300",
        pass: "269f4524e75e06",
      },
    });
  }

  async send(subject) {
    const mailOptions = {
      from: "Maddison Foo Koch  <maddison53@ethereal.email>",
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
