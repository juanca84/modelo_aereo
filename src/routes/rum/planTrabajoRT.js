const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const planTrabajoBL = app.src.bls.rum.planTrabajoBL;
  models.sequelize = app.src.db.sequelize;

  app.route('/api/v1/planTrabajo')
    .post((req, res) => {
      planTrabajoBL.crearPlanTrabajo(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
};
