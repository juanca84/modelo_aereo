const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const parametroBL = require('../rum/tecnicoBL');
const handlebars = require('handlebars');
const listar = require('../rum/listarBL');
const plantillaBL = require('../parametros/plantillaBL');
const config = require('konfig')();

const titulo = (body, models) => {
  const deferred = Q.defer();
  let id;
  if (body.audit_usuario.id_rol==2 || body.audit_usuario.id_rol==3){id=1;}
  if (body.audit_usuario.id_rol==4 || body.audit_usuario.id_rol==5 || body.audit_usuario.id_rol==6){id=3;}
  if (body.audit_usuario.id_rol==8 || body.audit_usuario.id_rol==9 || body.audit_usuario.id_rol==10){id=2;}
  const objParametros= {
    attributes : ["id_tramite","codigo","denominacion","abreviatura","descripcion"],
    where: {"id_tramite":id}
  };
  dao.obtenerRegistro(models.tramite, objParametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
}

const listarId = (id, models) => {
  const deferred = Q.defer();
  const objParametros= {
    where: {"id_seguimiento_tramite":id}
  };
  dao.obtenerRegistro(models.seguimiento_tramite, objParametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
}

const listarSeguimientoTramite = (query, body, models) => {
  const deferred = Q.defer();
  let parametros = {};
  let paginado = true;
  let orderListado = [];
  if (query.order && query.order.length) {
    let order = 'ASC';
    if (query.order.startsWith('-')) {
      order = 'DESC';
      query.order = query.order.replace(/-/g, '');
    }
    if (query.order == 'tipo') {
      orderListado = [{ model: models.apm, as: 'apm' },'fid_par_tipo_apm', order];
    } else
    if (query.order == 'razon_social') {
      orderListado = [{ model: models.apm, as: 'apm' },'razon_social', order];
    } else
    if (query.order == 'denominacion') {
      orderListado = [{ model: models.apm, as: 'apm' },'denominacion', order];
    } else
    if (query.order == 'nit') {
      orderListado = [{ model: models.apm, as: 'apm' },'nit', order];
    } else
    if (query.order == 'matricula') {
      orderListado = [{ model: models.apm, as: 'apm' },'matricula', order];
    } else {
      orderListado = ['id_seguimiento_tramite', order];
    }
  }
  parametros= {
    include: [{
      model: models.tramite,
      as: 'tramite',
      attributes: ["id_tramite","codigo","denominacion","abreviatura","descripcion"],
    },{
      attributes: ["id_usuario","usuario"],
      model: models.usuario,
      as: 'usuarioOrigen',
      include: [{
        attributes: ["nombres","primer_apellido","segundo_apellido"],
        model: models.persona,
        as: 'persona',
      }]
    },{
      attributes: ["id_usuario","usuario"],
      model: models.usuario,
      as: 'usuarioDestino',
      include: [{
        attributes: ["nombres","primer_apellido","segundo_apellido"],
        model: models.persona,
        as: 'persona',
      }]
    },{
      model: models.apm,
      as: 'apm',
    }]
  };
  parametros.where={};
  if (body.audit_usuario.id_rol===2) {
    if (query.estado==='PENDIENTE') {
      parametros.where = {
        "cod_tramite": '101',
        "fid_usuario_destino": body.audit_usuario.id_usuario,
        $or: [{"transicion": 'ASIGNADO'}, {"transicion": 'OBSERVADO'}, {"transicion": 'CORREGIDO'}]
      };
    }
    if (query.estado==='APROBADO') {
      parametros.where = {
        "cod_tramite": '101',
        "fid_usuario_origen": body.audit_usuario.id_usuario,
        "transicion": query.estado
      };
    }
    if (query.estado==='RECHAZADO') {
      parametros.where = {
        "cod_tramite": '101',
        "fid_usuario_origen": body.audit_usuario.id_usuario,
        "transicion": query.estado
      };
    }
    if (query.estado==='ENVIADO') {
      parametros.where = {
        "cod_tramite": '101',
        "fid_usuario_destino": null,
        "transicion": query.estado
      };
    }
  }
  if (body.audit_usuario.id_rol===3) {
    if (query.estado==='APROBADO') {
      parametros.where =  {
        "cod_tramite": '101',
        "transicion": 'APROBADO'
      };
    }
    else{
      parametros.where =  {
        "cod_tramite": '',
        "transicion": ''
      };
    }
  }
  if (body.audit_usuario.id_rol===4) {
    if (query.estado==='PENDIENTE') {
      parametros.where =  {
        "cod_tramite": '301',
        "fid_usuario_destino": body.audit_usuario.id_usuario,
        $or: [{"transicion": 'ASIGNADO'}, {"transicion": 'OBSERVADO'},{"transicion": 'CORREGIDO'}]
      };
    }
    if (query.estado==='APROBADO') {
      parametros.where =  {
        "cod_tramite": '301',
        "fid_usuario_origen": body.audit_usuario.id_usuario,
        "transicion": query.estado
      };
    }
    if (query.estado==='RECHAZADO') {
      parametros.where =  {
        "cod_tramite": '301',
        "fid_usuario_origen": body.audit_usuario.id_usuario,
        "transicion": query.estado
      };
    }
  }
  if (body.audit_usuario.id_rol===5) {
    if (query.estado==='PENDIENTE') {
      parametros.where =  {
        "cod_tramite": '301',
        "fid_usuario_destino": body.audit_usuario.id_usuario,
        $or: [{"transicion": 'ASIGNADO'}]
      };
    }
    else {
      parametros.where =  {
        "cod_tramite": '301',
        "transicion": query.estado
      };
    }
  }
  if (body.audit_usuario.id_rol===6) {
    if (query.estado==='APROBADO') {
      parametros.where =  {
        "cod_tramite": '301',
        "transicion": 'APROBADO'
      };
    }
    else {
      parametros.where =  {
        "cod_tramite": '',
        "transicion": ''
      };
    }
  }
  if (body.audit_usuario.id_rol===8) {
    if (query.estado==='PENDIENTE') {
      parametros.where =  {
        "cod_tramite": '201',
        "fid_usuario_destino": body.audit_usuario.id_usuario,
        $or: [{"transicion": 'ASIGNADO'}, {"transicion": 'OBSERVADO'},{"transicion": 'CORREGIDO'}]
      };
    }
    if (query.estado==='APROBADO') {
      parametros.where =  {
        "cod_tramite": '201',
        "fid_usuario_origen": body.audit_usuario.id_usuario,
        "transicion": query.estado
      };
    }
    if (query.estado==='RECHAZADO') {
      parametros.where =  {
        "cod_tramite": '201',
        "fid_usuario_origen": body.audit_usuario.id_usuario,
        "transicion": query.estado
      };
    }
  }
  if (body.audit_usuario.id_rol===9) {
    if (query.estado==='PENDIENTE') {
      parametros.where =  {
        "cod_tramite": '201',
        $or: [{"transicion": 'ASIGNADO'}]
      };
    }
    else {
      parametros.where =  {
        "cod_tramite": '201',
        "transicion": query.estado
      };
    }
  }
  if (body.audit_usuario.id_rol===10) {
    if (query.estado==='APROBADO') {
      parametros.where =  {
        "cod_tramite": '201',
        "transicion": 'APROBADO'
      };
    }
    else {
      parametros.where =  {
        "cod_tramite": '',
        "transicion": ''
      };
    }
  }
  if (orderListado.length > 0) {
    parametros.order = [orderListado];
  }
  let detalle = [];
  dao.listarRegistros(models.seguimiento_tramite, parametros, paginado)
    .then(async respuesta => {
      if (respuesta){
        for (const item of respuesta){
          let datoRep={};
          if (item.fid_usuario_destino==null) {
            datoRep = {
              "id_seguimiento_tramite": item.id_seguimiento_tramite,
              "cod_tramite": item.cod_tramite,
              "fecha": item.fecha,
              "transicion": item.transicion,
              "estado": item.estado,
              "tramite": {
                "id_tramite": item.tramite.id_tramite,
                "codigo": item.tramite.codigo,
                "denominacion": item.tramite.denominacion,
                "abreviatura": item.tramite.abreviatura,
                "descripcion": item.tramite.descripcion,
              },
              "usuarioOrigen": {
                "id_usuario": item.usuarioOrigen.id_usuario,
                "usuario": item.usuarioOrigen.usuario,
                "persona": {
                  "nombres": null,
                  "primer_apellido": null,
                  "segundo_apellido": null,
                }
              },
              "usuarioDestino": {
                "id_usuario": null,
                "usuario": null,
                "persona": {
                  "nombres": null,
                  "primer_apellido": null,
                  "segundo_apellido": null,
                }
              },
              "apm": {
                "id_apm": item.apm.id_apm,
                "nit": item.apm.nit,
                "rum": item.apm.rum,
                "razon_social": item.apm.razon_social,
                "matricula_comercio": item.apm.matricula_comercio,
                "nro_afcoop": item.apm.nro_afcoop,
                "fecha_afcoop": item.apm.fecha_afcoop,
                "nro_asociado": item.apm.nro_asociado,
                "denominacion": item.apm.denominacion,
                "actividad_matricula": item.apm.actividad_matricula,
                "estado_rum": item.apm.estado_rum,
                "tipo": await tipoOrganizacion(item.apm.fid_par_tipo_apm, models),
                "departamento": await listarUbicacion(item.apm.id_apm, models)
              },
            }
          }
          else
          { datoRep = {
            "id_seguimiento_tramite": item.id_seguimiento_tramite,
            "cod_tramite": item.cod_tramite,
            "fecha": item.fecha,
            "transicion": item.transicion,
            "estado": item.estado,
            "tramite": {
              "id_tramite": item.tramite.id_tramite,
              "codigo": item.tramite.codigo,
              "denominacion": item.tramite.denominacion,
              "abreviatura": item.tramite.abreviatura,
              "descripcion": item.tramite.descripcion,
            },
            "usuarioOrigen":{
              "id_usuario": item.usuarioOrigen.id_usuario,
              "usuario": item.usuarioOrigen.usuario,
              "persona": {
                "nombres": item.usuarioOrigen.persona.nombres,
                "primer_apellido": item.usuarioOrigen.persona.primer_apellido,
                "segundo_apellido": item.usuarioOrigen.persona.segundo_apellido,
              }
            },
            "usuarioDestino":{
              "id_usuario": item.usuarioDestino.id_usuario,
              "usuario": item.usuarioDestino.id_usuario,
              "persona": {
                "nombres": item.usuarioDestino.persona.nombres,
                "primer_apellido": item.usuarioDestino.persona.primer_apellido,
                "segundo_apellido": item.usuarioDestino.persona.segundo_apellido,
              }
            },
            "apm": {
              "id_apm": item.apm.id_apm,
              "nit": item.apm.nit,
              "rum": item.apm.rum,
              "razon_social": item.apm.razon_social,
              "matricula_comercio": item.apm.matricula_comercio,
              "nro_afcoop": item.apm.nro_afcoop,
              "fecha_afcoop": item.apm.fecha_afcoop,
              "nro_asociado": item.apm.nro_asociado,
              "denominacion": item.apm.denominacion,
              "actividad_matricula": item.apm.actividad_matricula,
              "estado_rum": item.apm.estado_rum,
              "tipo": await tipoOrganizacion(item.apm.fid_par_tipo_apm, models),
              "departamento": await listarUbicacion(item.apm.id_apm, models)
            },
          }
          }
          detalle.push(datoRep);
        }
        deferred.resolve(detalle);
      }
      else {
        throw new Error("No existe ningun resgistro");
      }
    })
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const tipoOrganizacion = (id, models) => {
  const deferred = Q.defer();
  const objParametros= {
    attributes: ["nombre"],
    where: {"id_parametro":id}
  };
  dao.obtenerRegistro(models.parametro,objParametros)
    .then(respuesta => {
      if (respuesta) {
        return deferred.resolve(respuesta.nombre)
      } else {
        throw new Error("No existe un departamento asociado al registro.");
      }
    })
  return deferred.promise;
};

const listadoOrganizacion = (valor, models) => {
  const deferred = Q.defer();
  const objParametros= {
    where: {"grupo":valor}
  };
  dao.listarRegistros(models.parametro,objParametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const listadoOrganizacionId = (id, models) => {
  const deferred = Q.defer();
  const objParametros= {
    where: {"fid_parametro_padre":id}
  };
  dao.listarRegistros(models.parametro,objParametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const listarUbicacion = (id, models) => {
  const deferred = Q.defer();
  const objParametros= {
    include: [{
      model: models.ubicacion,
      as: "ubicaciones",
      where: {"fid_apm": id,"tipo":'CENTRAL'}
    },
    { model: models.dpa,
      as: 'dpa_superior',
      include: [{
        model: models.dpa,
        as: 'dpa_superior',
      }]
    }],
  };
  dao.obtenerRegistro(models.dpa, objParametros)
    .then(respuesta => {
      if (respuesta) {
        return deferred.resolve(respuesta.dpa_superior.dpa_superior.nombre)
      } else {
        throw new Error("No existe un departamento asociado al registro.");
      }
    })
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const cambiarEstado = (body, models) => {
  const deferred = Q.defer();
  let parametros={};
  const objParametros = {
    attributes: ["id_seguimiento_tramite","transicion","fid_apm","fid_usuario_origen","fid_usuario_destino"],
    include: [{
      attributes: ["id_apm","nit","rum","estado_rum"],
      model: models.apm,
      as: 'apm',
    }],
    where: {"id_seguimiento_tramite": body.id_seguimiento_tramite},
  };
  dao.obtenerRegistro(models.seguimiento_tramite, objParametros)
    .then(async respuesta => {
      if (respuesta) {
        if (body.audit_usuario.id_rol === 7) {
          await dao.modificarRegistro(models.apm, respuesta.fid_apm, {"estado_rum": body.estado})
            .then(async respuesta => {
              parametros = {
                "fid_usuario_origen": 12,
                "transicion": body.estado
              };
              await dao.modificarRegistro(models.seguimiento_tramite, body.id_seguimiento_tramite, parametros)
              deferred.resolve(listar.crearPdf(body, models))
            })
            .catch(error => deferred.reject(error));
        }
        if (body.audit_usuario.id_rol===2) {
          console.log("respuesta.fid_usuario_origen:              ",respuesta.fid_usuario_origen);
          parametros={
            "fid_usuario_origen":body.audit_usuario.id_usuario,
            "fid_usuario_destino":await usuario(body.audit_usuario.id_rol,body.estado,respuesta.fid_usuario_origen),
            "transicion":body.estado
          };
          await dao.modificarRegistro(models.seguimiento_tramite,body.id_seguimiento_tramite ,parametros)
            .then(async respuesta => {
              if (respuesta) {
                await dao.modificarRegistro(models.apm, respuesta.fid_apm ,{"estado_rum":body.estado})
                  .then(async respuesta1 => {
                    if (respuesta1 && body.estado === 'APROBADO') {
                      deferred.resolve(listar.crearPdf(body, models))
                    }
                    else {
                      correoObservacion(body.id_seguimiento_tramite, models);
                      deferred.resolve("SE MODIFICARON LOS ESTADOS")
                    }
                  })
                  .catch(error => deferred.reject(error));
              }
            })
            .catch(error => deferred.reject(error));
        }
        if (body.audit_usuario.id_rol===4) {
          parametros={
            "fid_usuario_origen":body.audit_usuario.id_usuario,
            "fid_usuario_destino": await usuario(body.audit_usuario.id_rol,body.estado,respuesta.fid_usuario_origen),
            "transicion":body.estado
          };
          await dao.modificarRegistro(models.seguimiento_tramite,body.id_seguimiento_tramite ,parametros)
            .then(async respuesta => {
              const parametro = {
                attributes: ["id_nim"],
                where: {"fid_apm": respuesta.fid_apm},
              };
              await dao.obtenerRegistro(models.nim,parametro)
                .then(async respuesta1 => {
                  await dao.modificarRegistro(models.nim, respuesta1.id_nim ,{"estado_nim":body.estado})
                    .then(respuesta1 => {
                      if (respuesta1 && body.estado=='APROBADO') {
                        deferred.resolve(listar.crearPdf(body, models))
                      }
                      else
                      { correoObservacion(body.id_seguimiento_tramite,models);
                        deferred.resolve("SE MODIFICARON LOS ESTADOS")
                      }
                    })
                    .catch(error => deferred.reject(error));
                })
                .catch(error => deferred.reject(error));
            })
            .catch(error => deferred.reject(error));
        }
      } else {
        throw new Error("Error");
      }
    })
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const usuario = (rol, estado, destino) => {
  const deferred = Q.defer();
  if(estado==='APROBADO'){
    if(rol==2){ return(3); }
    if(rol==4){ return(6); }
    if(rol==8){ return(10); }
  }
  else {return(destino); }
  return deferred.promise;
};

const usuarioDestino = (body, models) => {
  const deferred = Q.defer();
  const parametro = {"transicion":'ASIGNADO',"fid_usuario_origen":body.audit_usuario.id_usuario,"fid_usuario_destino":body.id_usuario};
  dao.modificarRegistro(models.seguimiento_tramite,body.id_seguimiento_tramite ,parametro)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const cargaTecnico = (body, models) => {
  const deferred = Q.defer();
  const objParametros = {
    attributes: ['id_usuario','usuario'],
    include: [{
      attributes: ['nombres','primer_apellido','segundo_apellido'],
      model: models.persona,
      as: 'persona',
      },{
      attributes: [],
      model: models.usuario_rol,
      as: 'usuarios_roles',
      where: {"fid_rol":4}
    }]
  };
  dao.listarRegistros(models.usuario,objParametros)
  .then(respuesta => {
    if (respuesta){
      deferred.resolve(crearTrabajo(models,respuesta));
    }
    else {
      throw new Error("No existe ningun tecnico nim");
    }
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

async function crearTrabajo (models, respuesta) {
  let detalle = [];
  for (const item of respuesta) {
    const datoRep = {
      "id_usuario": item.id_usuario,
      "usuario": item.usuario,
      "nombre": item.persona.nombres + " " + item.persona.primer_apellido + " " + item.persona.segundo_apellido,
      "trabajo": await contarEventos(models, item.id_usuario)
    }
    detalle.push(await datoRep);
  }
  return (await detalle);
};

const contarEventos = (models,usuario) => {
  const deferred = Q.defer();
  const parametros = {where: {"fid_usuario_destino": usuario,$or:[{"transicion": 'ASIGNADO'},{"transicion": 'OBSERVADO'}]}};
  dao.contarRegistros(models.seguimiento_tramite,parametros)
    .then(async respuesta => await deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const crearObservacion = (body, models) => {
  const deferred = Q.defer();
  const parametros = {
    "seccion":body.seccion,
    "descripcion":body.descripcion,
    "atendido":false,
    "fid_seguimiento_tramite":body.id_seguimiento_tramite};
  dao.crearRegistro(models.observacion,parametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const modificarObservacion = (body, models) => {
  const deferred = Q.defer();
  const objParametros = {
    attributes: ['id_observacion'],
    include: [{
      attributes: ['id_seguimiento_tramite'],
      model: models.seguimiento_tramite,
      as: 'seguimiento_tramite',
    }],
    where: {"id_observacion":body.id_observacion}
  };
  dao.obtenerRegistro(models.observacion,objParametros)
    .then(respuesta => {
      if (respuesta){
        const parametros = {"seccion":body.seccion,"descripcion":body.descripcion,"atendido":body.atendido};
        dao.modificarRegistro(models.observacion,respuesta.id_observacion,parametros)
          .then(respuesta => deferred.resolve(respuesta))
          .catch(error => deferred.reject(error));
      }
      else {
        throw new Error("No existe ninguna observacion");
      }
    })
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const eliminarObservacion = (body, models) => {
  const deferred = Q.defer();
  const objParametros = {
    attributes: ['id_observacion'],
    include: [{
      attributes: ['id_seguimiento_tramite'],
      model: models.seguimiento_tramite,
      as: 'seguimiento_tramite',
    }],
    where: {"id_observacion": body.id_observacion}
  };
  dao.obtenerRegistro(models.observacion,objParametros)
    .then(respuesta => {
      if (respuesta){
        dao.eliminarRegistro(models.observacion,respuesta.id_observacion)
          .then(respuesta => deferred.resolve(respuesta))
          .catch(error => deferred.reject(error));
      }
      else {
        throw new Error("No existe ninguna observacion");
      }
    })
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const listarObservaciones = (id, models) => {
  const deferred = Q.defer();
  const objParametros = {
    where: {"fid_seguimiento_tramite":id,"atendido":false}
  };
  dao.listarRegistros(models.observacion,objParametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const correoObservacion = (idSeguimiento, models) => {
  const deferred = Q.defer();
  let correoParams = {};
  let emailEnviar = '';
  const objParametros = {
    attributes: ['transicion', 'estado'],
    where: {
      id_seguimiento_tramite: idSeguimiento,
      estado: 'ACTIVO'
    },
    include: [{
      model: models.observacion,
      as: 'observaciones',
      attributes: ['seccion', 'descripcion'],
    }, {
      model: models.apm,
      as: 'apm',
      attributes: ['rum'],
      include: [{
        model: models.usuario,
        as: 'usuario',
        attributes: ['email', 'usuario'],
        include: [{
          model: models.persona,
          as: 'persona',
          attributes: ['nombres', 'primer_apellido', 'segundo_apellido'],
        }]
      }]
    }]
  };
  dao.listarRegistros(models.seguimiento_tramite, objParametros)
    .then(respuesta => {
      if (respuesta) {
        correoParams = {
          urlLogoMinisterio: `${config.app.urlLogoMinisterio}`,
          usuario: respuesta[0].apm.usuario.usuario,
          nombre: respuesta[0].apm.usuario.persona ? `${respuesta[0].apm.usuario.persona.nombres} ${respuesta[0].apm.usuario.persona.primer_apellido} ${respuesta[0].apm.usuario.persona.segundo_apellido}` : 'Usuario',
          observaciones: [],
        };
        if (respuesta[0].observaciones) {
          let obss = {};
          for (let index = 0; index < respuesta[0].observaciones.length; index++) {
            obss.seccion = respuesta[0].observaciones[index].seccion;
            obss.descripcion = respuesta[0].observaciones[index].descripcion;
            correoParams.observaciones.push(obss);
            obss = {};
          }
        }
        if (respuesta[0].apm && respuesta[0].apm.usuario) {
          emailEnviar = respuesta[0].apm.usuario.email;
        } else {
          throw new Error("No existe un email asociado al usuario.");
        }
        const parametros = {
          where: {
            nombre: PLANTILLA_CERTIFICACION_OBSERVAR,
            estado: ESTADO_ACTIVO,
          },
          attributes: ['remitente', 'origen', 'asunto', ['contenido', 'mensaje']],
        };
        return plantillaBL.obtenerPlantilla(parametros, models)
      } else {
        throw new Error("No existe un seguimiento asociado al id");
      }
    }).then(respuesta => {
      if (respuesta) {
        respuesta.dataValues.modo = 'html';
        respuesta.dataValues.correos = [emailEnviar];
        const template = handlebars.compile(respuesta.dataValues.mensaje);
        respuesta.dataValues.mensaje = template(correoParams);
        models.notificaciones(respuesta.dataValues);
        return respuesta;
      } else {
        throw new Error(`No se encuentra la plantilla de observaciones`);
      }
    })
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

module.exports = {
  titulo,
  listarSeguimientoTramite,
  tipoOrganizacion,
  listadoOrganizacion,
  listadoOrganizacionId,
  listarUbicacion,
  cambiarEstado,
  usuarioDestino,
  cargaTecnico,
  contarEventos,
  crearObservacion,
  modificarObservacion,
  eliminarObservacion,
  listarObservaciones,
  listarId,
  crearTrabajo,
  correoObservacion
};

