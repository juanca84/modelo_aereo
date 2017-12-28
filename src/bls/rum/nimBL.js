const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');

const crearNim_ = (body, models, transaccion) => {
  const deferred = Q.defer();
  const parametros = {"codigo": body.codigo, "fid_deposito": body.fid_deposito, "ruex": body.ruex, "ruta_ruex": body.ruta_ruex, "estado_nim": 'NUEVO', "fecha_actualizacion": body.fecha_actualizacion, "fecha_solicitud": body.fecha_solicitud,"apm_id_apm":body.id_apm}
  dao.crearRegistro(models.apm, parametros, false, transaccion)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const crearNim = (body, models, transaccion) => {
  const deferred = Q.defer();
  var f = new Date();
  var factual = f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate() + " " + f.getHours() + ":" + f.getMinutes();
  if (body.id_apm !== undefined) {
    dao.obtenerRegistro(models.nim, {where: {fid_apm: body.id_apm}})
      .then(respuesta => {
        if (!respuesta) {
          const parametros = {"comercializacion_interna": body.comercializacion_interna, "comercializacion_externa": body.comercializacion_externa,
            "ruex": body.ruex, "ruta_ruex": body.ruta_ruex,
            "estado_nim": "NUEVO","fid_usuario": body.id_usuario,"fecha_solicitud": factual,"_fecha_creacion": factual,"fid_apm":body.id_apm,}
          dao.crearRegistro(models.nim, parametros, false, transaccion)
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        } else {
          //throw new Error("No se puede crear otro tramite NIM");
          console.log ("No se puede crear otro tramite NIM");
          deferred.resolve(null);//
        }
      })
      .catch(error => deferred.reject(error));
  }
  else {
    //throw new Error("APM no estan definido");
    console.log("apm no definido");
    deferred.resolve(null);//
  }
  return deferred.promise;
};

const modificarNim = (models, cuerpoObj) => {
  const deferred = Q.defer();
  var f = new Date();
  var factual = f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate()+ " " + f.getHours() + ":" + f.getMinutes();
  if (cuerpoObj.id_nim !== undefined) {
    dao.obtenerRegistro(models.nim, {where: {id_nim: cuerpoObj.id_nim}})
      .then(respuesta => {
        if (respuesta) {
          const parametros = {
            "comercializacion_interna": cuerpoObj.comercializacion_interna,
            "comercializacion_externa": cuerpoObj.comercializacion_externa,
            "ruex": cuerpoObj.ruex,
            "ruta_ruex": cuerpoObj.ruta_ruex,
            "_fecha_modificacion":factual
          }
          dao.modificarRegistro(models.nim, cuerpoObj.id_nim, parametros)
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        } else {
          //throw new Error("No se puede crear otro tramite NIM");
          console.log ("NIM no encontrado");
          deferred.resolve(null);//
        }
      })
      .catch(error => deferred.reject(error));
  }
  else {promise
    //throw new Error("APM no estan definido");
    console.log("id_nim no definido");
    deferred.resolve(null);//
  }
  return deferred.promise;
};
const depositoNim = (models, cuerpoObj) => {
  const deferred = Q.defer();
  var f = new Date();
  var factual = f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate() + " " + f.getHours() + ":" + f.getMinutes();
  const objParametrosBoleta = {
    "nro_movimiento": cuerpoObj.nro_movimiento,
    "fecha_movimiento":cuerpoObj.fecha_movimiento,
    "monto":cuerpoObj.monto,
    "descripcion":cuerpoObj.descripcion,
    "tipo_movimiento":cuerpoObj.tipo_movimiento,
    "detalle":cuerpoObj.detalle,
    "utilizado":cuerpoObj.method_post,
    "estado": "ACTIVO",
    "_fecha_creacion":factual,
    "_fecha_modificacion":factual
  };
  const parametros = {where: {id_nim: cuerpoObj.id_nim}}
  dao.obtenerRegistro(models.nim, parametros)
    .then(respuesta => {
      console.log("**** RESPUESTA: " + JSON.stringify(respuesta));
      if (respuesta && respuesta.codigo == null)  {//codigo es el nro de movimiento
        console.log ("***codigo" +respuesta.codigo+"****method_post" + cuerpoObj.method_post);
        dao.crearRegistro(models.deposito, objParametrosBoleta)
          .then (respuesta => {
            const objParametrosNim = {"codigo": cuerpoObj.nro_movimiento,"fid_deposito":respuesta.id_deposito,"_fecha_modificacion": factual };
            console.log ("****id_deposito" +respuesta.id_deposito );
            dao.modificarRegistro(models.nim, cuerpoObj.id_nim, objParametrosNim);
            deferred.resolve(respuesta);
          })
          .catch(error => deferred.reject(error));
      } else {
       // throw new Error("Error, parametros o boleta utilizada");
        deferred.resolve("Error en parametros o Boleta utilizada");
      }
    })
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

// id : id_apm
const obtenerNim_id = (id, models) => {
  const deferred = Q.defer();
  const objParametros = {
    attributes: [ "id_nim","codigo",
                  "comercializacion_interna",
                  "comercializacion_externa",
                  "ruex","ruta_ruex",
                  "ruta_certificado",
                  "estado_nim","fid_deposito",
                  "fid_apm" ],
    include:[{
      attributes: ["id_apm" ,"nit" ,"rum" , "razon_social" , "matricula_comercio" , "nro_afcoop" , "fecha_afcoop" ,
        "nro_asociado" ,"ruta_resolucion_afcoop" ,"estado", "estado_rum", "actividad_matricula", "denominacion",
        "fid_usuario" , "fid_par_tipo_societario" , "fid_par_tipo_organizacion" , "fid_par_tipo_apm"  ],  // "actividades", ],
      model:models.apm,
      as: 'apm',
    },{
      attributes: ["id_deposito", "nro_movimiento", "fecha_movimiento", "monto", "descripcion", "tipo_movimiento", "detalle", "method_post", "estado"],
      model: models.deposito,
      as: 'deposito',
    }],
    where: {"fid_apm": id},
  };
  dao.obtenerRegistro(models.nim, objParametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const statusNim = (id, models) => {
  const deferred = Q.defer();
  var mensajeFinal='';
  const objParametros = {
    attributes: [ "id_nim",
                  "codigo",
                  "comercializacion_interna",
                  "comercializacion_externa",
                  "ruex",
                  "ruta_ruex",
                  "ruta_certificado",
                  "estado_nim",
                  "fid_deposito",
                  "fid_apm"],
    include: [{
      model: models.deposito,
      as: 'deposito',
    }],
    where: {"id_nim": id},
  };
  dao.obtenerRegistro(models.nim, objParametros)
    .then(respuesta => {
      if (respuesta) {
        if (respuesta.comercializacion_externa == true && respuesta.ruex == null) {
          console.log('Si selecciona comercializacion externa  debe adjuntar  RUEX');
          mensajeFinal = mensajeFinal + ' Si selecciona comercializacion externa  debe adjuntar  RUEX ' + '\n';
        }
        if (respuesta.fid_deposito  == null) {
          console.log(' NO adjunto la boleta de deposito');
          mensajeFinal = mensajeFinal + ' NO adjunto la boleta de deposito ' + '\n';
        }
        deferred.resolve(mensajeFinal); // respuesta);
      }
      else
        deferred.reject(new Error ('No existe registro'));
    })
    .catch(error => deferred.reject(error));
  return deferred.promise;
};


module.exports = {
  crearNim,
  modificarNim,
  depositoNim,
  obtenerNim_id,
  statusNim
};
