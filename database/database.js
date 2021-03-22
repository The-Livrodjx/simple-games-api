const { Sequelize } = require("sequelize")

const connection = new Sequelize('games', 'root', 'your_password_here', {

    host: "localhost",
    dialect: "mysql",
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
    },
    timezone: '-3:00', // for writing to database
})

module.exports = connection 