const { Users } = require('../models');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/app-error');
const { Otp } = require('../models');
const emailSender = require('../services/email-sender.service');
const { where } = require('sequelize');
class UserController {
    async userRegister(req, res) {
        const { username, email, password } = req.body;
          const existingUser = await Users.findOne({ where: { email: email, adminId : req.adminId } });
          if (existingUser) {
            return res.status(400).json({ message: 'Email already exists', payload: null, success: false });
          }
          const adminId = req.adminId
          const newUser = await Users.create({ username, email, password, adminId });
          // Generate JWT token
        const token = jwt.sign(
          {
            id: newUser.id, // Or any other user details you want to include in the token payload
            email: newUser.email,
          },
          'secretkey123', // Use a secret key stored in your environment variables
          { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
        );
          res.status(201).json({ message: 'User registered successfully', payload: { user : newUser, token : token}, success: true });
    }
    async userLogin(req, res) {
      const { email, password } = req.body;

        const user = await Users.findOne({ where: { email: email, adminId : req.adminId } });
        if (!user) {
          return res.status(200).json({ message: 'Invalid email or password', playload : null, success: false });
        }
        const isPasswordValid = await Users.comparePasswords(password, user.password);
        if (!isPasswordValid) {
          return res.status(200).json({ message: 'Invalid email or password', playload : null, success: false });
        }

        // Generate JWT token
        const token = jwt.sign(
          {
            id: user.id, // Or any other user details you want to include in the token payload
            email: user.email,
          },
          'secretkey123', // Use a secret key stored in your environment variables
          { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
        );
        const userWithoutPassword = _.omit(user.toJSON(), 'password');
        console.log(userWithoutPassword)
        res.status(200).json({ message: 'Login successful', payload: { user: userWithoutPassword, token: token}, success: true });
    }

    async userInfo(req,res){
      const {id} = req.params
      const userInfo = await Users.findOne({ where: { id } });
      res.status(200).json({ message: 'Got user info', payload: { user: userInfo }, success: true });
    }


    async emailVerifyAndSendOtp(req, res, next){
      const { email } = req.query
      const today = new Date();  // Create a new Date object
      const year = today.getFullYear();  // Get the current year
      const userInfo = await Users.findOne({ where: { email: email, adminId : req.adminId } });
      if(!userInfo){
        return next(new AppError('No user information found',401))
      }
      const otpCode = Math.floor(1000 + Math.random() * 9000);
      await Otp.create({email,otpCode})


      const subject = 'Welcome To Accessories Bazar';
      const textContent = `
      Subject: Your OTP Code
      
      Dear User,
      
      We received a request to verify your account. Please use the following OTP code to complete your verification:
      
      OTP Code: ${otpCode}
      
      This code is valid for 5 minutes. If you did not request this code, please ignore this email.
      
      Thank you for using our service!
      
      Best regards,
      Your Company
      
      © ${year} Your Company. All rights reserved.
      Visit our website: https://yourwebsite.com
      `;
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP Verification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f7f7f7;
                  margin: 0;
                  padding: 20px;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 5px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  padding: 20px;
              }
              .header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .header h1 {
                  color: #333;
              }
              .content {
                  margin-bottom: 20px;
              }
              .otp-code {
                  font-size: 24px;
                  font-weight: bold;
                  color: #007bff;
                  padding: 10px;
                  background-color: #e9ecef;
                  border-radius: 5px;
                  text-align: center;
              }
              .footer {
                  text-align: center;
                  font-size: 14px;
                  color: #666;
              }
              .footer a {
                  color: #007bff;
                  text-decoration: none;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>OTP Verification</h1>
              </div>
              <div class="content">
                  <p>Dear User,</p>
                  <p>We received a request to verify your account. Please use the following OTP code to complete your verification:</p>
                  <div class="otp-code">${otpCode}</div>
                  <p>This code is valid for 5 minutes. If you did not request this code, please ignore this email.</p>
              </div>
              <div class="footer">
                  <p>Thank you for using our service!</p>
                  <p>&copy; ${year} Accessories Bazar. All rights reserved.</p>
                  <p><a href="https://yourwebsite.com">Visit our website</a></p>
              </div>
          </div>
      </body>
      </html>
    `;

      await emailSender.sendMail(email, subject, textContent, htmlContent)
      res.status(200).json({ message: 'A verification code is sent to your email. Check spam folder if you do not find the email.', payload: null , success: true });
   }


   async otpVerify(req, res, next) {
    try {
      const { email, otpCode } = req.body;
  
      // Find the OTP using email and otpCode
      const existingOtp = await Otp.findOne({ where : { email, otpCode }});
      if (!existingOtp) {
        return next(new AppError('Invalid OTP Code', 400));
      }

      // Get current time to check OTP expiration
      const currentTime = Date.now();
  
      // Check if OTP has expired
      if (existingOtp.expires_in < currentTime) {
        return next(new AppError('OTP expired', 400));
      }
  
      // Find the user by email
      const userInfo = await Users.findOne({ email });
      if (!userInfo) {
        return next(new AppError('No user found', 404));
      }


      const userWithoutPassword = _.omit(userInfo.toJSON(), 'password');
      // Generate JWT token
      const token = jwt.sign(
        {
          id: userInfo._id, // Include user ID in the token payload
          email: userInfo.email,
        },
        process.env.JWT_SECRET || 'secretkey123', // Use environment variable for secret key
        { expiresIn: '1h' } // Token expiration time
      );
  
      // Send response
      res.status(200).json({
        message: 'OTP verified successfully',
        payload: {
          user: userWithoutPassword, // Corrected user reference
          token: token,
        },
        success: true,
      });
    } catch (err) {
      // Handle unexpected errors
      next(new AppError('Something went wrong', 500));
    }
  }



  async changePassword(req, res, next) {
    const { email, currentPassword, newPassword, confirmPassword } = req.body;
    // Check if new password matches confirmation
    if (newPassword !== confirmPassword) {
      return next(new AppError('New password and confirm password do not match', 400));
    }
    // Find the user by email
    const userInfo = await Users.findOne({ where: { email: email, adminId: req.adminId } });
    if (!userInfo) {
      return next(new AppError('User not found', 404));
    }
    // Check if the current password is correct using the comparePasswords method
    const isPasswordCorrect = await Users.comparePasswords(currentPassword, userInfo.password);
    if (!isPasswordCorrect) {
      return next(new AppError('Current password is incorrect', 400));
    }
  
    // Hash the new password using the hashPassword method
    // const hashedNewPassword = await Users.hashPassword(newPassword);
  
    // Update the user's password
    userInfo.password = newPassword;
    await userInfo.save(); // Save the updated user object
  
    res.status(200).json({message: 'Password updated successfully',payload: null, success: true,});
  }
  
  
    
}

module.exports = new UserController();