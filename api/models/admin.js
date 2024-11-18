const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
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
  Admin.init({
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
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });

  // Hook to hash the password before creating a new Admin
  Admin.addHook('beforeCreate', async (admin) => {
    admin.password = await Admin.hashPassword(admin.password);
  });

  // Hook to hash the password before updating an Admin
  Admin.addHook('beforeUpdate', async (admin) => {
    if (admin.changed('password')) {
      admin.password = await Admin.hashPassword(admin.password);
    }
  });
  return Admin;
};