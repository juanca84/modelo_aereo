const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const parametroBL = require('../parametros/parametroBL');

module.exports = app => {
  const models = app.src.db.models;

  const listarMinerales = (model, parametros) => {
    const deferred = Q.defer();
    dao.listarRegistros(model, parametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const listarMineral_Id = (id, models) => {
    const deferred = Q.defer();
    const objParametros = {
      attributes: [],
      include: [{
        attributes: ["id_mineral", "grupo", "nombre", "descripcion", "orden"],
        model: models.mineral,
        through: {
          attributes: [],
          model: models.mineral_apm,
          where: {"estado":'ACTIVO'},
        },
      }],
      where: {"id_apm": id},
    };
    dao.listarRegistros(models.apm, objParametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const crearMineral = (models, cuerpoObj) => {
    const deferred = Q.defer();
    const objParametros = {where: {"mineral_id_mineral":cuerpoObj.id_mineral,"apm_id_apm":cuerpoObj.id_apm,"estado":'INACTIVO'}};
    dao.obtenerRegistro(models.mineral_apm, objParametros)
      .then(respuesta => {
        if (respuesta) {
          dao.modificarRegistro(models.mineral_apm,respuesta.id_mineral_apm,{"estado": 'ACTIVO'})
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        }
        else {
          const objParametros = {"mineral_id_mineral":cuerpoObj.id_mineral,"apm_id_apm":cuerpoObj.id_apm,"estado":'ACTIVO'};
          dao.crearRegistro(models.mineral_apm,objParametros)
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        }
      })
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const eliminarMineral = (models, cuerpoObj) => {
    const deferred = Q.defer();
    console.log(cuerpoObj);
    const objParametros = {
      include: [{
        model: models.mineral,
        through: {
          model: models.mineral_apm,
          where: {"apm_id_apm": cuerpoObj.id_apm, "mineral_id_mineral": cuerpoObj.id_mineral},
        }
      }],
      where: {"id_apm": cuerpoObj.id_apm},
    };
    dao.obtenerRegistro(models.apm,objParametros)
      .then(respuesta => {
        if (respuesta && cuerpoObj.id_apm!==undefined &&cuerpoObj.id_mineral!= undefined) {
          dao.modificarRegistro(models.mineral_apm, respuesta.minerals[0].mineral_apm.id_mineral_apm,{"estado":'INACTIVO'});
          deferred.resolve(respuesta);
        } else {
          throw new Error("No se definieron ningun parametro");
          deferred.resolve(null);
        }
      })

      .catch(error => deferred.reject(error));
    return deferred.promise;
  };


  const mineralBL = {
    listarMinerales,
    listarMineral_Id,
    crearMineral,
    eliminarMineral,
  };

  return mineralBL;
};
