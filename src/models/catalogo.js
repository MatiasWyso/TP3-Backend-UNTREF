const { DataTypes } = require('sequelize')
const sequelize = require('../connection/connection')

const Catalogo = sequelize.define('Catalogo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  generos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resumen: {
    type: DataTypes.STRING
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  temporadas: {
    type: DataTypes.STRING
  },
  reparto: {
    type: DataTypes.STRING
  },
  trailer: {
    type: DataTypes.STRING
  },
}, {
  tableName: 'vista_catalogo',
  timestamps: false
})

module.exports = Catalogo