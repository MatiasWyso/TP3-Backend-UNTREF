// Cargamos las variables de entorno con Dotenv
require('dotenv').config()

// Hacemos los imports
const express = require('express')
const server = express()
const sequelize = require('./connection/connection')
const Catalogo = require('./models/catalogo')
const Categorias = require('./models/categorias')
const Genero = require('./models/genero')
const { Op } = require('sequelize')

// Constantes
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '127.0.0.1'
const BASE_URL = process.env.BASE_URL
const UPLOADS = process.env.UPLOADS

// Middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Endpoints

//Home
server.get('/', (req, res) => {
  res.status(200).send(`
  <html>
  <head></head>
  <body>
    <h1>Trailerflix:</h1>
    <ul>
      <li><a href='/catalogo'>Catalogo</a></li>
      <li><a href='/catalogo/categoria/serie'>Series</a></li>
      <li><a href='/catalogo/categoria/pelicula'>Películas</a></li>
    </ul>  
  </body>
  </html>
  `)
})

// Devuelve la lista de categorias disponibles
server.get('/categorias', async (req, res) => {
  const categorias = await Categorias.findAll()
  res.status(200).send(categorias)
})

// Devuelve la lista de generos disponibles
server.get('/generos', async (req, res) => {
  const generos = await Genero.findAll()
  res.status(200).send(generos)
})

// Devuelve el catalogo completo de producciones
server.get('/catalogo', async (req, res) => {
  const catalogo = await Catalogo.findAll()
  catalogo.forEach(produccion =>{
    produccion.poster = BASE_URL + UPLOADS + produccion.poster
  })
  res.status(200).send(catalogo)
})

// Devuelve una produccion por id numérico
server.get('/catalogo/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!isNaN(id)) {
    const produccion = await Catalogo.findAll({where: {id: id}})
    if (produccion.length) {
      res.status(200).send(produccion)
      return
    }
    res.status(404).send({status: 400, message: `No se hallaron resultados para id: ${id}`})
    return
  }
  res.status(400).send({status: 400, message: 'Error tipo de dato no válido'})
})

// Devuelve una colección de producciones que cumplen el titulo solicitado
server.get('/catalogo/nombre/:nombre', async (req, res) => {
  const produccion = await Catalogo.findAll({where: {titulo: {[Op.substring]: req.params.nombre}}})
  if (produccion.length) {
    res.status(200).send(produccion)
    return
  }
  res.status(400).send({status: 400, message: `No se hallaron resultados para Titulo: ${req.params.nombre}`})
})

// Devuelve una colección de producciones que cumplen con el genero solicitado
server.get('/catalogo/genero/:genero', async (req, res) => {
  const genero = await Catalogo.findAll({where: {generos: {[Op.substring]: req.params.genero}}})
  if (genero.length) {
    res.status(200).send(genero)
    return
  }
  res.status(400).send({status: 400, message: `No se hallaron resultados para Genero: ${req.params.genero}`})
})

// Devuelve una colección de producciones que cumplen la categoria solicitada
server.get('/catalogo/categoria/:categoria', async (req, res) => {
  const categoria = await Catalogo.findAll({where: {categoria: {[Op.substring]: req.params.categoria}}})
  if (categoria.length) {
    res.status(200).send(categoria)
    return
  }
  res.status(400).send({status: 400, message: `No se hallaron resultados para Categoria: ${req.params.categoria}`})
})

server.get('*', (req, res) => {
  res.status(404).send({status: 404, message: 'Not found'})
})

// Conexión a base de datos e inicio del servidor
sequelize.authenticate().then(()=>{
  console.log('Connection established')
  server.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`)
  })
}).catch((error) => {
  console.error(error)
});