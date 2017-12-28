const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./logger.js');
const jwt = require('jwt-simple');
const proxy = require('express-http-proxy');
const request = require('request');
const helmet = require('helmet');
const Q = require('q');
const moment = require('moment');
const Util = require('../utils/util');

const fileUpload = require('express-fileupload');// Para subida de archivos

module.exports = app => {

  const config = app.src.config.config; // Almacena el archivo de configuración.
  app.set("port", config.puerto); // Definiendo el puerto
  app.set('view engine', 'pug'); // usa un motor de renderizado de plantillas, puede usarse jade(descomentar para usar como engine)
  app.set("secretAGETIC", config.jwtSecret);
  app.set("sesion", {}); // Estableciendo el objeto con las sesiones por usuario.

  app.use(morgan("common", {
    stream: {
      write: (message) => {
        logger.info(message);
      },
    },
  }))

  //adicionando soporte para cross, habilitar ips especificas no dejarlo completamente abierto, los metodos permitidos
  app.use(cors({
    "Access-Control-Allow-Origin": "*",
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": true,
    "headers": "Cache-Control, Pragma, Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "X-Frame-Options": "SAMEORIGIN",
  }));

  app.disable('x-powered-by'); // Deshabilita la información.

  app.use(bodyParser.json({ limit: '50mb' })); //permite recibir datos json como body
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // parse application/x-www-form-urlencoded

  app.use(app.src.auth.initialize()); //es para que se use la authenticacion de passport

  //eliminar ids en caso de que lo envien por si quieren hacer sqlinjection
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });

  app.use(express.static("public")); //para generar un espacio publico, archivos estaticos
  app.use('/assets', express.static("src/reports/assets"));
  app.use(express.static("uploads")); //para generar un espacio publico, para los archivos subidos al sistema

  //// verifica si hay errores en el formato json
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
      res.status(400).json({ mensaje: "Problemas en el formato JSON." });
    } else {
      res.status(500).send('¡Error interno!');
      console.error(err.stack);
    }
  });

  // Aplica el uso de helmet con configuraciones de seguridad estandar.
  app.use(helmet({ frameguard: false }));

  app.use(fileUpload());

  app.use('/api', (req, res, next) => {
    next();
  });

  const obtenerRoles = (tokenDecoded) => {
    const deferred = Q.defer();
    app.src.db.models.rol_ruta.findAll({
      attributes: ['method_get', 'method_post', 'method_put', 'method_delete'],
      where: {
        fid_rol: tokenDecoded.id_rol,
        estado: 'ACTIVO',
      },
      include: [{
        model: app.src.db.models.ruta,
        as: 'ruta',
        attributes: ['ruta'],
        where: {
          estado: 'ACTIVO',
        },
      }],
    })
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };
};
