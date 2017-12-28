const jwt = require('jwt-simple');
const LdapStrategy = require('passport-ldapauth');
const passport = require('passport');
const crypto = require('crypto');
const Q = require('q');
const autenticacionBL = require('../../bls/autenticacion/autenticacionBL');
const Util = require('../../utils/util');



module.exports = app => {
  /**
    @apiVersion 1.0.0
    @apiGroup AUTENTICACION
    @apiName Post autenticar
    @api {post} /autenticar Autentica a un usuario y devuelve la variables necesarias

    @apiDescription Post para estudiante


    @apiParam (Peticion) {text} usuario
    @apiParam (Peticion) {text} contrasena Telefono

    @apiParamExample {json} Ejemplo para enviar:
    {
      "usuario": "nombre_usuario",
      "contrasena": "ejemplo_contrasena_segura"
    }
    @apiError error Credenciales no válidas

    @apiErrorExample {json} Error-Response:
    HTTP/1.1 412 Not Null Violation
    {
      "msg": "mensaje error"
    }
  */
  app.post("/autenticar", (req, res) => {
    autenticacionBL.autenticar(req.body, app)
    .then(respuesta => res.status(200).json(respuesta))
    .catch(error => {
      Util.mensajeError(res, error.message || error.mensaje)
    });
  });

  app.post("/crear_cuenta", (req, res) => {
    autenticacionBL.crearCuenta(req.body, app)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => {
      Util.mensajeError(res, error.message || error.mensaje)
    });
  });
  
  app.route("/validaCambioContrasena")
  .post((req, res) => {
    autenticacionBL.validaCambioContrasena(req.body)
      .then(respuesta => Util.mensajeExito(res, "Se ha activado el usuario correctamente.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });

  // TODO: eliminar
  app.post("/api/v1/cambiarRol", (req, res) => {
    if (req.body.rolCambio) {
      const audit_usuario = req.body.audit_usuario;
      const rolCambio = req.body.rolCambio;
      obtenerDatos(null, null, audit_usuario, rolCambio)
      .then(respuesta => res.json(respuesta))
      .catch(_error => res.status(412).json({error: _error}));
    } else {
      res.status(412).json({error: "Debe indicar el rol al que desea cambiar."});
    }
  });
};
