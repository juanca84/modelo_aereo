const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const personaBL = app.src.bls.parametros.personaBL;
  models.sequelize = app.src.db.sequelize;

  // Listar
  app.route('/api/v1/personas')
    .get((req, res) => {
      personaBL.listarPersonas(models.persona, req.body)
        .then(respuesta => Util.mensajeExito(res, "La obtención de datos se realizó correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
}
