const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;

  //Listar
  const listarPersonas = (model, body) => {
    const deferred = Q.defer();
    var parametros = {};
    parametros = {
      //nivel_dpa: 4,
      attributes: [ "id_persona", "documento_identidad", "complemento_documento", "fecha_nacimiento", "nombres", "primer_apellido", "segundo_apellido", "casada_apellido", "genero", "direccion", "telefono", "estado", "tipo_documento", "correo_electronico", "nombre_completo", "discapacidad"],
      include: [{
          attributes: ["id_dpa", "nombre"],
          model: models.dpa,
          as: 'dpa',
      }],
      //where: { 'id_persona':  1}
    };
    dao.listarRegistros(model, parametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const personaBL = {
    listarPersonas
  };

  return personaBL;
};
