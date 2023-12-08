const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.BROADCAST_SERVICE,
  auth: {
    user: process.env.BROADCAST_USER,
    pass: process.env.BROADCAST_APP_PASSWORD,
  },
});

module.exports = transporter;
