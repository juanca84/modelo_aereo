/**
 * Lógica del Negocio -> plantilla
 */

const dao = require('../../dao/dao');
const Q = require('q');

const modificarPlantilla = (id, plantillaObj, models) => {
  const deferred = Q.defer();
  const plantillaModel = models.plantilla;
  dao.modificarRegistro(plantillaModel, id, plantillaObj)
  .then(respuestaMod => deferred.resolve(respuestaMod))
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const listarPlantillas = (query, models) => {
  const deferred = Q.defer();
  const plantillaModel = models.plantilla;
  let parametros = {};
  let paginado = false;
  if (Object.keys(query).length != 0) {
    if (query.filter) {
      query.where = {
        nombre: {
          $iLike: `${query.filter}%`,
        },
      };
    }
    parametros = query;
    paginado = true;
  }
  parametros.attributes = ["id_plantilla", "nombre", "remitente", "asunto", "contenido", "estado", "tipo"];
  if (parametros.where) {
    parametros.where.estado = 'ACTIVO';
  } else {
    parametros.where = {
      estado: "ACTIVO",
    };
  }
  dao.listarRegistros(plantillaModel, parametros, paginado)
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerPlantillaPorId = (id, models) => {
  const deferred = Q.defer();
  const plantillaModel = models.plantilla;
  dao.obtenerRegistroPorId(plantillaModel, id)
  .then(respuesta => {
    if (respuesta) {
      deferred.resolve(respuesta);
    } else {
      throw new Error("No se ha encontrado el registro solicitado.")
    }
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerPlantilla = (parametros, models) => {
  const deferred = Q.defer();
  const plantillaModel = models.plantilla;
  dao.obtenerRegistro(plantillaModel, parametros)
  .then(respuesta => {
    if (respuesta) {
      deferred.resolve(respuesta);
    } else {
      throw new Error("No se ha encontrado el registro solicitado.")
    }
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

module.exports = {
  modificarPlantilla,
  listarPlantillas,
  obtenerPlantilla,
  obtenerPlantillaPorId,
}
