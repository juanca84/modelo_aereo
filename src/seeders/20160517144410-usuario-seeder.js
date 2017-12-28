'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usuario', [
      // 1
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'admin',
        usuario: 'admin',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 1,
      },
      // 2
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'tecnicomin',
        usuario: 'tecnicomin',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 2,
      },
      // 3
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'directormin',
        usuario: 'directormin',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 3,
      },
      // 4
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'jefesnr',
        usuario: 'jefesnr',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 4,
      },
      // 5
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'tecnicosnr1',
        usuario: 'tecnicosnr1',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 5,
      },
      // 6
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'tecnicosnr2',
        usuario: 'tecnicosnr2',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 6,
      },
      // 7
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'tecnicosnr3',
        usuario: 'tecnicosnr3',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 7,
      },
      // 8
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'directorsnr',
        usuario: 'directorsnr',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 8,
      },
      // 9
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'tecnicoajam',
        usuario: 'tecnicoajam',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 9,
      },
      // 10
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'jefeajam',
        usuario: 'jefeajam',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 10,
      },
      // 11
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'directorajam',
        usuario: 'directorajam',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 11,
      },
      // 12
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'APM',
        usuario: 'APM',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 12,
      },
    ], {});
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
