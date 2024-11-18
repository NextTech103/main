const {
    Model
  } = require('sequelize');
  const bcrypt = require('bcryptjs');
  module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
      static associate(models) {
        Users.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
          foreignKey: 'adminId', // Foreign key in Orders
          as: 'admin' // Alias to be used in include
        });
      }
      // Method to hash the password
      static async hashPassword(password) {
        const saltRounds = 10; // You can adjust the salt rounds as needed
        return await bcrypt.hash(password, saltRounds);
      }
  
      // Method to compare a password with the hashed password
      static async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
      }
    }
    Users.init({
      username: {
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
          notEmpty: true,  // validate non-empty values
        },
      },
      email: {
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
          notEmpty: true,  // validate non-empty values
        },
      },
      password : {
        type: DataTypes.STRING,
          allowNull: false,  // password cannot be null
          validate: {
            len: [6, 100],  // ensures password length is between 6 and 100 characters
          },
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Admins',  // Refers to the Order table
          key: 'id'
        },
      },
    }, {
      sequelize,
      modelName: 'Users',
    });
  
    // Hook to hash the password before creating a new Users
    Users.addHook('beforeCreate', async (user) => {
      user.password = await Users.hashPassword(user.password);
    });
  
    // Hook to hash the password before updating an Users
    Users.addHook('beforeUpdate', async (user) => {
      if (user.changed('password')) {
        user.password = await Users.hashPassword(user.password);
      }
    });
    return Users;
  };