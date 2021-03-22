const {Sequelize} = require("sequelize")


const connection = require("../database/database")


const Users = connection.define("users", {

    email: {
        allowNull: false,
        type: Sequelize.STRING
    },

    password: {
        allowNull: false,
        type: Sequelize.STRING   
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE  
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    

})

Users.sync({force: false}).then(() => console.log("Tabela Users criada com sucesso"))

module.exports = Users