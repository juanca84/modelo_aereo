const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const rumBL = app.src.bls.rum.rumBL;
  const mineralBL = app.src.bls.parametros.mineralBL;
  const dpaBL = app.src.bls.parametros.dpaBL;
  const parametroBL = app.src.bls.parametros.parametroBL;
  models.sequelize = app.src.db.sequelize;

  app.route('/api/v1/rum')
    .get((req, res) => {
      rumBL.listarRum(req.query.estado, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .post((req, res) => {
      rumBL.crearRum(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .put((req, res) => {
      rumBL.modificarRum(models, req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue modificado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/rum/:id')
    .get((req, res) => {
      rumBL.obtenerRum_id(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .put((req, res) => {
    rumBL.modificarRum_id(req.params.id, models) // no existe
      .then(respuesta => Util.mensajeExito(res, "Modificacion de estado exitosa", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/statusRum/:id')
    .get((req, res) => {
      rumBL.statusRum(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/representante')
    .post((req, res) => {
      rumBL.crearRepresentante(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .put((req, res) => {
    rumBL.modificarRepresentante(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue modificado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .delete((req, res) => {
      rumBL.eliminarRepresentante(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue eliminado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/representante/:id')
    .get((req, res) => {
      rumBL.obtenerRepresentante_id(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/asociado')
    .post((req, res) => {
      rumBL.crearAsociado(models, req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .delete((req, res) => {
      rumBL.eliminarAsociado(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue eliminado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .put((req, res) => {
        console.log(' entradasa ' + req.body );
        rumBL.modificarAsociado(models,req.body)
          .then(respuesta => Util.mensajeExito(res, "El registro fue modificado correctamente.", 200, respuesta))
          .catch(error => Util.mensajeError(res, error.message));
      });
  app.route('/api/v1/asociado/:id')
    .get((req, res) => {
      rumBL.listarAsociado_Id(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/ubicacion')
    .post((req, res) => {
      rumBL.crearUbicacion(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .put((req, res) => {
      rumBL.modificarUbicacion(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue modificado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .delete((req, res) => {
      rumBL.eliminarUbicacion(models,req.body)
          .then(respuesta => Util.mensajeExito(res, "El registro fue elimininado correctamente.", 200, respuesta))
          .catch(error => Util.mensajeError(res, error.message));
      });
  app.route('/api/v1/ubicacion/:id')
    .get((req, res) => {
        rumBL.listarUbicacion(models,req.params.id)
          .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
          .catch(error => Util.mensajeError(res, error.message));
      });
  app.route('/api/v1/ubicacionMunicipio/:id')
    .get((req, res) => {
      rumBL.listarUbicacionMunicipio(models,req.params.id)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/listarUbicaciond/:id')
    .get((req, res) => {
      rumBL.listarUbicaciondatos(models,req.params.id)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route('/api/v1/apmParametro')
    .put((req, res) => {
      parametroBL.crearActividad(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue modificado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .delete((req, res) => {
      parametroBL.eliminarActividad(models,req.body)
      .then(respuesta => Util.mensajeExito(res, "El registro fue elimininado correctamente.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/apmParametro/:id')
    .get((req, res) => {
      parametroBL.listarActividad_Id(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/apmMineral')
    .post((req, res) => {
      mineralBL.crearMineral(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue creado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .delete((req, res) => {
      mineralBL.eliminarMineral(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue elimininado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/apmMineral/:id')
    .get((req, res) => {
      mineralBL.listarMineral_Id(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/apmDepartamento')
    .put((req, res) => {
      dpaBL.crearDepartamento(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue modificado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .delete((req, res) => {
      dpaBL.eliminarDepartamento(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue elimininado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/apmDepartamento/:id')
    .get((req, res) => {
      dpaBL.listarDepartamento_Id(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/tramite/:id')
    .get((req, res) => {
      console.log('*********' + req.params.id)
      rumBL.obtenerTramite(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/tramite')
    .put((req, res) => {
      console.log('*********' + JSON.stringify(req.body))
      rumBL.modEstadoTramite(models,req.body)
        .then(respuesta => Util.mensajeExito(res, "El registro fue modificado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/seguimientoTramite/:id') //seguimientoTramite/1?transicion=ENVIADO
    .get((req, res) => {
      console.log('=============req.params.id:');
      console.log(req.params.id);
      console.log('=============req.query.transicion:');
      console.log(req.query.transicion);
      rumBL.obtenerSeguimientoTramite(req.params.id, req.query.transicion ,  models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route('/api/v1/cambiarEstado')
    .post((req, res) => {
      rumBL.crearSeguimiento(req.body,models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route("/api/v1/carga_resolucion_afcoop/:id")
  .post((req, res) => {
    rumBL.importarResolucionAfcoop(req, req.params.id, models)
    .then(respuesta => Util.mensajeExito(res, respuesta, 200))
    .catch(error => Util.mensajeError(res, error.message));
  });
  app.route("/api/v1/carga_resolucion_asociados/:id")
  .post((req, res) => {
    rumBL.importarResolucionAsociados(req, req.params.id_apm)
    .then(respuesta => Util.mensajeExito(res, respuesta, 200))
    .catch(error => Util.mensajeError(res, error.message));
  });
  app.route("/api/v1/carga_resolucion_federacion/:id")
  .post((req, res) => {
    rumBL.importarResolucionFederacion(req, req.params.id_apm)
    .then(respuesta => Util.mensajeExito(res, respuesta, 200))
    .catch(error => Util.mensajeError(res, error.message));
  });

};
