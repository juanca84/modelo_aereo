const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const config = require('konfig')();
const parametroBL = require('../parametros/parametroBL');
const uuid = require('uuid');

  const crearRum = (body, models, transaccion) => {
    const deferred = Q.defer();
    if (body.nit !== undefined) {
      dao.obtenerRegistro(models.apm, {where: {nit: body.nit}})
        .then(respuesta => {
          if (!respuesta || respuesta.nit == null) {
            const parametros = {"nit": body.nit, "rum": body.nit, "estado": 'ACTIVO', "estado_rum": 'NUEVO', "fid_usuario": body.audit_usuario ? body.audit_usuario.id_usuario : body.id_usuario}
            dao.crearRegistro(models.apm, parametros, false, transaccion)
              .then(respuesta => deferred.resolve(dao.obtenerRegistro(models.apm, {where: {nit: body.nit}})))
              .catch(error => deferred.reject(error));
          } else {
              throw new Error("No se puede crear otro tramite RUM con el mismo NIT");
          }
        })
        .catch(error => deferred.reject(error));
    }
    else if (body.rum !== undefined) {
      dao.obtenerRegistro(models.apm, {where: {rum: body.rum}})
        .then(respuesta => {
          if (!respuesta) {
            const parametros = {"rum": body.rum, "estado": 'ACTIVO', "estado_rum": 'NUEVO', "fid_usuario": body.audit_usuario.id_usuario}
            dao.crearRegistro(models.apm, parametros)
              .then(respuesta => deferred.resolve(dao.obtenerRegistro(models.apm, {where: {nit: null,rum: body.rum}})))
              .catch(error => deferred.reject(error));
          } else {
            throw new Error("No se puede crear otro tramite RUM con el mismo CODIGO");
          }
        })
        .catch(error => deferred.reject(error));
    }
    else {
      throw new Error("NIT y RUM no estan definidos");
    }
    return deferred.promise;
  };

  const modificarRum = (models, cuerpoObj) => {
    const deferred = Q.defer();
    parametroBL.listarSocietarios('tipoSocietario', models)
    .then(respuesta => {
      respuesta.forEach(tipoSoc => {
        if (tipoSoc.sigla === cuerpoObj.tipo_societario) {
          cuerpoObj.tipo_societario = tipoSoc.id_parametro
        }
      });
      const objParametros = {
        "razon_social": cuerpoObj.razon_social,
        "matricula_comercio": cuerpoObj.matricula_comercio,
        "fid_par_sector": cuerpoObj.sector,
        "fid_par_clase": cuerpoObj.clase,
        "fid_par_tipo_societario": cuerpoObj.tipo_societario,
        "fid_par_tipo_entidad_publica": cuerpoObj.tipo_entidad_publica,
        "fid_par_tipo_apm": cuerpoObj.tipo_apm,
        "nro_afcoop": cuerpoObj.nro_afcoop,
        "nro_resolucion_afcoop": cuerpoObj.nro_resolucion_afcoop,
        "fecha_afcoop": cuerpoObj.fecha_afcoop,
        "denominacion": cuerpoObj.denominacion,
        "actividad_matricula": cuerpoObj.actividad_matricula,
        "ruta_resolucion_afcoop": cuerpoObj.ruta_resolucion_afcoop
      };
      return dao.modificarRegistro(models.apm, cuerpoObj.id_apm, objParametros)
    })
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const obtenerRum_id = (id, models) => {
    const deferred = Q.defer();
    const objParametros = {
      attributes: ["id_apm", "nit", "rum", "razon_social", "matricula_comercio", "fid_par_sector", "fid_par_clase", "nro_resolucion_afcoop", "nro_afcoop", "fecha_afcoop" ,
        "nro_asociado" ,"ruta_resolucion_afcoop" ,"estado", "estado_rum", "actividad_matricula", "denominacion",
        "fid_usuario" , "fid_par_tipo_societario" , "fid_par_tipo_organizacion" , "fid_par_tipo_apm", "fid_par_tipo_entidad_publica"],
      include: [{
        attributes: ["id_persona", "documento_identidad", "fecha_nacimiento", "nombres", "primer_apellido", "segundo_apellido", "telefono", "correo_electronico", "direccion"],
        model: models.persona,
        as: 'representante',
        through: {attributes: ["celular"],model: models.representante_legal},
      },{
        attributes: ["id_persona", "documento_identidad", "fecha_nacimiento", "nombres", "primer_apellido", "segundo_apellido", "telefono", "correo_electronico", "direccion"],
        model: models.persona,
        as: 'asociado',
        through: {attributes:["tipo", "cargo"],model:models.asociado,where:{"estado":'ACTIVO'}},
      },{
        attributes: ["id_parametro", "sigla"],
        model: models.parametro,
        as: 'actividad',
        through: {attributes: [],model: models.actividad_apm},
      },{
        model: models.ubicacion,
        as: 'ubicaciones',
      },{
        attributes: ["id_mineral", "grupo", "nombre", "descripcion", "orden"],
        model: models.mineral,
        through: {attributes: [],model: models.mineral_apm,},
      },{
        attributes: ["id_dpa", "nombre"],
        model: models.dpa,
        as: 'dpa',
        through: {attributes: [],model: models.dpa_apm},
      }],
      where: {"id_apm": id},
      };
      dao.obtenerRegistro(models.apm, objParametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const crearRepresentante = (models, cuerpoObj) => {
    const deferred = Q.defer();
    var f = new Date();
    const parametros = {where: {"documento_identidad": cuerpoObj.ci, "fecha_nacimiento":cuerpoObj.fecha_nacimiento}};
      dao.obtenerRegistro(models.persona, parametros)
        .then(respuesta => {
          if (respuesta && cuerpoObj.id_apm!==undefined && cuerpoObj.ci!==undefined) {
            const objParametros = {
              "propietario": cuerpoObj.propietario,
              "estado": 'ACTIVO',
              "celular": 1234567,
              "_fecha_entrada": f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate(),
              "persona_id_persona": respuesta.id_persona,
              "apm_id_apm": cuerpoObj.id_apm,
            };
            dao.crearRegistro(models.representante_legal, objParametros)
              .then(respuesta => deferred.resolve(respuesta))
              .catch(error => deferred.reject(error));
          } else {
            throw new Error("No se definió ningún parámetro");
            deferred.resolve(null);
          }
        })
        .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const modificarRepresentante = (models, cuerpoObj) => {
    const deferred = Q.defer();
    const objParametros = {
      include: [{
        model: models.persona,
        as: 'representante',
        through: {
          model: models.representante_legal,
        },
        where: {"documento_identidad":cuerpoObj.ci,"fecha_nacimiento":cuerpoObj.fecha_nacimiento},
      }],
      where: {"id_apm": cuerpoObj.id_apm},
    };
    dao.obtenerRegistro(models.apm, objParametros)
      .then(respuesta => {
        if (respuesta && cuerpoObj.id_apm!==undefined && cuerpoObj.ci!==undefined) {
          const parametros = {
            "correo_electronico":cuerpoObj.correo,
            "direccion":cuerpoObj.direccion};
          dao.modificarRegistro(models.persona, respuesta.representante[0].id_persona, parametros)
            .then(respuesta1=>{
              if(respuesta1){
                dao.modificarRegistro(models.representante_legal, respuesta.representante[0].representante_legal.id_representante_legal, {"celular":cuerpoObj.celular})
                deferred.resolve("datos modificados correctamente");
              }
            })
        } else {
          throw new Error("No se definió ningún parámetro");
          deferred.resolve(null);
        }
      })
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const eliminarRepresentante = (models, cuerpoObj) => {
    const deferred = Q.defer();
    var f = new Date();
    const objParametros = {
      include: [{
        model: models.persona,
        as: 'representante',
        through: {
          model: models.representante_legal,
        },
        where: {"documento_identidad":cuerpoObj.ci,"fecha_nacimiento":cuerpoObj.fecha_nacimiento},
      }],
      where: {"id_apm": cuerpoObj.id_apm},
    };
    dao.obtenerRegistro(models.apm, objParametros)
      .then(respuesta => {
        if (respuesta && cuerpoObj.id_apm!==undefined && cuerpoObj.ci!==undefined) {
          const objParametros = {"estado":'INACTIVO',"_fecha_salida":f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate()};
          dao.modificarRegistro(models.representante_legal, respuesta.representante[0].representante_legal.id_representante_legal, objParametros);
          dao.eliminarRegistro(models.representante_legal, respuesta.representante[0].representante_legal.id_representante_legal);
          deferred.resolve(respuesta);
        } else {
          throw new Error("No se definió ningún parámetro");
          deferred.resolve(null);
        }
      })
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const obtenerRepresentante_id = (id, models) => {
    const deferred = Q.defer();
    const objParametros = {
      attributes: [],
      include: [{
        attributes: ["id_persona", "documento_identidad", "fecha_nacimiento", "nombres", "primer_apellido", "segundo_apellido", "telefono", "correo_electronico", "direccion"],
        model: models.persona,
        as: 'representante',
        through: {
          attributes: ["id_representante_legal", "propietario", "ruta_adjunta", "celular"],
          model: models.representante_legal,
        },
      }],
      where: {"id_apm": id},
    };
    dao.obtenerRegistro(models.apm, objParametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const crearAsociado = (models, cuerpoObj) => {
    const deferred = Q.defer();
    let objParametros={};
    const parametros = {
      include: [{
        model: models.persona,
        as: 'asociado',
        through: {
          model: models.asociado,
        },
        where: {"documento_identidad":cuerpoObj.ci,"fecha_nacimiento":cuerpoObj.fecha_nacimiento},
      }],
      where: {"id_apm": cuerpoObj.id_apm},
    };
    dao.obtenerRegistro(models.apm, parametros)
      .then(respuesta => {
        if (respuesta) {
          dao.modificarRegistro(models.asociado,respuesta.asociado[0].asociado.id_asociado,{"estado":'ACTIVO'})
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        }
        else {
          dao.obtenerRegistro(models.persona, {where: {"documento_identidad": cuerpoObj.ci,"fecha_nacimiento":cuerpoObj.fecha_nacimiento}})
            .then(respuesta => {
              if (respuesta) {
                if (cuerpoObj.tipo === undefined) {
                  objParametros = {
                    "estado": 'ACTIVO',
                    "tipo": 'ASOCIADO',
                    "_fecha_entrada": new Date(),
                    "persona_id_persona": respuesta.id_persona,
                    "apm_id_apm": cuerpoObj.id_apm
                  };
                }
                else {
                  objParametros = {
                    "estado": 'ACTIVO',
                    "tipo": cuerpoObj.tipo,
                    "cargo": cuerpoObj.cargo,
                    "_fecha_entrada": new Date(),
                    "persona_id_persona": respuesta.id_persona,
                    "apm_id_apm": cuerpoObj.id_apm
                  };
                }
                dao.crearRegistro(models.asociado, objParametros)
                  .then(respuesta => deferred.resolve(respuesta))
                  .catch(error => deferred.reject(error));
                deferred.resolve(respuesta);
              }
            })
            .catch(error => deferred.reject(error));
        }
      })
    return deferred.promise;
  };

  const eliminarAsociado = (models, cuerpoObj) => {
    const deferred = Q.defer();
    var f = new Date();
    const objParametros = {
      include: [{
        model: models.persona,
        as: 'asociado',
        through: {
          model: models.asociado,
        },
        where: {"documento_identidad":cuerpoObj.ci,"fecha_nacimiento":cuerpoObj.fecha_nacimiento},
      }],
      where: {"id_apm": cuerpoObj.id_apm},
    };
    dao.obtenerRegistro(models.apm, objParametros)
      .then(respuesta => {
        if (respuesta && cuerpoObj.id_apm!==undefined && cuerpoObj.ci!==undefined) {
          const objParametros = {"estado":'INACTIVO',"_fecha_salida":f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate()};
          return dao.modificarRegistro(models.asociado, respuesta.asociado[0].asociado.id_asociado, objParametros);
        } else {
          throw new Error("No se definió ningún parámetro");
          deferred.resolve(null);
        }
      })
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const listarAsociado_Id = (id, models) => {
    const deferred = Q.defer();
    const objParametros = {
      attributes: [],
      include: [{
        attributes: ["id_persona", "nombres", "primer_apellido", "segundo_apellido", "documento_identidad", "fecha_nacimiento"] ,
        model: models.persona,
        as: 'asociado',
        through: {
          attributes: ["cargo", "tipo"],
          model: models.asociado,
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

const modificarAsociado = (models, cuerpoObj) => {
  const deferred = Q.defer();
  const parametros = {
              include: [{
                model: models.persona,
                as: 'asociado',
                through: {
                  model: models.asociado,
                },
                where: {"documento_identidad":cuerpoObj.ci},//,"fecha_nacimiento":cuerpoObj.fecha_nacimiento},
              }],
              where: {"id_apm": cuerpoObj.id_apm},
            };
  dao.obtenerRegistro(models.apm, parametros)
    .then(respuesta => {
            if (respuesta) {
                if (cuerpoObj.tipo === undefined) {
                  objParametros = {"tipo": 'ASOCIADO',
                                    "_fecha_modificacion": new Date()};
                }
                else {
                  objParametros = {"tipo": cuerpoObj.tipo,
                                  "cargo": cuerpoObj.cargo,
                                  "_fecha_modificacion": new Date()};
                }
              dao.modificarRegistro(models.asociado,respuesta.asociado[0].asociado.id_asociado,objParametros)
                .then(respuesta => deferred.resolve(respuesta))
                .catch(error => deferred.reject(error))
            }
            else {
                deferred.reject(new Error('Registro no encontrado'))
            }
          })
    .catch(error => deferred.reject(error))
  return deferred.promise;
};

const crearUbicacion = (models, cuerpoObj, transaccion) => {
  const deferred = Q.defer();
  var f = new Date();
  var miswich = true;
  const objParametros = {
    'tipo': cuerpoObj.tipo,
    'zona': cuerpoObj.zona,
    'avenida_calle': cuerpoObj.avenida_calle,
    'avenida_calle_referencia': cuerpoObj.avenida_calle_referencia,
    'numero': cuerpoObj.numero,
    'edificio': cuerpoObj.edificio || null,
    'piso': cuerpoObj.piso ||  null,
    'telefonos': cuerpoObj.telefonos,
    'correo': cuerpoObj.correo,
    'latitud': cuerpoObj.latitud || 0,
    'longitud': cuerpoObj.longitud || 0,
    'imagen_ubicacion': cuerpoObj.imagen_ubicacion,
    'estado':"ACTIVO",
    '_usuario_creacion': cuerpoObj.audit_usuario.id_usuario,
    '_fecha_creacion': f,
    '_fecha_modificacion':f,
    'fid_dpa': cuerpoObj.id_dpa,
    'fid_apm': cuerpoObj.id_apm
  };
  if (objParametros.tipo == undefined || objParametros.tipo == null  ){
    miswich = false;
  }
  if (objParametros.zona == undefined  || objParametros.zona == null  ){
    miswich = false;
  }
  if (objParametros.avenida_calle == undefined || objParametros.avenida_calle == null  ){
    miswich = false;
  }
  if (objParametros.numero == undefined  || objParametros.numero == null){
    miswich = false;
  }
  if (objParametros.telefonos == undefined || objParametros.telefonos == null){
    miswich = false;
  }
  if (objParametros.fid_dpa == undefined || objParametros.fid_dpa == null){
    miswich = false;
  }
  if (objParametros.fid_apm == undefined || objParametros.fid_apm == null){
    miswich = false;
  }

  if(cuerpoObj.tipo!='LEGAL') {

    dao.obtenerRegistro(models.apm, {where: {id_apm: cuerpoObj.id_apm}})
      .then(respuesta => {
        if (respuesta && miswich) {
          return dao.contarRegistros(models.ubicacion, {where: {fid_apm: cuerpoObj.id_apm, tipo: cuerpoObj.tipo, estado: "ACTIVO"}})
        }
        else{
          deferred.reject(new Error('Faltan datos obligatorios') );
        }
      })
      .then(respuesta => {
        if (cuerpoObj.tipo != 'CENTRAL' ) {
          deferred.resolve(dao.crearRegistro(models.ubicacion, objParametros, false, transaccion));
        }else if (cuerpoObj.tipo == 'CENTRAL' && respuesta== 0) {
          deferred.resolve(dao.crearRegistro(models.ubicacion, objParametros, false, transaccion));
        }else if (cuerpoObj.tipo == 'CENTRAL' && respuesta > 0){
          deferred.reject(new Error('Usted puede seleccionar solo una Ubicacion Central'));
        }else {
          deferred.reject('err');
        }
      })
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error ) );

  }
  else {
    dao.crearRegistro(models.ubicacion, objParametros)
      .then(respuesta => {
        if(respuesta){
          let parametro={};
          let orderListado = [];
          const order = 'DESC';
          orderListado=['id_ubicacion' , order];
          parametro={attributes: ["id_ubicacion"]};
          parametro.order=[orderListado];
          parametro.limit=1;
          dao.obtenerRegistro(models.ubicacion,parametro)
            .then(respuesta => {
              if(respuesta){
                deferred.resolve(respuesta.id_seguimiento_tramite);
                dao.modificarRegistro(models.representante_legal,1,{"fid_ubicacion":respuesta.id_ubicacion})
                  .then(respuesta1 => deferred.resolve(respuesta1))
                  .catch(error => deferred.reject(error));
              }
            })
            .catch(error => deferred.reject(error));
        }
      })
      .catch(error => deferred.reject(error));1
  }
  return deferred.promise;
};


const modificarUbicacion = (models, cuerpoObj) => {
    const deferred = Q.defer();
    const parametros = {"latitud":cuerpoObj.latitud, "longitud":cuerpoObj.longitud};
    dao.modificarRegistro(models.ubicacion, cuerpoObj.id_ubicacion, parametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };
  // lista todas las ubicaciones de una APM
  // id : id_apm
  const listarUbicacion = (models, id) => {
    const deferred = Q.defer();
    const parametros = {
      attributes: ["id_ubicacion" ,"tipo" ,"zona" ,
                    "avenida_calle" ,"avenida_calle_referencia" ,
                    "numero" ,"edificio" ,"piso" ,
                    "telefonos" ,"correo" ,"latitud" ,
                    "longitud" ,"imagen_ubicacion" ,
                    "fid_dpa"  ,"fid_apm" ],
      where: {"fid_apm": id ,"estado": "ACTIVO"},
    };
    if (id !== undefined) {
      dao.listarRegistros(models.ubicacion, parametros)
        .then(respuesta => deferred.resolve(respuesta))
        .catch(error => deferred.reject(error));
    } else {
      throw new Error('id_apm no esta definido');
    }
    return deferred.promise;
  };

const eliminarUbicacion = (models, cuerpoObj) => {
  const deferred = Q.defer();
  const objParametros = {
                          where: {
                            "id_ubicacion": cuerpoObj.id_ubicacion,
                            "fid_apm": cuerpoObj.id_apm,
                            "fid_dpa": cuerpoObj.id_dpa,
                            "estado": "ACTIVO"
                          },
                      };
  if (cuerpoObj.id_apm !== undefined && cuerpoObj.id_dpa != undefined) {
    dao.obtenerRegistro(models.ubicacion, objParametros)
      .then(respuesta => {
            if (respuesta ) {
              dao.modificarRegistro(models.ubicacion, cuerpoObj.id_ubicacion, {"estado": "INACTIVO"});
              deferred.resolve(respuesta);
            }
          })
      .catch(error => deferred.reject(error));
  } else {
    throw new Error('No se definieron ningun parametro');
  }
  return deferred.promise;
};

const listarUbicacionMunicipio = (models, id_municipio) => {
  const deferred = Q.defer();
  const objParametros = {
    attributes: ["id_dpa", "nombre", "fid_dpa_superior"],
      include: [{
        attributes: ["id_dpa", "nombre", "fid_dpa_superior"],
        model: models.dpa,
        as: 'dpa_superior',
        include: [{
          attributes: ["id_dpa",  "nombre", "fid_dpa_superior"],
          model: models.dpa,
          as: 'dpa_superior',
          include: [{
            attributes: ["id_dpa", "nombre" , "fid_dpa_superior"],
            model: models.dpa,
            as: 'dpa_superior'
          }],
        }],
      }],
    where: {id_dpa:id_municipio },
    order: ['id_dpa']
  };
  dao.listarRegistros(models.dpa, objParametros)
    .then(respuesta => {
          if (respuesta ) {
            deferred.resolve(respuesta);
          } else {
            throw new Error("No se definió ningún parámetro");
            deferred.resolve(null);
          }
        })
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const listarUbicaciondatos = (models, id) => {
  const deferred = Q.defer();
  const objParametros = {
    attributes: ["id_ubicacion" ,"tipo" ,"zona" ,
                  "avenida_calle" ,"avenida_calle_referencia" ,
                  "numero" ,"edificio" ,"piso" ,
                  "telefonos" ,"correo" ,"latitud" ,
                  "longitud" ,"imagen_ubicacion" ,
                  "fid_dpa"  ,"fid_apm" ],
    include:[{
                attributes: ["id_dpa", "nombre", "fid_dpa_superior"],
                include: [{
                  attributes: ["id_dpa", "nombre", "fid_dpa_superior"],
                  model: models.dpa,
                  as: 'dpa_superior',
                  include: [{
                    attributes: ["id_dpa",  "nombre", "fid_dpa_superior"],
                    model: models.dpa,
                    as: 'dpa_superior',
                    include: [{
                      attributes: ["id_dpa", "nombre" , "fid_dpa_superior"],
                      model: models.dpa,
                      as: 'dpa_superior'
                    }],
                  }],
                }],
            }],
    where: {"fid_apm": id ,"estado": "ACTIVO"},
  };
  if (id !== undefined) {
    dao.listarRegistros(models.dpa, objParametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
  } else {
    throw new Error('id_apm no esta definido');
  }
  return deferred.promise;
};

  const crearSeguimiento = (cuerpoObj, models) => {
    const deferred = Q.defer();
    var f = new Date();
    factual = f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate() + " " + f.getHours() + ":"+ f.getMinutes();
    if(cuerpoObj.codigo==101) {
      dao.modificarRegistro(models.apm, cuerpoObj.id_apm, {"estado_rum": 'ENVIADO'})
      .then(respuesta => {
              if (respuesta) {
                //console.log(' CUERPO ' + JSON.stringify(cuerpoObj));
                //deferred.resolve(dao.contarRegistros(models.seguimiento_tramite, {where: {"fid_apm": cuerpoObj.id_apm,"fid_tramite": 1}}))
                return dao.contarRegistros(models.seguimiento_tramite, {where: {"fid_apm": cuerpoObj.id_apm,"fid_tramite": "1"}});
              } else {
                throw new Error('Error en modificacion de estado ENVIADO');
                deferred.resolve(null);
              }
            })
        .then(respuesta =>{
              console.log(' respueta '+ JSON.stringify(respuesta));
              if(respuesta == 0) {
                  const parametros = {
                    "cod_tramite": cuerpoObj.codigo, "fecha": factual,
                    "transicion": 'ENVIADO', "estado": 'ACTIVO',
                    "fid_tramite": 1,
                    "fid_usuario_origen": cuerpoObj.audit_usuario.id_usuario,
                    "fid_apm": cuerpoObj.id_apm};
                  deferred.resolve( dao.crearRegistro(models.seguimiento_tramite, parametros))
              }else {
                  deferred.reject( new Error('existe el registro'));
              }
             })
        .then(respuesta => deferred.resolve(respuesta))
        .catch(error => deferred.reject(error));
    }
    else if(cuerpoObj.codigo ==301)
    { dao.modificarRegistro(models.nim, cuerpoObj.id_nim, {"estado_nim": 'ENVIADO'})
      .then(respuesta => {
            if (respuesta) {
              return dao.contarRegistros(models.seguimiento_tramite, {where: {"fid_apm": cuerpoObj.id_apm,"fid_tramite": "3"}});
            } else {
              throw new Error("Error");
              deferred.resolve(null);
            }
          })
      .then(respuesta =>{
            console.log(' respueta '+ JSON.stringify(respuesta));
            if(respuesta == 0) {
              const parametros = {
                "cod_tramite": cuerpoObj.codigo, "fecha": factual,
                "transicion": 'ENVIADO', "estado": 'ACTIVO',
                "fid_tramite": 3,
                "fid_usuario_origen": cuerpoObj.audit_usuario.id_usuario,
                "fid_nim": cuerpoObj.id_nim,
                "fid_apm": cuerpoObj.id_apm};
              deferred.resolve( dao.crearRegistro(models.seguimiento_tramite, parametros))
            }else {
              deferred.reject( new Error('existe el registro'));
            }
          })

      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    }
    else if(cuerpoObj.codigo==201)
    { dao.modificarRegistro(models.derecho_minero, cuerpoObj.id_derecho_minero, {"estado_derecho_minero": 'ENVIADO'})
      .then(respuesta => {
              if (respuesta) {
                const parametros = {
                  "cod_tramite": cuerpoObj.codigo, "fecha": factual,
                  "transicion": 'ENVIADO', "estado": 'ACTIVO',
                  "fid_tramite": 2,
                  "fid_usuario_origen": cuerpoObj.audit_usuario.id_usuario,
                  "fid_apm": cuerpoObj.id_apm,
                  "fid_derecho_minero": cuerpoObj.id_derecho_minero
                };
                return dao.crearRegistro(models.seguimiento_tramite, parametros);
              } else {
                throw new Error('Error');
                deferred.resolve(null);
              }
            })
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    }
    return deferred.promise;
  };

  const obtenerTramite = (id, models) => {
    console.log(id)
    const deferred = Q.defer();
    let objParametros ={};
    dao.listarRegistros(models.tramite, {where: {_usuario_creacion:id}})
      .then(respuesta => {
        if (respuesta) {
          objParametros = {
            attributes: { exclude:[ "_fecha_modificacion" ]},
              include: [{
                          attributes: ["id_entidad", "sigla", "nombre" ],
                          model:      models.entidad,
                          as: 'entidad'
                          //   through:    {attributes: [],model: models.representante_legal},
                        }],
                where: {"_usuario_creacion": id},
                      };
          dao.listarRegistros(models.tramite, objParametros)
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        }
        else {
          deferred.resolve(null);
        }
      })
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const modEstadoTramite = (model, cuerpoObj) => {
    // ver las condiciones para cambiar de estado
    const deferred = Q.defer();
    var f = new Date();
    const objParametros = {"estado":cuerpoObj.estado,"_usuario_modificacion":cuerpoObj.id_usuario,"_fecha_modificacion":f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate()};
    dao.modificarRegistro(model.tramite, cuerpoObj.id_tramite, objParametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const obtenerSeguimientoTramite = ( id_, transicion_ , models) => {
    const deferred = Q.defer();
    if ( id_!==undefined ) {
        const objParametros = {
        attributes: ["id_seguimiento_tramite","fecha","transicion","estado","fid_usuario_origen","fid_usuario_destino","fid_apm","cod_tramite","fid_tramite"],
        include: [{
                attributes: ["id_tramite", "denominacion", "abreviatura","fid_entidad"],
                model: models.tramite,
                as: 'tramite',
                include: [{
                    attributes: ["id_entidad", "sigla", "nombre", "nombre"],
                    model: models.entidad,
                    as: 'entidad',
                    //through: {attributes: [],model: models.asociado},
                    }]
              }],
          order: ['fecha']
          };
          objParametros.where={};
          if (transicion_=='FIRMADO') {
            objParametros.where =  {   "fid_apm": id_,"transicion":transicion_ };
          }
          else  if (transicion_=='RECHAZADO') {
            objParametros.where =  {   "fid_apm": id_,"transicion":transicion_ };
          }
          else if (transicion_ !=='FIRMADO' || transicion_ !='RECHAZADO' ) {
            objParametros.where =  { "fid_apm": id_,
                                     $or: [{"transicion": 'ENVIADO'}, {"transicion": 'OBSERVADO'},{"transicion": 'APROBADO'},{"transicion": 'CORREGIDO'}]  };
          }
         dao.listarRegistros(models.seguimiento_tramite, objParametros)
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
    }
    else {
      throw new Error("No se definio ningun parametro");
     // deferred.resolve(null);
    }
    return deferred.promise;
  };

  /**
   * Agrega un Activo Productivo
   * @param {int} idApm - Identificador de la certificación a la que pertenece el activo produdctivo
   * @param {Object} body - Cuerpo de la petición
   */
  const importarResolucionAfcoop = (req, idApm, models) => {
    const deferred = Q.defer();
    const audit_usuario = req.body.audit_usuario;
    if (!req.files) {
      deferred.reject(new Error(`Debe adjuntar un archivo pdf con la resolución afcoop de su cooperativa.`));
      return deferred.promise;
    }
    if (!req.files.file) {
      deferred.reject(new Error(`Debe adjuntar un archivo pdf con la resolución afcoop de su cooperativaddd.`));
      return deferred.promise;
    }
    const archivo = req.files.file;
    const extension = archivo.name.replace(/^.*\./, '');
    if (!(archivo.mimetype && (archivo.mimetype === MIMETYPE_PDF || extension === 'pdf'))) {
      deferred.reject(new Error(`El archivo que desea importar no responde al formato correcto. Por favor ingrese el documento en formato pdf.`));
      return deferred.promise;
    }
    const nombreBase = uuid.v1()
    const nombreArchivo = `${nombreBase}.${archivo.name.split('.')[archivo.name.split('.').length - 1]}`;
    const rutaArchivo = config.app.directorios.ruta_declaraciones_pdf + nombreArchivo;
    archivo.mv(rutaArchivo, err => { // archivo subido.. hacer algo
      if (err) {
        deferred.reject(new Error(`No se pudo cargar el archivo.`));
        return deferred.promise;
      } else {
        console.log('RUTA ARCHIVO:::' + rutaArchivo + 'ID APM::::' + idApm);
        models.apm.update(
          {
            ruta_resolucion_afcoop: rutaArchivo,
          }, {
            where: {
              id_apm: idApm,
            },
          })
          .then(respu => {
            if (respu[0] === 0)
              deferred.reject(new Error(`No se pudo cargar el archivo.`));
            else
              deferred.resolve("Se guardó el documento correctamente.")
            return deferred.promise;
          })
          .catch(error => deferred.reject(error));
      }
    })
    return deferred.promise;
  };

  /**
   * Agrega un Activo Productivo
   * @param {int} idApm - Identificador de la certificación a la que pertenece el activo produdctivo
   * @param {Object} body - Cuerpo de la petición
   */
  const importarResolucionAsociados = (req, idApm) => {
    const deferred = Q.defer();
    const audit_usuario = req.body.audit_usuario;
    if (!req.files) {
      deferred.reject(new Error(`Debe adjuntar un archivo pdf con la resolución afcoop de su cooperativa.`));
      return deferred.promise;
    }
    if (!req.files.file) {
      deferred.reject(new Error(`Debe adjuntar un archivo pdf con la resolución afcoop de su cooperativa.`));
      return deferred.promise;
    }
    const archivo = req.files.file;
    const extension = archivo.name.replace(/^.*\./, '');
    if (!(archivo.mimetype && (archivo.mimetype === MIMETYPE_PDF || extension === 'pdf'))) {
      deferred.reject(new Error(`El archivo que desea importar no responde al formato correcto. Por favor ingrese el documento en formato pdf.`));
      return deferred.promise;
    }
    const nombreBase = uuid.v1()
    const nombreArchivo = `${nombreBase}.${archivo.name.split('.')[archivo.name.split('.').length - 1]}`;
    const rutaArchivo = config.app.directorios.ruta_declaraciones_pdf + nombreArchivo;
    archivo.mv(rutaArchivo, err => { // archivo subido.. hacer algo
      if (err) {
        deferred.reject(new Error(`No se pudo cargar el archivo.`));
        return deferred.promise;
      } else {
        models.apm.update(
          {
            ruta_asociados: rutaArchivo,
          }, {
            where: {
              id_apm: idApm,
            },
          })
          .then(respu => {
            if (respu[0] === 0)
              deferred.reject(new Error(`No se pudo cargar el archivo.`));
            else
              deferred.resolve("Se guardó el documento correctamente.")
            return deferred.promise;
          })
          .catch(error => deferred.reject(error));
      }
    })
    return deferred.promise;
  };

  /**
   * Agrega un Activo Productivo
   * @param {int} idApm - Identificador de la certificación a la que pertenece el activo produdctivo
   * @param {Object} body - Cuerpo de la petición
   */
  const importarResolucionFederacion = (req, idApm) => {
    const deferred = Q.defer();
    const audit_usuario = req.body.audit_usuario;
    if (!req.files) {
      deferred.reject(new Error(`Debe adjuntar un archivo pdf con la resolución afcoop de su cooperativa.`));
      return deferred.promise;
    }
    if (!req.files.file) {
      deferred.reject(new Error(`Debe adjuntar un archivo pdf con la resolución afcoop de su cooperativa.`));
      return deferred.promise;
    }
    const archivo = req.files.file;
    const extension = archivo.name.replace(/^.*\./, '');
    if (!(archivo.mimetype && (archivo.mimetype === MIMETYPE_PDF || extension === 'pdf'))) {
      deferred.reject(new Error(`El archivo que desea importar no responde al formato correcto. Por favor ingrese el documento en formato pdf.`));
      return deferred.promise;
    }
    const nombreBase = uuid.v1()
    const nombreArchivo = `${nombreBase}.${archivo.name.split('.')[archivo.name.split('.').length - 1]}`;
    const rutaArchivo = config.app.directorios.ruta_declaraciones_pdf + nombreArchivo;
    archivo.mv(rutaArchivo, err => { // archivo subido.. hacer algo
      if (err) {
        deferred.reject(new Error(`No se pudo cargar el archivo.`));
        return deferred.promise;
      } else {
        models.apm.update(
          {
            ruta_federacion_cooperativa: rutaArchivo,
          }, {
            where: {
              id_apm: idApm,
            },
          })
          .then(respu => {
            if (respu[0] === 0)
              deferred.reject(new Error(`No se pudo cargar el archivo.`));
            else
              deferred.resolve("Se guardó el documento correctamente.")
            return deferred.promise;
          })
          .catch(error => deferred.reject(error));
      }
    })
    return deferred.promise;
  };

const statusRum = (id, models) => {
  const deferred = Q.defer();
  var mensajeFinal='';
  var sicentral=0,nocentral=0, silegal=0;
  const objParametros = {
        attributes: ["id_apm", "nit", "rum", "razon_social", "matricula_comercio", "fid_par_sector", "fid_par_clase", "nro_resolucion_afcoop", "nro_afcoop", "fecha_afcoop" ,
          "nro_asociado" ,"ruta_resolucion_afcoop" ,"estado", "estado_rum", "actividad_matricula", "denominacion",
          "fid_usuario" , "fid_par_tipo_societario" , "fid_par_tipo_organizacion" , "fid_par_tipo_apm", "fid_par_tipo_entidad_publica"],
        include: [{
          attributes: ["id_persona", "documento_identidad", "fecha_nacimiento", "nombres", "primer_apellido", "segundo_apellido", "telefono", "correo_electronico", "direccion"],
          model: models.persona,
          as: 'representante',
          through: {attributes: ["celular"],model: models.representante_legal,where:{"estado":"ACTIVO"}},
        },{
          attributes: ["id_persona", "documento_identidad", "fecha_nacimiento", "nombres", "primer_apellido", "segundo_apellido", "telefono", "correo_electronico", "direccion"],
          model: models.persona,
          as: 'asociado',
          through: {attributes: [],model: models.asociado,where:{"estado":"ACTIVO"}},
        },{
          attributes: ["id_parametro", "sigla"],
          model: models.parametro,
          as: 'actividad',
          through: {attributes: [],model: models.actividad_apm,where:{"estado":"ACTIVO"}},
        },{
          model: models.ubicacion,
          as: 'ubicaciones',
          include: [{model:models.dpa, as:'dpa',}],
         // where :{'estado':'ACTIVO'},
        },{
          attributes: ["id_mineral", "grupo", "nombre", "descripcion", "orden"],
          model: models.mineral,
          through: {attributes: [],model: models.mineral_apm,where:{"estado":"ACTIVO"}},
        },{
          attributes: ["id_dpa", "nombre"],
          model: models.dpa,
          as: 'dpa',
          through: {attributes: [],model: models.dpa_apm,where:{"estado":"ACTIVO"}},
        }],
        where: {"id_apm": id},
      };

  dao.obtenerRegistro(models.apm, objParametros)
    .then(respuesta => {
      if (respuesta) {
        if (respuesta.ruta_resolucion_afcoop == null || respuesta.ruta_resolucion_afcoop == undefined) {
          console.log(' No Adjunto la Resolucion AFCOOP');
          mensajeFinal = mensajeFinal + ' No Adjunto  Resolucion AFCOO ' + '\n';
        }

        if (respuesta.representante[0] == null) {
          console.log(' NO registro AL REPRESENTANTE ');
          mensajeFinal = mensajeFinal + '  NO registro  REPRESENTANTE  ' + '\n';
        }

        if (respuesta.asociado[0] == null) {
          console.log(' NO registro Al ASOCIADO');
          mensajeFinal = mensajeFinal + '  NO registro ASOCIADO ' + '\n';
        }

        if (respuesta.actividad[0] == null) {
          console.log(' NO registro la ACTIVIDAD');
          mensajeFinal = mensajeFinal + 'NO registro ACTIVIDAD ' + '\n';
        }

        if (respuesta.ubicaciones[0] == null || respuesta.ubicaciones[0].tipo == undefined) {
          console.log(' NO registro la UBICACION ');
          mensajeFinal = mensajeFinal + ' NO registro  UBICACION ' + '\n';
        }
        else {
            respuesta.ubicaciones.forEach(function (ubicacion) {
                (ubicacion.tipo == 'CENTRAL' && ubicacion.estado =='ACTIVO') ? sicentral=sicentral+1 : ((ubicacion.tipo == 'LEGAL' && ubicacion.estado =='ACTIVO')?  silegal  =silegal+1: nocentral=nocentral+1) ;
            })
            if (sicentral == 0) {console.log(' No registro UBICACION CENTRAL');mensajeFinal = mensajeFinal + ' No registro UBICACION CENTRAL' + '\n';}
            if (sicentral > 1)  {console.log(' Solo debe registrar una Ubicacion Central');mensajeFinal = mensajeFinal + ' Solo debe registrar una Ubicacion Central' + '\n';}
            if (silegal == 0)   {console.log(' No registro UBICACION LEGAL');mensajeFinal = mensajeFinal + ' No registro UBICACION LEGAL' + '\n';}
            if (silegal > 1)    {console.log(' Solo debe registrar una Ubicacion Legal');mensajeFinal = mensajeFinal + ' Solo debe registrar una Ubicacion Legal' + '\n';}
        }
        if (respuesta.minerals[0] == null) {
          console.log(' NO registro MINERALES ');
          mensajeFinal = mensajeFinal + ' NO registro MINERALES ' + '\n';
        }
        //  if (respuesta.dpa[0] == null)
        //    console.log (' NO registro DPA');

        deferred.resolve(mensajeFinal );//respuesta );
      }
      else
        deferred.reject(new Error ('No existe registro'));
    })
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

  module.exports = {
    crearRum,
    modificarRum,
    obtenerRum_id,
    crearRepresentante,
    modificarRepresentante,
    eliminarRepresentante,
    obtenerRepresentante_id,
    crearAsociado,
    eliminarAsociado,
    listarAsociado_Id,
    crearUbicacion,
    modificarUbicacion,
    listarUbicacion,
    modificarAsociado,
    eliminarUbicacion,
    listarUbicacionMunicipio,
    listarUbicaciondatos,
    crearSeguimiento,
    obtenerTramite,
    modEstadoTramite,
    obtenerSeguimientoTramite,
    importarResolucionAfcoop,
    importarResolucionAsociados,
    importarResolucionFederacion,
    statusRum
 };
