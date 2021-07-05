const nodemailer = require("nodemailer");
const {
  SES_ACCESS_KEY_ID,
  SES_SECRET_ACCESS_KEY,
  HOST,
  PORT,
} = require("../.env");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");


const transport = nodemailer.createTransport({
  host: HOST,
  port: PORT,
  auth: {
    user: SES_ACCESS_KEY_ID,
    pass: SES_SECRET_ACCESS_KEY,
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
