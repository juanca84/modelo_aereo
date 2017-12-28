'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    let roles_menus_array = [];
    //ADMINISTRADOR
    let obj = [
      { fid_menu: 18, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    //JEFE TECNICO MINISTERIO
    // obj = [
    //   { fid_menu: 4, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    // ];
    // roles_menus_array = roles_menus_array.concat(obj);

    // TECNICO MINISTERIO
    obj = [
      { fid_menu: 3, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_menus_array = roles_menus_array.concat(obj);
    // DIRECTOR MINISTERIO
    obj = [
      { fid_menu: 5, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_menus_array = roles_menus_array.concat(obj);
    // JEFE SENARECOM
    obj = [
      { fid_menu: 8, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_menus_array = roles_menus_array.concat(obj);
    // TECNICO SENARECOM
    obj = [
      { fid_menu: 7, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_menus_array = roles_menus_array.concat(obj);
    // DIRECTOR SENARECOM
    obj = [
      { fid_menu: 9, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_menus_array = roles_menus_array.concat(obj);
    // ACTOR PRODUCTIVO MINERO
    obj = [
      { fid_menu: 10, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 11, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 15, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 16, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 17, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 19, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    return queryInterface.bulkInsert('rol_menu', roles_menus_array, {});
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
