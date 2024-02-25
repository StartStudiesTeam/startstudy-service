const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  auth: {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
  },
});

module.exports = transport;
