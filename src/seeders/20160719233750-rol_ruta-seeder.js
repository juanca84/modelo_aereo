'use strict';
// TODO arreglar esto
module.exports = {
  up (queryInterface, Sequelize) {

    let roles_rutas_array = [];

    // ADMINISTRADOR
    let obj = [
      { fid_ruta: 1, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 2, fid_rol: 1, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 3, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 4, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 5, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 6, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 7, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 1, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 1, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 27, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 28, fid_rol: 1, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 32, fid_rol: 1, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 36, fid_rol: 1, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 1, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 39, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 40, fid_rol: 1, method_get: false, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 41, fid_rol: 1, method_get: false, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 51, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 57, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 58, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 59, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 66, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },

    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    // TECNICO
    // OJO: Muchas rutas para escribir sobre una certificación están inmersas en técnico considerando que éste también creará declaraciones juradas (para personas que no usan un PC)
    obj = [
      { fid_ruta: 3, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 4, fid_rol: 2, method_get: true, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 5, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 7, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 13, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 14, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 16, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 17, fid_rol: 2, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 18, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 20, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 27, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 31, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 34, fid_rol: 2, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 35, fid_rol: 2, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 36, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 51, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    obj = [
      //{ fid_ruta: 38, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      //{ fid_ruta: 51, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 57, fid_rol: 2, method_get: true, method_post: false, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 58, fid_rol: 2, method_get: false, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 59, fid_rol: 2, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 70, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 72, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 73, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 74, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 75, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 79, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 83, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 90, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    obj = [
      { fid_ruta: 27, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 51, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 57, fid_rol: 3, method_get: true, method_post: false, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 58, fid_rol: 3, method_get: false, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 59, fid_rol: 3, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 69, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 70, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 72, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 73, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 74, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 75, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 77, fid_rol: 3, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 79, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 83, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 87, fid_rol: 3, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 89, fid_rol: 3, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 90, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    obj = [
      { fid_ruta: 27, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 51, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 57, fid_rol: 4, method_get: true, method_post: false, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 58, fid_rol: 4, method_get: false, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 59, fid_rol: 4, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 69, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 70, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 72, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 73, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 74, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 75, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 79, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 83, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 90, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    obj = [
      { fid_ruta: 27, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 51, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 57, fid_rol: 5, method_get: true, method_post: false, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 58, fid_rol: 5, method_get: false, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 59, fid_rol: 5, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 69, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 70, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 72, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 73, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 74, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 75, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 79, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 83, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 90, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    obj = [
      { fid_ruta: 27, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 51, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 57, fid_rol: 6, method_get: true, method_post: false, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 58, fid_rol: 6, method_get: false, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 59, fid_rol: 6, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 69, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 70, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 72, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 73, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 74, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 75, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 77, fid_rol: 6, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 79, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 83, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 90, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    obj = [
      { fid_ruta: 27, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 51, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 57, fid_rol: 8, method_get: true, method_post: false, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 58, fid_rol: 8, method_get: false, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 59, fid_rol: 8, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 69, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 70, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 72, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 73, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 74, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 75, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 77, fid_rol: 8, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 79, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 83, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 90, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    obj = [
      { fid_ruta: 27, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 51, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 57, fid_rol: 9, method_get: true, method_post: false, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 58, fid_rol: 9, method_get: false, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 59, fid_rol: 9, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 69, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 70, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 72, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 73, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 74, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 75, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 77, fid_rol: 9, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 79, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 83, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 90, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    obj = [
      { fid_ruta: 27, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 51, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 57, fid_rol: 10, method_get: true, method_post: false, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 58, fid_rol: 10, method_get: false, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 59, fid_rol: 10, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 69, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 70, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 72, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 73, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 74, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 75, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 77, fid_rol: 10, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 79, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 83, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 90, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    // ACTOR PRODUCTIVO MINERO
    obj = [
      { fid_ruta: 3, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 4, fid_rol: 7, method_get: true, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 5, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 7, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 8, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 9, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 10, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 11, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 12, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 13, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 14, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 15, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 18, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 20, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 21, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 22, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 24, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 27, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 28, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 31, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 32, fid_rol: 7, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 33, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 34, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 35, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 36, fid_rol: 7, method_get: true, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 39, fid_rol: 7, method_get: false, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 40, fid_rol: 7, method_get: false, method_post: false, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 41, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 42, fid_rol: 7, method_get: false, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 43, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 44, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 45, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 46, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 47, fid_rol: 7, method_get: false, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 48, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 49, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 50, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 51, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 52, fid_rol: 7, method_get: false, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 53, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 54, fid_rol: 7, method_get: false, method_post: false, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 55, fid_rol: 7, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() }, 
      { fid_ruta: 56, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 58, fid_rol: 7, method_get: false, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 60, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 61, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 62, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 63, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 64, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 65, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 66, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 67, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 68, fid_rol: 7, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 70, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 71, fid_rol: 7, method_get: false, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 73, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 76, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 77, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 78, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 79, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 80, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 81, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 82, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 84, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 85, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 86, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 87, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 88, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 91, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);


    return queryInterface.bulkInsert('rol_ruta', roles_rutas_array, {});
  },

  down (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
