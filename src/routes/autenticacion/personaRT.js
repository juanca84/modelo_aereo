
const options = require('sequelize-formly');
const personaBL = require('../../bls/autenticacion/personaBL');
const Util = require('../../utils/util');

module.exports = app => {

  const models = app.src.db.models;

  app.route("/api/v1/persona/servicio/segip")
  .get((req, res) => {
    console.log("ejecutando peticion.................");
    personaBL.guardarPersonaSegip(req.query, req.body, models)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });

  /**
    @apiVersion 1.0.0
    @apiGroup Persona SEGIP
    @apiName Get Persona SEGIP
    @api {get} /api/v1/persona/servicio/segip Obtener Persona de SEGIP

    @apiDescription GET para Persona desde SEGIP


    @apiParam (Peticion) {text} ci Cédula de identidad
    @apiParam (Peticion) {date} fecha_nacimiento Fecha de nacimiento (yyyy/mm/dd)

    @apiParamExample {json} Ejemplo para enviar:
    http://localhost:4000/api/v1/persona/servicio/segip?ci=4047003&fecha_nacimiento=1976/9/21


    @apiSuccess (Respuesta) {number} id_persona Id de la persona
    @apiSuccess (Respuesta) {text} documento_identidad Documento de identidad
    @apiSuccess (Respuesta) {text} complemento_documento Complemento del documento
    @apiSuccess (Respuesta) {text} nombres Nombres
    @apiSuccess (Respuesta) {text} primer_apellido Primer apellido
    @apiSuccess (Respuesta) {text} segundo_apellido Segundo apellido
    @apiSuccess (Respuesta) {text} casada_apellido Apellido de casada
    @apiSuccess (Respuesta) {datetime-local} fecha_nacimiento Fecha de nacimiento
    @apiSuccess (Respuesta) {text} direccion Dirección

    @apiSuccessExample {json} Respuesta del Ejemplo:
    HTTP/1.1 200 OK
    {
      "finalizado": true,
      "mensaje": "Obtención de datos exitosa.",
      "datos": {
        "id_persona": 6,
        "documento_identidad": "4047003",
        "complemento_documento": "1B",
        "nombres": "RICHARD",
        "primer_apellido": "CAYOJA",
        "segundo_apellido": "VIRICOCHEA",
        "casada_apellido": "",
        "fecha_nacimiento": "1976-09-21T04:00:00.000Z",
        "direccion": "PROLOG. CAMPO JORDAN NO. 19 Y UYUNI - OR."
      }
    }

    @apiError notFound NO se ha encontrado

    @apiErrorExample {json} Error-Response:
    HTTP/1.1 412 Not Found
    {
      "finalizado": false,
      "mensaje": "No se encontraron resultados coincidentes para su consulta. Por favor verifique sus datos.",
      "datos": null
    }
  */
};
