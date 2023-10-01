const { DataTypes } = require('sequelize')
const sequelize = require('../connection/connection')

const Categorias = sequelize.define('Categorias', {
  idCategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categorias',
  timestamps: false
})

module.exports = Categorias