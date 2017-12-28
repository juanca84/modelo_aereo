const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const parametroBL = require('../parametros/parametroBL');

const crearPlanTrabajo = (body, models, transaccion) => {
  const deferred = Q.defer();
  var f = Date();
  if (body.id_derechoMinero !== undefined) {
    dao.contarRegistros(models.plan_trabajo, {where: {fid_derecho_minero: body.id_derechoMinero}})
      .then(respuesta => {console.log('ddddd' + JSON.stringify(respuesta) + ' nro ' + respuesta.count)

        if (respuesta == 0 ) {
          const parametros = {
            "fecha_solicitud": f,
            "ruta_plan_trabajo": "ruta_plan_trabajo.doc",
            "ruta_mapa_minero": "ruta_mapa_minero",
            "ruta_relacion_planimetrica": "ruta_relacion_planimetrica",
            "estado_plan_trabajo": "NUEVO",
            "estado": "ACTIVO",
            "_fecha_creacion": f,
            "_fecha_modificacion": f,
            "fid_tipo_plan_trabajo": body.id_tipo,
            "fid_derecho_minero": body.id_derechoMinero}
          dao.crearRegistro(models.plan_trabajo, parametros, false, transaccion)
            .then(respuesta => deferred.resolve(
                                dao.obtenerRegistro(models.plan_trabajo, {where: {fid_derecho_minero: body.id_derechoMinero}})
                                  .then (respuesta => {
                                    const parametros1 = {
                                      "ruta_documento": "ruta_plan_trabajo.doc",
                                      "estado": "ACTIVO",
                                      "_fecha_creacion": f,
                                      "_fecha_modificacion": f,
                                      "fid_plan_trabajo": respuesta.id_plan_trabajo
                                    }
                                    dao.crearRegistro(models.documento_plan_trabajo, parametros1, false, transaccion)
                                      .then(respuesta => deferred.resolve(  dao.obtenerRegistro(models.plan_trabajo, {where: {fid_derecho_minero: body.id_derechoMinero}})))
                                      .catch(error => deferred.reject(error))
                                  } )


            ))
            .catch(error => deferred.reject(error));
        } else {
          throw new Error("No se puede crear otro plan de trabajo");
        }
      })
    .catch(error => deferred.reject(error));
  }
  else {
    throw new Error("id_derecho minero no estan definidos");
  }
  return deferred.promise;
};

module.exports = {
  crearPlanTrabajo

};
