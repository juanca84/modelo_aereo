/**
 * Lógica del Negocio -> ParametroBL
 */

const dao = require('../../dao/dao');
const Q = require('q');

const registrarParametro = (body, models) => {
  const deferred = Q.defer();
  const parametroObj = body;
  parametroObj._usuario_creacion = body.audit_usuario.id_usuario;
  dao.crearRegistro(models.parametro, parametroObj)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const modificarParametro = (id, parametroObj, models) => {
  const deferred = Q.defer();
  const modificarObj = {};
  if (parametroObj.sigla) modificarObj.sigla = parametroObj.sigla;
  if (parametroObj.nombre) modificarObj.nombre = parametroObj.nombre;
  if (parametroObj.descripcion) modificarObj.descripcion = parametroObj.descripcion;
  if (parametroObj.orden >= 0) modificarObj.orden = parametroObj.orden;
  if (parametroObj.estado) modificarObj.estado = parametroObj.estado;
  modificarObj._usuario_modificacion = parametroObj.audit_usuario.id_usuario;
  obtenerParametroPorId(id, models)
    .then(respuesta => {
      if (respuesta === PARAMETRO_ID_UNIDAD_MEDIDA_OTROS || respuesta === PARAMETRO_TIPO_ORGANIZACION_OTROS) {
        throw new Error("No puede modificar el parámetro 'Otros'.")
      }
      return dao.modificarRegistro(models.parametro, id, modificarObj);
    }).then(respuestaMod => deferred.resolve(respuestaMod))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const eliminarParametro = (id, models) => {
  const deferred = Q.defer();
  obtenerParametroPorId(id, models)
    .then(respuesta => {
      if (respuesta === PARAMETRO_ID_UNIDAD_MEDIDA_OTROS || respuesta === PARAMETRO_TIPO_ORGANIZACION_OTROS) {
        throw new Error("No puede eliminar el parámetro 'Otros'.")
      }
      return dao.eliminarRegistro(models.parametro, id);
    })
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
}

const listarParametros = (query, models) => {
  const deferred = Q.defer();
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
  parametros.attributes = ["id_parametro", "grupo", "sigla", "nombre", "descripcion", "orden", "estado"];
  parametros.order = 'grupo, orden';
  if (parametros.where) {
    parametros.where.estado = 'ACTIVO';
  } else {
    parametros.where = {
      estado: "ACTIVO",
    };
  }
  parametros.where.grupo = ['ACTIVIDAD'];

  if (query.grupo) {
    parametros.where.grupo = query.grupo;
  }
  if (query.fid_formulario) {
    parametros.include = [{
      required: true,
      model: models.parametro_formulario,
      as: 'parametros_formulario',
      attributes: [],
      where: {
        fid_formulario: query.fid_formulario,
      },
    }];
    parametros.where.grupo = query.grupo;
  }
  if (query.grupo == PARAMETRO_GRUPO_SERVICIO) {
    parametros.include = parametros.include ? parametros.include : [];
    if (query.fid_parametro_padre) {
      parametros.where.fid_parametro_padre = query.fid_parametro_padre;;
    } else {
      parametros.include.push({
        model: models.parametro,
        as: 'parametro_padre',
        attributes: ["id_parametro", "grupo", "sigla", "nombre", "descripcion", "orden", "estado"],
        where: { fid_parametro_padre: null },
      });
    }
  }
  dao.listarRegistros(models.parametro, parametros, paginado)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerParametroPorId = (id, models) => {
  const deferred = Q.defer();
  const parametros = { attributes: ["id_parametro", "grupo", "sigla", "nombre", "descripcion", "orden", "estado"] };
  dao.obtenerRegistroPorId(models.parametro, id, parametros)
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

const obtenerParametro = (parametros, models) => {
  const deferred = Q.defer();
  dao.obtenerRegistro(models.parametro, parametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const listarActividades = (query, models) => {
  const deferred = Q.defer();
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
  parametros.attributes = ["id_parametro", "grupo", "nombre"];
  parametros.order = 'grupo, orden';
  if (parametros.where) {
    parametros.where.estado = 'ACTIVO';
  } else {
    parametros.where = {
      estado: "ACTIVO",
    };
  }
  parametros.where.grupo = ['ACTIVIDAD'];

  if (query.grupo) {
    parametros.where.grupo = query.grupo;
  }
  if (query.fid_formulario) {
    parametros.include = [{
      required: true,
      model: models.parametro_formulario,
      as: 'parametros_formulario',
      attributes: [],
      where: {
        fid_formulario: query.fid_formulario,
      },
    }];
    parametros.where.grupo = query.grupo;
  }
  if (query.grupo == PARAMETRO_GRUPO_SERVICIO) {
    parametros.include = parametros.include ? parametros.include : [];
    if (query.fid_parametro_padre) {
      parametros.where.fid_parametro_padre = query.fid_parametro_padre;;
    } else {
      parametros.include.push({
        model: models.parametro,
        as: 'parametro_padre',
        attributes: ["id_parametro", "grupo", "sigla", "nombre", "descripcion", "orden", "estado"],
        where: { fid_parametro_padre: null },
      });
    }
  }
  dao.listarRegistros(models.parametro, parametros, paginado)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const listarSocietarios = (tipo, models) => {
  const deferred = Q.defer();
  if (tipo == 'principales') {
    var parametros = {
      where: {
        id_parametro: [260, 261, 275],
      }
    }
    dao.listarRegistros(models.parametro, parametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
  } else if (tipo == 'todos') {
    var parametros = {
      where: {
        grupo: 'TIPO_SOCIETARIO',
      }
    }
    dao.listarRegistros(models.parametro, parametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
  } else if (tipo === 'tipoSocietario') {
    var parametros = {
      where: {
        grupo: 'TIPO_SOCIETARIO',
        sigla: {in: ["01", "02", "03", "04" ,"05", "06", "07", "08", "09", "10"]},
      }
    }
    dao.listarRegistros(models.parametro, parametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
  }
  return deferred.promise;
};

  const crearActividad = (models, cuerpoObj) => {
    const deferred = Q.defer();
    const objParametros = {where: {"parametro_id_parametro":cuerpoObj.id_parametro,"apm_id_apm":cuerpoObj.id_apm,"estado":'INACTIVO'}};
    dao.obtenerRegistro(models.actividad_apm, objParametros)
      .then(respuesta => {
        if (respuesta) {
          dao.modificarRegistro(models.actividad_apm,respuesta.id_actividad_apm,{"estado": 'ACTIVO'})
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        }
        else {
          const objParametros = {"parametro_id_parametro":cuerpoObj.id_parametro,"apm_id_apm":cuerpoObj.id_apm,"estado":'ACTIVO'};
          dao.crearRegistro(models.actividad_apm,objParametros)
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        }
      })
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const eliminarActividad = (models, cuerpoObj) => {
    const deferred = Q.defer();
    const objParametros = {
      include: [{
        model: models.parametro,
        as: 'actividad',
        through: {
          model: models.actividad_apm,
          where: {"apm_id_apm":cuerpoObj.id_apm, "parametro_id_parametro":cuerpoObj.id_parametro},
        },
      }],
      where: {"id_apm": cuerpoObj.id_apm},
    };
    dao.obtenerRegistro(models.apm,objParametros)
      .then(respuesta => {
        if (respuesta && cuerpoObj.id_apm!==undefined && cuerpoObj.id_parametro!= undefined) {
          dao.modificarRegistro(models.actividad_apm, respuesta.actividad[0].actividad_apm.id_actividad_apm,{"estado":"INACTIVO"});
          deferred.resolve(respuesta);
        } else {
          throw new Error("No se definieron ningun parametro");
          deferred.resolve(null);
        }
      })
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const listarActividad_Id = (id, models) => {
    const deferred = Q.defer();
    const objParametros = {
      attributes: [],
      include: [{
        attributes: ["id_parametro", "nombre"],
        model: models.parametro,
        as: 'actividad',
        through: {
          attributes: [],
          model: models.actividad_apm,
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

module.exports = {
  registrarParametro,
  modificarParametro,
  listarParametros,
  obtenerParametro,
  obtenerParametroPorId,
  eliminarParametro,
  listarActividades,
  listarSocietarios,
  crearActividad,
  eliminarActividad,
  listarActividad_Id,
}
