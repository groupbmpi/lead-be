// Import nodemailer
const nodemailer = require('nodemailer');
const { successResponse, errorResponse } = require('../utils/responseBuilder');

// 1.2 Peserta akan mendapatkan notifikasi dari email terkait jawaban yang telah disubmit pada form pendaftaran yang telah diisi
const sendRegistrationConfirmation = (req, res) => {
  // Get the participant's email from the request body
  const { email } = req.body;

  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      password: process.env.EMAIL_PASSWORD
    }
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'Registration Confirmation',
    html: `
      <style>
        body { font-family: sans-serif; }
        h1 { font-size: 20px; font-weight: bold; margin-top: 0; }
        p { margin-bottom: 10px; }
        .container { width: 500px; margin: 0 auto; }
        .footer { text-align: center; }
      </style>
    
      <body>
        <div class="container">
          <h1>Pendaftaran Berhasil</h1>
          <p>Terima kasih telah mendaftar.</p>
          <p>Jawaban Anda telah kami terima. Kami akan segera menghubungi Anda untuk proses selanjutnya.</p>
          <p class="footer">Salam,</p>
          <p class="footer">Bakrie Center Foundation</p>
        </div>
      </body>`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json(errorResponse(500, 'Failed to send email notification', error));
    } else {
      console.log('Email sent:', info.response);
      return res.json(successResponse(200, 'Email notification sent successfully'));
    }
  });
};

// 1.3 Peserta akan mendapatkan update proses seleksi melalui email yang sudah dicantumkan
const sendSelectionProcessUpdate = (email, status) => {
  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      password: process.env.EMAIL_PASSWORD
    }
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: 'Selection Process Update',
    html: `
      <style>
        body { font-family: sans-serif; }
        h1 { font-size: 20px; font-weight: bold; margin-top: 0; }
        p { margin-bottom: 10px; }
        .container { width: 500px; margin: 0 auto; }
        .footer { text-align: center; }
      </style>
    
      <body>
        <div class="container">
          <h1>Update Proses Seleksi</h1>
          <p>Anda telah ${status} ke tahap selanjutnya.</p>
          <p>Terima kasih atas partisipasi Anda.</p>
          <p class="footer">Salam,</p>
          <p class="footer">Bakrie Center Foundation</p>
        </div>
      </body>`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendRegistrationConfirmation, sendSelectionProcessUpdate };
