const sequelizeFormly = require('sequelize-formly');
const parametroBL = require('../../bls/parametros/parametroBL');
const Util = require('../../utils/util');

module.exports = app => {

  const models = app.src.db.models;

  app.route("/api/v1/parametros/")
    .get((req, res) => {
      parametroBL.listarParametros(req.query, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route("/api/v1/parametros")
    .post((req, res) => {
      parametroBL.registrarParametro(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "El registro fue almacenado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route("/api/v1/parametros/:id")
    .get((req, res) => {
      parametroBL.obtenerParametroPorId(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .put((req, res) => {
      parametroBL.modificarParametro(req.params.id, req.body, models)
        .then(respuesta => Util.mensajeExito(res, "El registro fue modificado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    })
    .delete((req, res) => {
      parametroBL.eliminarParametro(req.params.id, models)
        .then(respuesta => Util.mensajeExito(res, "El registro fue eliminado correctamente.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route("/api/v1/actividades")
    .get((req, res) => {
      parametroBL.listarActividades(req.query, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
  app.route("/api/v1/societarios")
    .get((req, res) => {
      parametroBL.listarSocietarios(req.query.tipo, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

};



/**
   @apiVersion 1.0.0
   @apiGroup PARAMETROS
   @apiName Listar Parámetros
   @api {get} /api/v1/parametros/ Listar Parámetros

   @apiDescription GET para obtener una lista de certificaciones

   @apiParam (Query) {Texto} grupo (Opcional) GRUPO de los parámetros a buscar
   @apiParam (Query) {Texto} order (Opcional) Campo por el cual se ordenará el resultado
   @apiParam (Query) {Numerico} limit (Opcional) Cantidad de resultados a obtener
   @apiParam (Query) {Numerico} page (Opcional) Número de página de resultados
   @apiParam (Query) {Texto} filter (Opcional) Texto a buscar en los registros

   @apiParamExample {query} Ejemplo con Paginación
   http://localhost:4000/api/v1/certificaciones?grupo=TERRITORIO_INDIGENA&limit=20&page=1
   @apiParamExample {query} Ejemplo sin Paginación
   http://localhost:4000/api/v1/certificaciones?grupo=TERRITORIO_INDIGENA
   @apiParamExample {query} Ejemplo de SERVICIOS PADRE
   http://localhost:4000/api/v1/parametros/?grupo=SERVICIO
   @apiParamExample {query} Ejemplo de SERVICIOS HIJOS
   http://localhost:4000/api/v1/parametros/?grupo=SERVICIO&fid_parametro_padre=1005

   @apiSuccess (Respuesta) {boolean} finalizado Indica si la petición se finalizó correctamente.
   @apiSuccess (Respuesta) {text} mensaje Contenido del mensaje de éxito o error.
   @apiSuccess (Respuesta) {json} datos Datos de respuesta (sólo en casos de éxito)

   @apiSuccess (Respuesta) {json} datos.rows Datos de la certificación creada
   @apiSuccess (Respuesta) {json} datos.count Datos de la Unidad Productiva

   @apiSuccessExample {json} Respuesta de Ejemplo con Paginación:
   HTTP/1.1 200 OK
   {
   "finalizado": true,
   "mensaje": "Obtención de datos exitosa.",
   "datos": {
   "count": 1,
   "rows": [
   {
   "id_parametro": 200,
   "grupo": "TIPO_SOCIETARIO",
   "sigla": "01",
   "nombre": "Empresa Unipersonal",
   "descripcion": "Empresa Unipersonal",
   "orden": 1,
   "estado": "ACTIVO"
   },
   {
   "id_parametro": 205,
   "grupo": "TIPO_SOCIETARIO",
   "sigla": "03",
   "nombre": "Sociedad Colectiva",
   "descripcion": "Sociedad Colectiva",
   "orden": 2,
   "estado": "ACTIVO"
   },
   {
   "id_parametro": 210,
   "grupo": "TIPO_SOCIETARIO",
   "sigla": "04",
   "nombre": "Sociedad Responsabilidad Limitada",
   "descripcion": "Sociedad Responsabilidad Limitada",
   "orden": 3,
   "estado": "ACTIVO"
   },
   {
   "id_parametro": 215,
   "grupo": "TIPO_SOCIETARIO",
   "sigla": "05",
   "nombre": "Sociedad en Comandita Simple",
   "descripcion": "Sociedad en Comandita Simple",
   "orden": 4,
   "estado": "ACTIVO"
   },
   ]
   }
   }
   @apiSuccessExample {json} Respuesta de Ejemplo sin Paginación:
   HTTP/1.1 200 OK
   {
   "finalizado": true,
   "mensaje": "Obtención de datos exitosa.",
   "datos": [
   {
   "id_parametro": 200,
   "grupo": "TIPO_SOCIETARIO",
   "sigla": "01",
   "nombre": "Empresa Unipersonal",
   "descripcion": "Empresa Unipersonal",
   "orden": 1,
   "estado": "ACTIVO"
   },
   {
   "id_parametro": 205,
   "grupo": "TIPO_SOCIETARIO",
   "sigla": "03",
   "nombre": "Sociedad Colectiva",
   "descripcion": "Sociedad Colectiva",
   "orden": 2,
   "estado": "ACTIVO"
   },
   {
   "id_parametro": 210,
   "grupo": "TIPO_SOCIETARIO",
   "sigla": "04",
   "nombre": "Sociedad Responsabilidad Limitada",
   "descripcion": "Sociedad Responsabilidad Limitada",
   "orden": 3,
   "estado": "ACTIVO"
   },
   {
   "id_parametro": 215,
   "grupo": "TIPO_SOCIETARIO",
   "sigla": "05",
   "nombre": "Sociedad en Comandita Simple",
   "descripcion": "Sociedad en Comandita Simple",
   "orden": 4,
   "estado": "ACTIVO"
   },
   ]
   }
   @apiSuccessExample {json} Respuesta de Ejemplo de Servicios PADRE:
   {
   "finalizado": true,
   "mensaje": "Obtención de datos exitosa.",
   "datos": [
   {
   "id_parametro": 1005,
   "grupo": "SERVICIO",
   "sigla": "GESTION_ADMINISTRACION",
   "nombre": "Gestión y Administración",
   "descripcion": "(Detalle las principales áreas de especialización)",
   "orden": 1,
   "estado": "ACTIVO",
   "parametro_padre": {
   "id_parametro": 1000,
   "grupo": "SERVICIO",
   "sigla": "CAPACITACION",
   "nombre": "Capacitación",
   "descripcion": "Capacitación",
   "orden": 1,
   "estado": "ACTIVO"
   }
   },
   {
   "id_parametro": 1030,
   "grupo": "SERVICIO",
   "sigla": "TECNICO_PRODUCTIVO",
   "nombre": "Técnico Productivo",
   "descripcion": "(Ej. Diseño de Calzado, otros)",
   "orden": 2,
   "estado": "ACTIVO",
   "parametro_padre": {
   "id_parametro": 1000,
   "grupo": "SERVICIO",
   "sigla": "CAPACITACION",
   "nombre": "Capacitación",
   "descripcion": "Capacitación",
   "orden": 1,
   "estado": "ACTIVO"
   }
   },
   {
   "id_parametro": 1065,
   "grupo": "SERVICIO",
   "sigla": "ASISTENCIA_TECNICA",
   "nombre": "Asistencia Técnica",
   "descripcion": "(Desde las principales áreas de especialización)",
   "orden": 2,
   "estado": "ACTIVO",
   "parametro_padre": {
   "id_parametro": 1060,
   "grupo": "SERVICIO",
   "sigla": "ASISTENCIA_TECNICA",
   "nombre": "Asistencia Técnica",
   "descripcion": "Asistencia Técnica",
   "orden": 2,
   "estado": "ACTIVO"
   }
   }
   ]
   }
   @apiSuccessExample {json} Respuesta de Ejemplo de Servicios HIJOS:
   {
   "finalizado": true,
   "mensaje": "Obtención de datos exitosa.",
   "datos": [
   {
   "id_parametro": 1010,
   "grupo": "SERVICIO",
   "sigla": "ADMINISTRACION",
   "nombre": "Administración",
   "descripcion": "Administración",
   "orden": 1,
   "estado": "ACTIVO"
   },
   {
   "id_parametro": 1015,
   "grupo": "SERVICIO",
   "sigla": "FINANZAS",
   "nombre": "Finanzas",
   "descripcion": "Finanzas",
   "orden": 2,
   "estado": "ACTIVO"
   },
   {
   "id_parametro": 1020,
   "grupo": "SERVICIO",
   "sigla": "COMERZACIALIZACION",
   "nombre": "Comercialización",
   "descripcion": "Comercialización",
   "orden": 3,
   "estado": "ACTIVO"
   },
   {
   "id_parametro": 1025,
   "grupo": "SERVICIO",
   "sigla": "TRANSVERSALES",
   "nombre": "Transversales",
   "descripcion": "Transversales",
   "orden": 4,
   "estado": "ACTIVO"
   }
   ]
   }

   @apiError notFound NO se ha encontrado

   @apiErrorExample {json} Error-Response:
   HTTP/1.1 412 Not Found
   {
   "finalizado": false,
   "mensaje": "No se encontraron datos..",
   "datos": null
   }
*/
