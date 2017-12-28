const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const nimBL = app.src.bls.rum.nimBL;
  models.sequelize = app.src.db.sequelize;

  app.route('/api/v1/nim')
    .post((req, res) => {
      nimBL.crearNim(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .put((req, res) => {
      nimBL.modificarNim(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue modificado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/deposito')
    .put((req, res) => {
      nimBL.depositoNim(models,req.body )
        .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/nim/:id')
    .get((req, res) => {
      nimBL.obtenerNim_id(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/statusNim/:id')
    .get((req, res) => {
      nimBL.statusNim(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
};
