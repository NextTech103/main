const nodemailer = require('nodemailer');
const nodemailerDkim = require('nodemailer-dkim');
const AppError = require('../utils/app-error'); // Assuming you have this for error handling
const fs = require('fs');
const path = require('path');

class EmailService {
  constructor() {
    // Create the transporter using SMTP server details or a service like Gmail
    this.transporter = nodemailer.createTransport({
        host: 'mail.accessories-bazar.com',
        port: 465, // or 465 for SSL
        secure: true, // true for port 465, false for other ports
        auth: {
          user: 'info@accessories-bazar.com',
          pass: 'Tt123#123#Abc',
        },
        pool: true, // Enable connection pooling for faster delivery
        maxConnections: 5, // Maintain up to 5 parallel connections to the server
        maxMessages: 100, // Limit of 100 messages per connection
        rateLimit: 10, // Max of 10 messages per second
      });


      // Attach DKIM signing (optional, but recommended for email authentication)
        // this.dkimPrivateKey = fs.readFileSync('./dkim.pem', 'utf8');
        // this.dkimSelector = 'default';
        // this.dkimDomain = 'accessories-bazar.com';

        this.transporter.use('stream', nodemailerDkim.signer({
        domainName: this.dkimDomain,
        keySelector: this.dkimSelector,
        privateKey: this.dkimPrivateKey,
        }));
  }

  async sendMail( to, subject, text, html ) {
    const mailOptions = {
      from:'info@accessories-bazar.com', // Your email
      to, // Recipient's email
      subject, // Email subject
      text, // Plain text body (optional)
      html, // HTML body (optional)
    };

    try {
      // Send the email
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      throw new AppError('Error sending email: ' + error.message, 500);
    }
  }
}

module.exports = new EmailService();
