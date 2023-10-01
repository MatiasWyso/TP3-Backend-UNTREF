# Proyecto Integrador 3
## UNTREF Backend - Argentina Programa 4.0

### TODO:
- Preparar .env con tus datos de acceso a MySQL
  ```
    DB_HOST='Host o IP'
    DB_USERNAME='Usuario'
    DB_PASSWORD='Contraseña'
  ```
- Instalar los módulos de node.js
  ```
    npm install
  ```
- Crear script MySQL para creación de la base de datos, tablas, relaciones, vista y carga de datos inicial
  ```
    npm run generate
  ```
- Correr el servidor
  ```
    npm start
  ```
- Correr el servidor en modo watch para realizar pruebas y cambios live
  ```
    npm test
  ```
---
### Dependencias Node.js
1. dotenv > 16.3.1
2. express > 4.18.2
3. mongodb > 5.6.0
4. mysql2 > 3.6.1
5. sequelize > 6.33.0
---
### Especificaciones del servidor
- Endpoints:
  - GET - /
  - GET - /categorias
  - GET - /generos
  - GET - /catalogo
  - GET - /catalogo/:id
  - GET - /catalogo/nombre/:nombre
  - GET - /catalogo/genero/:genero
  - GET - /catalogo/categoria/:categoria
---
### Notas:
```
  Archivos útiles o secundarios en ´resources´
```