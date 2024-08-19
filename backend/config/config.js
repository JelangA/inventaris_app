const fs = require('fs');
require("dotenv").config(); // Load .env file
//import fs


module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME, // Use DB_NAME for development
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT
    },
    "test": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_TEST_NAME, // Use DB_TEST_NAME for test
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT
    },
    "production": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_PROD_NAME, // Use DB_PROD_NAME for production
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT
    }
};
