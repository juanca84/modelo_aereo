const sequelizeFormly = require('sequelize-formly');
const usuarioBL = require('../../bls/autenticacion/usuarioBL');
const autenticacionBL = require('../../bls/autenticacion/autenticacionBL');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  models.sequelize = app.src.db.sequelize;
  models.notificaciones = app.src.libs.notificaciones;

  app.route("/api/v1/usuarios")
    .get((req, res) => {
      usuarioBL.listarUsuarios(req.query, req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route("/api/v1/usuarios")
    .post((req, res) => {
      usuarioBL.crearUsuario(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route("/usuariosApm")
  .post((req, res) => {
    usuarioBL.crearUsuarioApm(req.body, models)
      .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });

  app.route("/api/v1/usuarios/:id")
    .get((req, res) => {
      usuarioBL.obtenerUsuarioPorId(req.params.id, models, null, req.body)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route("/api/v1/usuarios/:id")
    .put((req, res) => {
      usuarioBL.modificarUsuario(req.params.id, req.body, models)
        .then(respuesta => Util.mensajeExito(res, "El registro fue modificado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route("/usuarios/activar")
  .post((req, res) => {
    usuarioBL.activarUsuario(req.body, models)
      .then(respuesta => Util.mensajeExito(res, "Su cuenta fue activada correctamente.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });

  app.route("/api/v1/usuarios/reenviar")
  .post((req, res) => {
    usuarioBL.reenviarActivacion(req.body, models)
      .then(respuesta => Util.mensajeExito(res, "Se ha enviado el correo de activación de cuenta correctamente.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });

  app.route("/api/v1/mypass")
  .put((req, res) => {
    usuarioBL.cambiarContrasena(req.body, models)
      .then(respuesta => Util.mensajeExito(res, "Se ha cambiado su contraseña correctamente.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });

  app.route("/usuarios/restaurarContrasena")
  .post((req, res) => {
    usuarioBL.recuperarCuenta(req.body, models)
      .then(respuesta => Util.mensajeExito(res, "Se ha enviado el código de recuperación de cuenta correctamente.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });

  app.route("/api/v1/usuarios/:id/confirmar_correo")
  .put((req, res) => {
    autenticacionBL.validarCorreo(req.params.id, req.body, models)
      .then(respuesta => Util.mensajeExito(res, "Se ha mandado el mensaje de activación correctamente.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });
  
    app.route("/usuarios/:id/confirmar_correo_creacion")
    .put((req, res) => {
      usuarioBL.confirmarUsuario(req.params.id, req.body)
        .then(respuesta => Util.mensajeExito(res, "Se ha mandado el mensaje de activación correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route("/api/v1/usuarios/:id/confirmar")
  .put((req, res) => {
    usuarioBL.confirmarUsuario(req.params.id, req.body)
      .then(respuesta => Util.mensajeExito(res, "Se ha activado el usuario correctamente.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });

  // app.route("/api/v1/usuarios/:id/matriculas")
  // .get((req, res) => {
  //   usuarioBL.obtenerEmpresas(req.params.id, req.body, models)
  //     .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
  //     .catch(error => Util.mensajeError(res, error.message));
  // });

  app.route("/api/v1/terminos/:id")
  .put((req, res) => {
    usuarioBL.aceptaTerminos(req.params.id, models)
      .then(respuesta => Util.mensajeExito(res, "Se ha activado el usuario correctamente.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });
};
