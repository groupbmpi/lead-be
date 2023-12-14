const { Sequelize } = require('sequelize');

require('dotenv').config();

class Database {
    constructor() {
        if (!Database.instance) {
            this.db = new Sequelize(process.env.MYSQL_DATABASE, 
                process.env.MYSQL_USER, 
                process.env.MYSQL_PASSWORD, {
                host: process.env.MYSQL_HOST,
                port: process.env.MYSQL_PORT,
                dialect: 'mysql',
                pool: {
                    max: 5, // maximum number of connections in the pool
                    min: 0, // minimum number of connections in the pool
                    acquire: 30000, // maximum time, in milliseconds, that a connection can be idle before being released
                    idle: 10000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
                },
            });
            Database.instance = this;
        }
        return Database.instance;
    }

    // Method to get the database instance
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    // Method to get the Sequelize instance
    getSequelizeInstance() {
        return this.db;
    }

    // Method to close the database connection
    closeConnection() {
        this.db.close();
    }
}

module.exports = {
    Database
};
