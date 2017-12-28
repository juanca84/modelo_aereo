const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const tecnicoBL = app.src.bls.rum.tecnicoBL;
  models.sequelize = app.src.db.sequelize;

  app.route('/api/v1/organizacion')
    .get((req, res) => {
      tecnicoBL.listadoOrganizacion(req.query.valor, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/organizacionId/:id')
    .get((req, res) => {
      tecnicoBL.listadoOrganizacionId(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
  .catch(error => Util.mensajeError(res, error.message));
  });

  app.route('/api/v1/organizacion/:id')
  .get((req, res) => {
    tecnicoBL.tipoOrganizacion(req.params.id, models)
      .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });

  app.route('/api/v1/titulo')
  .get((req, res) => {
    tecnicoBL.titulo(req.body, models)
      .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });

  app.route('/api/v1/listarId/:id')
  .get((req, res) => {
    tecnicoBL.listarId(req.params.id, models)
      .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });

  app.route('/api/v1/listarTramite')
    .get((req, res) => {
      tecnicoBL.listarSeguimientoTramite(req.query,req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/cambiarEstado')
    .put((req, res) => {
      tecnicoBL.cambiarEstado(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/usuarioDestino')
    .put((req, res) => {
      tecnicoBL.usuarioDestino(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/cargaTecnico')
    .get((req, res) => {
      tecnicoBL.cargaTecnico(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/observaciones/:id')
    .get((req, res) => {
      tecnicoBL.listarObservaciones(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/observaciones')
    .post((req, res) => {
      tecnicoBL.crearObservacion(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .put((req, res) => {
        tecnicoBL.modificarObservacion(req.body, models)
          .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
          .catch(error => Util.mensajeError(res, error.message));
    })
    .delete((req, res) => {
        tecnicoBL.eliminarObservacion(req.body, models)
          .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
          .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/firma')
    .put((req, res) => {
      tecnicoBL.firmaDigital(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

};
