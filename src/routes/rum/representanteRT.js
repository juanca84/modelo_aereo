const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const representanteBL = app.src.bls.rum.representanteBL;

  app.route("/api/v1/carga_poder_representante")
  .post((req, res) => {
    representanteBL.importarPoder(req.query.id,req.query.valor,req, models)
    .then(respuesta => Util.mensajeExito(res, "Se guardó el documento correctamente.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });

};
