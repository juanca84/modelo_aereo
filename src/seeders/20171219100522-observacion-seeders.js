'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('observacion', [
      {
        seccion: "Identificación de Actor Minero",
        descripcion: "La solicitud de tramite nada q ver",
        atendido: false,
        fid_seguimiento_tramite: 2,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        seccion: "Datos del Propietario o Representante Legal",
        descripcion: "Como pues, ese nombre tan feo",
        atendido: false,
        fid_seguimiento_tramite: 2,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
    //   }, {
    //     tipo: 'CENTRAL',
    //     _usuario_creacion: 1,
    //     _usuario_modificacion: 1,
    //     _fecha_creacion: new Date(),
    //     _fecha_modificacion: new Date(),
    //     fid_apm: 3,
    //     fid_dpa: 277
      },
    ], {});
    return;

  },

  down(queryInterface, Sequelize) {
  },
};
