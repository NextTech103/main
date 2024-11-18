const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Otp extends Model {
        static associate(models) {
            // define association here
            Otp.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
              foreignKey: 'adminId', // Foreign key in Orders
              as: 'admin' // Alias to be used in include
            });
          }
    }

    Otp.init({
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          otpCode: {
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
          },
          email: {
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
          },
          expires_in: {
            type: DataTypes.DATE, // Assuming you are using a DATE type for expires_in
            allowNull: false,
            defaultValue: sequelize.fn('NOW'), // Set default value to the current time
          },
          adminId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Admins',  // Refers to the Order table
              key: 'id'
            },
          },
          
    },{
        sequelize,
        modelName: 'Otp',
        hooks: {
            beforeCreate: (otp, options) => {
              otp.expires_in = new Date(Date.now() + 5 * 60 * 1000); // Set to 5 minutes from now
            },
          },
      })
      return Otp;
}
  