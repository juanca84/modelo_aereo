const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const firmaBL = app.src.bls.rum.firmaBL;
  models.sequelize = app.src.db.sequelize;

  app.route('/api/v1/firmaCertificado')
    .post((req, res) => {
      firmaBL.firmaDocumento(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/documento/:id_seguimiento')
  .get((req, res) => {
    firmaBL.obtenerRutaCertificadoPdf(req.params.id_seguimiento, models)
      .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
  });
};