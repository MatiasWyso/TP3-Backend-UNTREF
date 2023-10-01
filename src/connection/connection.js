// Importamos Sequelize
const { Sequelize } = require('sequelize')

// Cadena de conexión
const DB_URI = `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

// Instanciamos Sequelize
const sequelize = new Sequelize(DB_URI)

// Exportamos sequelize
module.exports = sequelize