const sequelizeFormly = require('sequelize-formly');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const formularioBL = app.src.bls.parametros.formularioBL;

  app.route("/api/v1/formularios")
    .get((req, res) => {
      formularioBL.listarFormularios(req.query, req.body)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route("/api/v1/formularios/:id")
    .get((req, res) => {
      formularioBL.obtenerFormularioPorId(req.params.id, req.body)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  /**
     @apiVersion 1.0.0
     @apiGroup Formularios
     @apiName ListarFormulario
     @api {get} /api/v1/formularios?ambito=PROBOLIVIA Obtener lista de Formularios

     @apiDescription GET para Listar Formularios

     @apiParam {text} ambito Ámbito del formulario (PROBOLIVIA o PROMUEVE)

     @apiSuccess (Respuesta) {number} id_formulario Id del Formulario
     @apiSuccess (Respuesta) {text} tipo Tipo de Formulario
     @apiSuccess (Respuesta) {text} nombre Nombre del Formulario
     @apiSuccess (Respuesta) {text} descripcion Descripción del Formulario
     @apiSuccess (Respuesta) {text} duracion Duración del formulario (años)
     @apiSuccess (Respuesta) {text} secciones Secciones del formulario

     @apiSuccessExample {json} Respuesta del Ejemplo:
     HTTP/1.1 200 OK
     {
     "finalizado": true,
     "mensaje": "Obtención de datos exitosa.",
     "datos": [
     {
     "id_formulario": 1,
     "tipo": "UNIDAD_PRODUCTIVA",
     "nombre": "DECLARACIÓN JURADA PARA EL REGISTRO Y ACREDITACIÓN NACIONAL DE UNIDADES PRODUCTIVAS",
     "descripcion": "El presente formulario se constituye una Declaración Jurada y es de exclusiva responsabilidad de la Unidad Productiva que la presenta. PRO BOLIVIA podrá verificar en cualquier momento la información y documentación presentada.",
     "duracion": 1,
     "secciones": {}
     },
     {
     "id_formulario": 2,
     "tipo": "PROVEEDOR",
     "nombre": "DECLARACIÓN JURADA PARA EL REGISTRO Y ACREDITACIÓN NACIONAL DE PROVEEDORES A UNIDADES PRODUCTIVAS",
     "descripcion": "Este Formulario constituye Declaración Jurada y es de exclusiva responsabilidad del Proveedor que la presenta. PRO BOLIVIA podrá verificar en cualquier momento la información y documentación presentada.",
     "duracion": 1,
     "secciones": {}
     },
     {
     "id_formulario": 3,
     "tipo": "ICAP",
     "nombre": "DECLARACIÓN JURADA PARA EL REGISTRO Y ACREDITACION NACIONAL DE ICAP's",
     "descripcion": "Este Formulario constituye Declaración Jurada y es de exclusiva responsabilidad de la ICAP que la presenta. PRO BOLIVIA podra verificar en cualquier momento la informacion y documentacion presentada.",
     "duracion": 1,
     "secciones": {}
     },
     {
     "id_formulario": 4,
     "tipo": "PROVEEDOR",
     "nombre": "DECLARACIÓN JURADA PARA EL REGISTRO Y ACREDITACIÓN NACIONAL DE ARTESANOS",
     "descripcion": "Este Formulario constituye Declaración Jurada y es de exclusiva responsabilidad del Artesano que la presenta. PRO BOLIVIA podrá verificar en cualquier momento la información y documentación presentada.",
     "duracion": 2,
     "secciones": {}
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

  /**
     @apiVersion 1.0.0
     @apiGroup Formularios
     @apiName ObtieneFormulario
     @api {get} /api/v1/formularios/:id Obtener un Formularios

     @apiDescription GET para obtener un formularios

     @apiSuccess (Respuesta) {number} id_formulario Id del Formulario
     @apiSuccess (Respuesta) {text} tipo Tipo de Formulario
     @apiSuccess (Respuesta) {text} nombre Nombre del Formulario
     @apiSuccess (Respuesta) {text} descripcion Descripción del Formulario
     @apiSuccess (Respuesta) {text} duracion Duración del formulario (años)
     @apiSuccess (Respuesta) {text} secciones Secciones del formulario

     @apiSuccessExample {json} Respuesta del Ejemplo:
     HTTP/1.1 200 OK
     {
     "finalizado": true,
     "mensaje": "Obtención de datos exitosa.",
     "datos": {
     "id_formulario": 1,
     "tipo": "UNIDAD_PRODUCTIVA",
     "nombre": "DECLARACIÓN JURADA PARA EL REGISTRO Y ACREDITACIÓN NACIONAL DE UNIDADES PRODUCTIVAS",
     "descripcion": "El presente formulario se constituye una Declaración Jurada y es de exclusiva responsabilidad de la Unidad Productiva que la presenta. PRO BOLIVIA podrá verificar en cualquier momento la información y documentación presentada.",
     "duracion": 1,
     "secciones": {}
     }
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
};
