const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const rumBL = app.src.bls.rum.rumBL;
  const listarBL = app.src.bls.rum.listarBL;
  const mineralBL = app.src.bls.parametros.mineralBL;
  const dpaBL = app.src.bls.parametros.dpaBL;
  const parametroBL = app.src.bls.parametros.parametroBL;
  models.sequelize = app.src.db.sequelize;

  app.route('/api/v1/listar/:id')
    .get((req, res) => {
      listarBL.listarId(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/ubicacionRepresentante/:id')
    .get((req, res) => {
      listarBL.ubicacionRepresentante(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/crearFirma')
    .post((req, res) => {
      listarBL.crearFirma(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });


};