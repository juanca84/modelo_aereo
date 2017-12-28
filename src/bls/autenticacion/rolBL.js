/**
 * Lógica del Negocio -> ParametroBL
 */

const dao = require('../../dao/dao');
const Q = require('q');

const listarRoles = (query, body, models) => {
  const deferred = Q.defer();
  const parametros = {};
  parametros.where = {
    id_rol: {$ne: ROL_ACTOR_PRODUCTIVO_MINERO},
  };
  parametros.attributes = ["id_rol", "nombre", "peso"];
  parametros.order = 'peso';
  dao.listarRegistros(models.rol, parametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

module.exports = {
  listarRoles,
}
