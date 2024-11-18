const { Admin } = require('../models');
const { sequelize } = require('../models');
const _ = require('lodash');
const jwt = require('jsonwebtoken')
const emailSender = require('../services/email-sender.service')
const { Sequelize } = require('sequelize');
const db = require('../models'); // Import your models (for the Sequelize instance)
const queryInterface = db.sequelize.getQueryInterface();
const EncryptionService = require('../utils/encrypt-dcrypt')
class AuthController {
    async adminRegister(req, res) {
        const { username, email, password } = req.body;
        
          const existingUser = await Admin.findOne({ where: { email } });
          if (existingUser) {
            return res.status(400).json({ message: 'Email already exists', payload: null, success: false });
          }
          const newUser = await Admin.create({ username, email, password });
          res.status(201).json({ message: 'User registered successfully', payload: { user : newUser}, success: true });
    }


    async validateToken(req, res) {
      return res.status(200).json({ message: 'Token is valid', playload : null, success: true });
    }


    async adminLogin(req, res) {
      const encryptionService = new EncryptionService()
      const { email, password } = req.body;
        const user = await Admin.findOne({ where: { email } });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password', playload : null, success: false });
        }
        const isPasswordValid = await Admin.comparePasswords(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password', playload : null, success: false });
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

        const adminKey = encryptionService.encrypt(user.id.toString())
        const userWithoutPassword = _.omit(user.toJSON(), 'password');
        console.log(userWithoutPassword)
        res.status(200).json({ message: 'Login successful', payload: { user: userWithoutPassword, token: token, adminKey : adminKey}, success: true });
    }


    async adminInfo(req, res){
      const user = await Admin.findByPk(req.params.id)
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password', playload : null, success: false });
      }
      const userWithoutPassword = _.omit(user.toJSON(), 'password');
      res.status(200).json({ message: 'Admin information found', payload : {user:userWithoutPassword}, success: true });
    }
   
    
    async updateAdminInfo(req, res){
      const adminInfo = await Admin.update(req.body,{
        where: { id: req.params.id },
        individualHooks: true,
    })
      res.status(200).json({ message: 'Admin information update', playload : {user : adminInfo}, success: true });
 
    }

    async SendMail(req,res){
      const to = 'arfin.primetech@gmail.com';
      const subject = 'Welcome To Accessories Buzar';
      const text = 'Dear Concern , welcome to our platform';
      const html = '<h1>Dear Concern , welcome to our platform</h1>';
      await emailSender.sendMail(to, subject, text, html);
    }


    async runMigration(req, res) {
      try {
          // Add userId column to the Ratings table
          await queryInterface.addConstraint('Ratings', {
              fields: ['userId'],
              type: 'foreign key',
              references: {
                table: 'Users',
                field: 'id',
              }
          });

          // Add userId column to the OrderItems table
          await queryInterface.addColumn('OrderItems', 'userId', {
              type: Sequelize.INTEGER,
              allowNull: false,
              validate: {
                  notEmpty: true,
              },
          });

          // Return success response
          res.status(200).json({
              message: 'Migration successfully executed and columns added.',
          });
      } catch (error) {
          console.error('Error running migration:', error);
          res.status(500).json({
              message: 'Error occurred while running migration.',
              error: error.message,
          });
      }
    }
    
}

module.exports = new AuthController();