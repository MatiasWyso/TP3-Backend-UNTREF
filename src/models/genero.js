const { DataTypes } = require('sequelize')
const sequelize = require('../connection/connection')

const Genero = sequelize.define('Genero', {
  idGenero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'genero',
  timestamps: false
})

module.exports = Genero