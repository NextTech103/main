const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SiteInfo extends Model {
        static associate(models) {
            // define association here
            SiteInfo.belongsTo(models.Admin, { // Ensure 'Users' is imported correctly
              foreignKey: 'adminId', // Foreign key in Orders
              as: 'admin' // Alias to be used in include
            });
          }
    }

    SiteInfo.init({
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          siteTitle: {
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
          },
          siteIcon: {
            type: Sequelize.STRING,
            allowNull:false,
            validate: {
                notEmpty: true
            }
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
        modelName: 'SiteInfo',
        hooks: {
            beforeCreate: (SiteInfo, options) => {
              SiteInfo.expires_in = new Date(Date.now() + 5 * 60 * 1000); // Set to 5 minutes from now
            },
          },
      })
      return SiteInfo;
}
  