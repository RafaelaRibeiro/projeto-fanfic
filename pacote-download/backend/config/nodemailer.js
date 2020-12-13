const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

// const transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "50aee5934d70e4",
//     pass: "2b802d72591b42",
//   },
// });

const transport = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.HOST,
  auth: {
    user: process.env.SES_ACCESS_KEY_ID,
    pass: process.env.SES_SECRET_ACCESS_KEY,
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".hbs",
      layoutsDir: path.resolve("./mail/"),
      defaultLayout: null,
    },
    viewPath: path.resolve("./mail/"),
    extName: ".hbs",
    defaultLayout: false,


  })
);
module.exports = transport;
