/**
 * Lógica del Negocio -> ParametroBL
 */

const dao = require('../../dao/dao');
const Q = require('q');

const registrarUsuarioRol = (id_usuario, id_rol, body, models, transaccion) => {
  const deferred = Q.defer();
  const usuarioRolObj = {
    fid_usuario: id_usuario,
    fid_rol: id_rol,
    _usuario_creacion: body.audit_usuario.id_usuario,
  };
  dao.crearRegistro(models.usuario_rol, usuarioRolObj, false, transaccion)
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const modificarUsuarioRol = (id_usuario, id_rol, body, models, transaccion) => {
  const deferred = Q.defer();
  dao.eliminarRegistro(models.usuario_rol, {where: {fid_usuario: id_usuario}}, transaccion)
  .then(respuesta => registrarUsuarioRol(id_usuario, id_rol, body, models, transaccion))
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

module.exports = {
  registrarUsuarioRol,
  modificarUsuarioRol,
}
