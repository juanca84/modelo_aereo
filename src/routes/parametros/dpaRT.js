const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const dpaBL = app.src.bls.parametros.dpaBL;
  models.sequelize = app.src.db.sequelize;

  // Listar
  app.route('/api/v1/municipio')
    .get((req, res) => {
      dpaBL.listarMunicipios(models.dpa, req.body)
        .then(respuesta => Util.mensajeExito(res, "La obtención de datos se realizó correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/provincia')
    .get((req, res) => {
      dpaBL.listarProvincias(models.dpa, req.body)
        .then(respuesta => Util.mensajeExito(res, "La obtención de datos se realizó correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/departamento')
    .get((req, res) => {
      dpaBL.listarDepartamentos(models.dpa, req.body)
        .then(respuesta => Util.mensajeExito(res, "La obtención de datos se realizó correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  // Buscar 
  app.route('/api/v1/dpa/:id')
    .get((req, res) => {
      dpaBL.buscarDpa(models.dpa, req.params.id)
        .then(respuesta => Util.mensajeExito(res, "La obtención de datos se realizó correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  // app.route('/api/v1/municipio')
  //   .post((req, res) => {
  //     dpaBL.crearMunicipio(models.dpa, req.body)
  //       .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
  //       .catch(error => Util.mensajeError(res, error.message));
  //   });

  // app.route('/api/v1/municipio/:id_municipio')
  //   .put((req, res) => {
  //     dpaBL.actualizarMunicipio(models.dpa, req.params.id_municipio, req.body)
  //       .then(respuesta => Util.mensajeExito(res, "El registro se modificó correctamente.", 200, respuesta))
  //       .catch(error => Util.mensajeError(res, error.message));
  //   });

  // app.route('/api/v1/municipio/:id_municipio')
  //   .delete((req, res) => {
  //     dpaBL.eliminarMunicipio(models.dpa,req.params.id_municipio)
  //       .then(respuesta => Util.mensajeExito(res, "Se eliminó el registro exitosamente.", 200, respuesta))
  //       .catch(error => Util.mensajeError(res, error.message));
  //   });

  app.route('/api/v1/dpa/hijos/:id')
    .get((req, res) => {
      dpaBL.obtenerHijos(models.dpa, req.params.id)
        .then(respuesta => Util.mensajeExito(res, "La obtención de datos se realizó correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
}
