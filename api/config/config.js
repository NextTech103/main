require('dotenv').config();
module.exports = {
  "development": {
    "username": "avnadmin",
    "password": process.env.db_password,
    "database": "nextcommerze",
    "host": "mysql-1032072a-arfinhayet786-cba6.j.aivencloud.com",
    "port": 13826,
    "dialect": "mysql"
  },
  "test": {
    "username": "avnadmin",
    "password": process.env.db_password,
    "database": "nextcommerze",
    "host": "mysql-1032072a-arfinhayet786-cba6.j.aivencloud.com",
    "port": 13826,
    "dialect": "mysql"
  },
  "production": {
    "username": "accesso3_bazar",
    "password": "Tt123#123#Abc",
    "database": "accesso3_bazar",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql"
  }
}
