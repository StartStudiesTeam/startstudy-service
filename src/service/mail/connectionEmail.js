const nodemailer = require("nodemailer");
const {
  dbHost,
  dbPort,
  dbUser,
  dbPass,
} = require("../../../config/env.config");

const transport = nodemailer.createTransport({
  host: dbHost,
  port: dbPort,
  auth: {
    user: dbUser,
    pass: dbPass,
  },
});

module.exports = transport;
