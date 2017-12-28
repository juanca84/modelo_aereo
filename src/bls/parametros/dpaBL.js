const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;

  //Listar
  const listarMunicipios = (model, body) => {
    const deferred = Q.defer();
    var parametros = {};
    parametros.where = {
      nivel_dpa: 4,
    };
    dao.listarRegistros(model, parametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const listarProvincias = (model, body) => {
    const deferred = Q.defer();
    var parametros = {};
    parametros.where = {
      nivel_dpa: 3,
    };
    dao.listarRegistros(model, parametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const listarDepartamentos = (model, body) => {
    const deferred = Q.defer();
    var parametros = {};
    parametros.where = {
      nivel_dpa: 2,
    };
    dao.listarRegistros(model, parametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  //Buscar
  const buscarDpa = (model, id) => {
    const deferred = Q.defer();
    dao.obtenerRegistroPorId(model, id)
      .then(respuesta => {
        if (respuesta)
          deferred.resolve(respuesta)
        else
          throw new Error('No se encuentran datos relacionados al id');
      })
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const obtenerHijos = (model, padre) => {
    const deferred = Q.defer();
    validaId(model, padre)
      .then(respuesta => model.findAll({
        where: {
          fid_dpa_superior: padre,
        },
      }))
      .then(respuesta => {
        if(respuesta.length != 0){
          deferred.resolve(respuesta)
        } else
          deferred.resolve("El elemento no tiene hijos");
      })
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const validaId = (model, idDpa) => {
    const deferred = Q.defer();
    model.findOne({
      where: {
        id_dpa: idDpa
      }
    })
      .then(respuesta => {
        if (respuesta)
          deferred.resolve(respuesta)
        else
          throw new Error('No existe el id enviado');
      })
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const crearDepartamento = (models, cuerpoObj) => {
    const deferred = Q.defer();
    const objParametros = {where: {"dpa_id_dpa":cuerpoObj.id_dpa,"apm_id_apm":cuerpoObj.id_apm,"estado":'INACTIVO'}};
    dao.obtenerRegistro(models.dpa_apm, objParametros)
      .then(respuesta => {
        if (respuesta) {
          dao.modificarRegistro(models.dpa_apm,respuesta.id_dpa_apm,{"estado": 'ACTIVO'})
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        }
        else {
          const objParametros = {"dpa_id_dpa":cuerpoObj.id_dpa,"apm_id_apm":cuerpoObj.id_apm,"estado":'ACTIVO'};
          dao.crearRegistro(models.dpa_apm,objParametros)
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        }
      })
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const eliminarDepartamento = (models, cuerpoObj) => {
    const deferred = Q.defer();
    const objParametros = {
      include: [{
        model: models.dpa,
        as: 'dpa',
        through: {
          model: models.dpa_apm,
          where: {"apm_id_apm":cuerpoObj.id_apm, "dpa_id_dpa":cuerpoObj.id_dpa},
        },
      }],
      where: {"id_apm": cuerpoObj.id_apm},
    };
    dao.obtenerRegistro(models.apm,objParametros)
      .then(respuesta => {
        if (respuesta && cuerpoObj.id_apm!==undefined &&cuerpoObj.id_dpa!= undefined) {
          dao.modificarRegistro(models.dpa_apm, respuesta.dpa[0].dpa_apm.id_dpa_apm,{"estado":'INACTIVO'});
          deferred.resolve(respuesta);
        } else {
          throw new Error("No se definieron ningun parametro");
          deferred.resolve(null);
        }
      })
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const listarDepartamento_Id = (id, models) => {
    const deferred = Q.defer();
    const objParametros = {
      attributes: [],
      include: [{
        attributes: ["id_dpa", "nombre"],
        model: models.dpa,
        as: 'dpa',
        through: {
          attributes: [],
          model: models.dpa_apm,
          where: {"estado":'ACTIVO'}
        },
      }],
      where: {"id_apm": id},
    };
    dao.listarRegistros(models.apm, objParametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const municipioBL = {
    listarMunicipios,
    listarProvincias,
    listarDepartamentos,
    buscarDpa,
    // crearMunicipio,
    // actualizarMunicipio,
    // eliminarMunicipio,
    obtenerHijos,
    crearDepartamento,
    eliminarDepartamento,
    listarDepartamento_Id,
  };

  return municipioBL;
};

