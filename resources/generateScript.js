const fs = require('fs')
const database = JSON.parse(fs.readFileSync('./resources/trailerflix.json', 'utf8')).sort((a, b) => a.id > b.id ? 1 : -1)

let catalogo = []
let categorias = []
let actricesyactores = []
let genero = []
let reparto = []
let generos = []
const dropcreateuse = `DROP DATABASE IF EXISTS Trailerflix;
CREATE DATABASE Trailerflix;
USE Trailerflix;\n\n`
const dbdesigner = fs.readFileSync('./resources/dbdesigner.sql', 'utf8') + '\n'
let insert = ''
let vista = ''

database.forEach(element => {
  let produccion = {}
  produccion.idProduccion = element.id
  produccion.idCategoria = element.categoria
  produccion.poster = element.poster
  produccion.resumen = element.resumen
  produccion.temporadas = element.temporadas
  produccion.titulo = element.titulo
  produccion.trailer = element.trailer
  catalogo.push(produccion)
  categorias.push(element.categoria)
  actricesyactores.push(...element.reparto.split(','))
  genero.push(...element.genero.split(','))
})

categorias = Array.from(new Set(categorias)).sort()
actricesyactores = Array.from(new Set(actricesyactores.map(element => element.trim()))).sort()
genero = Array.from(new Set(genero.map(element => element.trim()))).sort()

catalogo.forEach(produccion => {
  produccion.idCategoria = categorias.findIndex((categoria) => categoria === produccion.idCategoria) + 1
})

database.forEach(element => {
  let cast = element.reparto.split(',')
  cast = cast.map(actor => actor.trim())
  cast.forEach(actor => {
    reparto.push({idProduccion: element.id, idActor: actricesyactores.findIndex(item => item === actor) + 1})
  })
  let genre = element.genero.split(',')
  genre = genre.map(genre => genre.trim())
  genre.forEach(gen => {
    generos.push({idProduccion: element.id, idGenero: genero.findIndex(item => item === gen) + 1})
  })
})

insert = 'INSERT INTO categorias (idCategoria, categoria)\nVALUES\n'
categorias.forEach((item, idx) => {
  insert += `(${idx + 1}, "${item}"),\n`
})
insert = insert.substring(0, insert.length - 2) + ';\n\n'

insert += 'INSERT INTO catalogo (idProduccion, idCategoria, poster, resumen, temporadas, titulo, trailer)\nVALUES\n'
catalogo.forEach(produccion => {
  insert += `(${produccion.idProduccion}, ${produccion.idCategoria}, "${produccion.poster}", "${produccion.resumen}", "${produccion.temporadas}", "${produccion.titulo}", "${produccion.trailer || ''}"),\n`
})
insert = insert.substring(0, insert.length - 2) + ';\n\n'

insert += 'INSERT INTO genero (idGenero, genero)\nVALUES\n'
genero.forEach((item, idx) => {
  insert += `(${idx + 1}, "${item}"),\n`
})
insert = insert.substring(0, insert.length - 2) + ';\n\n'

insert += 'INSERT INTO actricesyactores (idActor, nombre)\nVALUES\n'
actricesyactores.forEach((item, idx) => {
  insert += `(${idx + 1}, "${item}"),\n`
})
insert = insert.substring(0, insert.length - 2) + ';\n\n'

insert += 'INSERT INTO reparto (idReparto, idProduccion, idActor)\nVALUES\n'
reparto.forEach((item, idx) => {
  insert += `(${idx + 1}, ${item.idProduccion}, ${item.idActor}),\n`
})
insert = insert.substring(0, insert.length - 2) + ';\n\n'

insert += 'INSERT INTO generos (idProduccionGeneros, idProduccion, idGenero)\nVALUES\n'
generos.forEach((item, idx) => {
  insert += `(${idx + 1}, ${item.idProduccion}, ${item.idGenero}),\n`
})
insert = insert.substring(0, insert.length - 2) + ';\n\n'

vista = `CREATE VIEW vista_catalogo AS
SELECT
catalogo.idProduccion as id,
catalogo.poster,
catalogo.titulo,
categorias.categoria,
GROUP_CONCAT(DISTINCT genero.genero SEPARATOR ', ') as generos,
catalogo.resumen,
catalogo.temporadas,
GROUP_CONCAT(DISTINCT actricesyactores.nombre SEPARATOR ', ') as reparto,
catalogo.trailer
FROM
catalogo
JOIN categorias ON catalogo.idCategoria = categorias.idCategoria
LEFT JOIN reparto ON catalogo.idProduccion = reparto.idProduccion
LEFT JOIN actricesyactores ON reparto.idActor = actricesyactores.idActor
LEFT JOIN generos ON catalogo.idProduccion = generos.idProduccion
LEFT JOIN genero ON generos.idGenero = genero.idGenero
GROUP BY catalogo.idProduccion;\n`

fs.writeFileSync('./resources/script.sql', dropcreateuse + dbdesigner + insert + vista, 'utf8')
