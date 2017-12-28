'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('seguimiento_tramite', [
      {
        fecha: new Date(),
        transicion: 'ENVIADO',
        estado: 'ACTIVO',
        cod_tramite: '101',
        fid_usuario_origen: 12,
        fid_usuario_destino: null,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_apm: 1,
        fid_tramite: 1
      },
      {
        fecha: new Date(),
        transicion: 'ASIGNADO',
        estado: 'ACTIVO',
        cod_tramite: '101',
        fid_usuario_origen: 12,
        fid_usuario_destino: 2,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_apm: 2,
        fid_tramite: 1
      },
      {
        fecha: new Date(),
        transicion: 'APROBADO',
        estado: 'ACTIVO',
        cod_tramite: '101',
        fid_usuario_origen: 12,
        fid_usuario_destino: 2,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_apm: 3,
        fid_tramite: 1
      },
      // {
      //   fid_unidad_productiva: 4,
      //   fid_formulario: 1,
      //   tipo: 'REGISTRO',
      //   estado: 'PENDIENTE_PAGO',
      //   _usuario_firma: 1,
      //   _usuario_creacion: 6,
      //   _fecha_creacion: new Date(),
      //   _fecha_modificacion: new Date(),
      // },
    ], {});
    return;

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
