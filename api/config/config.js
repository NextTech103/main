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
    "username": "avnadmin",
    "password": process.env.db_password,
    "database": "nextcommerze",
    "host": "mysql-1032072a-arfinhayet786-cba6.j.aivencloud.com",
    "port": 13826,
    "dialect": "mysql"
  }
}
