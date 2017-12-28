'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ubicacion', [
      {
        tipo: 'CENTRAL',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_apm: 1,
        fid_dpa: 125
      }, {
        tipo: 'CENTRAL',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_apm: 2,
        fid_dpa: 253
      }, {
        tipo: 'CENTRAL',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_apm: 3,
        fid_dpa: 277
      },
    ], {});
    return;

  },

  down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
