const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const mineralBL = app.src.bls.parametros.mineralBL;
  models.sequelize = app.src.db.sequelize;

  app.route('/api/v1/mineral')
    .get((req, res) => {
      mineralBL.listarMinerales(models.mineral, req.body)
        .then(respuesta => Util.mensajeExito(res, "La obtención de datos se realizó correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
  app.route('/api/v1/mineral/:id')
    .get((req, res) => {
      mineralBL.listarMineral_Id(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
};
