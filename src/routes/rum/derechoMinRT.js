const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const derechoMinBL = app.src.bls.rum.derechoMinBL;
  const mineralBL = app.src.bls.parametros.mineralBL;
  const dpaBL = app.src.bls.parametros.dpaBL;
  const parametroBL = app.src.bls.parametros.parametroBL;
  models.sequelize = app.src.db.sequelize;

  app.route('/api/v1/derechoMin')
    .post((req, res) => {
      derechoMinBL.crearDerechoMin(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .get((req, res) => {
      derechoMinBL.listarDerechoMin(req.query.estado, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .put((req, res) => {
      derechoMinBL.modDerechoMin(models, req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue modificado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/derechoMinero/:id')
    .get((req, res) => {
      derechoMinBL.obtenerDerechoMinero_id(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/derechoMinero_apm/:id')
    .get((req, res) => {
      derechoMinBL.obtenerDerechoMinero_apm(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
};
