const sequelizeFormly = require('sequelize-formly');
const serviciosWebBL = require('../../bls/serviciosWeb/serviciosWebBL');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  models.sequelize = app.src.db.sequelize;

    //Servicio para buscar los representantes legales ligados a una matricula
  app.route("/api/v1/servicios/representantes/:nro_matricula")
       .get((req, res) => {
         serviciosWebBL.buscarRepresentanteLegal(req.params.nro_matricula)
           .then(respuesta => Util.mensajeExito(res, "Se recuperaron los datos de los representantes exitosamente.", 200, respuesta))
           .catch(error => Util.mensajeError(res, error.message));
       });

   //Servicio para buscar las matriculas asociados al nit de la empresas
  app.route("/api/v1/servicios/matriculas/:nro_nit")
     .get((req, res) => {
       serviciosWebBL.buscarMatriculas(req.params.nro_nit)
         .then(respuesta => Util.mensajeExito(res, "Se encontraron las siguientes matriculas.", 200, respuesta))
         .catch(error => Util.mensajeError(res, error.message));
     });

     //Servicio para buscar la información de la empresa asociada a una matricula
  app.route("/api/v1/servicios/informacion_empresa/:nro_matricula")
       .get((req, res) => {
         serviciosWebBL.buscarInformacionEmpresa(req.params.nro_matricula)
           .then(respuesta => Util.mensajeExito(res, "Se recuperó la información de la empresa correctamente.", 200, respuesta))
           .catch(error => Util.mensajeError(res, error.message));
       });

    //Servicio de verificacion de Deposito
  app.route("/api/v1/servicios/verificacion")
    .get((req, res) => {
      serviciosWebBL.buscarInformacionDeposito(req.query.deposito,req.query.fecha)
        .then(respuesta => Util.mensajeExito(res, "Se recuperó la información del deposito.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
}
