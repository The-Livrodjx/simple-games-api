const {Sequelize} = require("sequelize")

const connection = require("../database/database")

const Games = connection.define("games", {

  title: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
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

Games.sync({force: false}).then(() => console.log("Tabela Games criada"))
module.exports = Games