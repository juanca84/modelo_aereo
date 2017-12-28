const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const parametroBL = require('../parametros/parametroBL');
const servicios = require('../../servicios_web/servicio_ajam');

const crearDerechoMin = (body, models, transaccion) => {
  const deferred = Q.defer();
  var f = new Date();
  factual=f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate() + " " + f.getHours() + ":" + f.getMinutes();
  if (body.id_apm !== undefined) {
    dao.obtenerRegistro(models.derecho_minero, {where: {codigo_area_libre: body.codigo}})
      .then(respuesta => {
        if (!respuesta ) {
          const parametros = {"codigo_area_libre": body.codigo,
                "ruta_cuadriculado_minero": body.rutaCuadricula,
                "ruta_certificado_area_libre": body.rutaCertificadoAreaLibre,
                "fecha_solicitud": factual,
                "fecha_inicio_vigencia": body.finiciovigencia,
                "estado_derecho_minero": 'NUEVO',
                "estado": 'ACTIVO',
                "_fecha_creacion" : factual,
                "_fecha_modificacion":factual,
                "fid_entidad_gestionadora": body.id_entidad_gestionadora,//obligatorio
                "fid_actividad":body.id_actividad,
                "fid_tramite":body.id_tramite//obligatorio
                  }
          dao.crearRegistro(models.derecho_minero, parametros, false, transaccion)
            .then(respuesta => { const parametros_ = {"estado": 'ACTIVO',
                                                  "_fecha_creacion": factual,
                                                  "_fecha_modificacion": factual,
                                                  "derecho_minero_id_derecho_minero": respuesta.id_derecho_minero,
                                                  "apm_id_apm": body.id_apm};
                                                dao.crearRegistro(models.derecho_minero_apm, parametros_, false, transaccion);
                                                deferred.resolve(respuesta);
                               })
            .catch(error => deferred.reject(error));
        } else {
          throw new Error("codigo de area no esta libre");
        }
      })
      .catch(error => deferred.reject(error));
  }
  else {
    throw new Error("NIT y RUM no estan definidos");
  }
  return deferred.promise;
};
// id: es id_derecho_minero
const obtenerDerechoMinero_id = (id, models) => {
  const deferred = Q.defer();
  console.log('id ' + id)
  const objParametros = {
    attributes: [ "id_apm" ,"nit" ,"rum" , "razon_social" , "matricula_comercio" , "nro_afcoop" , "fecha_afcoop" ,
                  "nro_asociado" ,"ruta_resolucion_afcoop" ,"estado", "estado_rum", "actividad_matricula", "denominacion",
                  "fid_usuario" , "fid_par_tipo_societario" , "fid_par_tipo_organizacion" , "fid_par_tipo_apm"  ],
    include:[{
      attributes:  ["id_derecho_minero",
                    "codigo_area_libre",
                    "ruta_cuadriculado_minero",
                    "ruta_certificado_area_libre",
                    "fecha_inicio_vigencia",
                    "estado_derecho_minero",
                    "estado",
                    "fid_entidad_gestionadora",
                    "fid_actividad",
                    "fid_tramite"],
      model: models.derecho_minero,
      as: 'derechos_mineros',
      through: {attributes: [],model: models.derecho_minero_apm},
      where: {"id_derecho_minero": id},
    }],
  };
  dao.obtenerRegistro(models.apm, objParametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const modDerechoMin = ( models, body) => {
  const deferred = Q.defer();
  var f = new Date();
  var miswich = true;
  factual=f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate() + " " + f.getHours() + ":" + f.getMinutes();

  const objParametros = { "codigo_area_libre": body.codigo,
                          "ruta_cuadriculado_minero": body.rutaCuadricula,
                          "ruta_certificado_area_libre": body.rutaCertificadoAreaLibre,
                          "fecha_inicio_vigencia": body.finiciovigencia,
                          "estado_derecho_minero": body.estado_dm,
                          "_fecha_modificacion":factual,
                          "fid_entidad_gestionadora": body.id_entidad_gestionadora,//obligatorio
                          "fid_actividad":body.id_actividad,
                          "fid_tramite":body.id_tramite //obligatorio
                        }

  if (body.codigo == undefined || body.codigo == null  )
  { console.log (' El campo codigo es obligatorio');
    miswich = false;}
  if (body.estado_dm == undefined  || body.estado_dm == null  )
  { console.log (' El campo estado es obligatorio');
    miswich = false;}
  if (body.finiciovigencia == undefined || body.finiciovigencia == null  )
  { console.log (' El campo fecha inicio vigencia es obligatorio');
    miswich = false;}
  if (body.id_entidad_gestionadora == undefined  || body.id_entidad_gestionadora == null  )
  { console.log (' El campo id_entidad_gestionadora es obligatorio');
    miswich = false;}
  if ( body.id_tramite  == undefined || body.id_tramite  == null  )
  { console.log (' El campo id_tramite es obligatorio');
    miswich = false;}
  if (body.id_derecho_minero == undefined || body.id_derecho_minero == null  )
  { console.log (' El campo id_derecho_minero es obligatorio');
    miswich = false;}

  if ( miswich ) {
    dao.modificarRegistro(models.derecho_minero, body.id_derecho_minero, objParametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
  }
  else {
    deferred.reject(new Error('Faltan datos obligatorios') );
  }
  return deferred.promise;
};
// obtener derechos dado el apm, id es id_apm
const obtenerDerechoMinero_apm = (id, models) => {
  const deferred = Q.defer();
  console.log('id ' + id)
  //"codigo_area_libre",
  const objParametros = {
    attributes: [ "id_apm" ,"nit" ,"rum" , "razon_social" , "matricula_comercio" , "nro_afcoop" , "fecha_afcoop" ,
      "nro_asociado" ,"ruta_resolucion_afcoop" ,"estado", "estado_rum", "actividad_matricula", "denominacion",
      "fid_usuario" , "fid_par_tipo_societario" , "fid_par_tipo_organizacion" , "fid_par_tipo_apm"  ],
    include:[{
      attributes:  ["id_derecho_minero",
        "fid_area_minera_servicio",
        "fecha_inicio_vigencia",
        "estado_derecho_minero",
        "estado",
        "fid_entidad_gestionadora",
        "fid_actividad",
        "fid_tramite"],
      model: models.derecho_minero,
      as: 'derechos_mineros',
      through: {attributes: [],model: models.derecho_minero_apm},
      include:[{
        model: models.plan_trabajo,
        as: 'plan_trabajo',
        include:[{
          model: models.documento_plan_trabajo,
          as:'documento_plan_trabajo'
        }]
      }]
    }
    ],
    where: {"id_apm": id},
  };
  dao.obtenerRegistro(models.apm, objParametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerAreaMinera = (codigo, correlativo, fechaSolicitud) => {
  const deferred = Q.defer();
  console.log('id ' + id)
  servicios.obtenerArea(codigo, correlativo, fechaSolicitud)
    .then(respuesta => {
      const areaMinera = {
        "codigoArea": respuesta.codigoArea,
        "denominacionArea": respuesta.denominacionArea,
        "departamento": respuesta.departamento,
        "provincias": respuesta.provincias,
        "municipios": respuesta.municipios,
        "cuadriculasLibres":respuesta.cuadriculasLibres,
        "cantidadCuadriculasLibres": respuesta.cantidadCuadriculasLibres,
        "correlativo": respuesta.correlativo,
        "fechaSolicitud": respuesta.fechaSolicitud
      };
      deferred.resolve(persona2);
    })
  return deferred.promise;
};


module.exports = {
  crearDerechoMin,
  obtenerDerechoMinero_id,
  modDerechoMin,
  obtenerDerechoMinero_apm,
  obtenerAreaMinera
};
