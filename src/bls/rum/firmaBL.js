const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const parametroBL = require('../parametros/parametroBL');

const firmaDocumento = (body, models) => {
  const deferred = Q.defer();
  if (!body.idSeguimiento) {
    throw new Error("El id del trámite es requerido.");
  }
  // Poner dentro de un transition
  const paramsSeguimiento = {
    transicion: 'FIRMADO'
  }
  dao.modificarRegistro(models.seguimiento_tramite, body.idSeguimiento, paramsSeguimiento)
  .then(respuesta => {
    const idApm = respuesta.fid_apm;
    const paramsApm = {
      estado_rum: 'FIRMADO'
    };
    return dao.modificarRegistro(models.apm, idApm, paramsApm);
  })
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerRutaCertificadoPdf = (idSeguimiento, models) => {
  if (!body.idSeguimiento) {
    throw new Error("El id del trámite es requerido.");
  }
  const paramsSeguimiento = {
    include: [{
      attributes: ['abreviatura'],
      model: models.tramite,
      as: 'tramite',
    }],
  }
  dao.obtenerRegistroPorId(models.seguimiento_tramite, id_seguimiendo_tramite, paramsSeguimiento)
  .then(respuestaSeguimiento => {
    console.log('--------------------------------');
    console.log(JSON.stringify(respuestaSeguimiento));
    return respuestaSeguimiento;
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;

  // firmaShbBL.obtenerRutaDocumento(idSelloBolivia).then(function (rutaDocumento) {
  //   base64.encode(rutaDocumento, function (err, base64String) {
  //     if (err) {
  //       Util.mensajeError(res, err);
  //       return;
  //     }
  //     Util.mensajeExito(res, "Archivo actualizado correctamente.", 200, base64String);
  //   });
  // }).catch(function (error) {
  //   console.log("Obtener un documento", error);
  //   Util.mensajeError(res, error);
  // });

}

module.exports = {
    firmaDocumento,
    obtenerRutaCertificadoPdf
};