
const express = require('express');
const consign = require('consign');

const path = require('path');
global.appRoot = path.resolve(__dirname);
const app = express();

consign({verbose:false});
consign()
  //carga las configuraciones de base de datos y otras como el puerto de escucha y la palabra secreta para la encriptacion
  .include('src/config/config.js')
  // carga las utilidades necesarias
  .then('src/libs/util.js')
  // carga el módulo de notificaciones
  .then('src/libs/notificaciones.js')
  //cargamos los handlers para peticiones personalizado
  .then('src/libs/handlers.js')
  //carga el modulo de sequelize para que tambien cargue los modelos
  .then('src/db.js')
  //carga el modulo de BLS
  .then('src/bls.js')
  //carga el modulo de passport con jwt para la autenticacion del apirest
  .then('src/auth.js')
  // carga los BLS
  .then('src/bls/')
  //acá se encuentra el midleware por si es necesario cargar algun otro datos
  .then('src/libs/middlewares.js')
  // carga todas las rutas del api rest
  .then('src/routes')
  //Declara Variables Globales
  .then('src/libs/variables.js')
  // levanta todo el sistema
  .then('src/libs/boot.js')
  // finalmente todo lo ingresa a express
  .into(app);

module.exports=app;
