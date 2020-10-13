const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "50aee5934d70e4",
    pass: "2b802d72591b42",
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve("./mail/"),
    extName: ".html",
  })
);
module.exports = transport;
