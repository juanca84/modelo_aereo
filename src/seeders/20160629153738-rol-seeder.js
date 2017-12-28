'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('rol', [
      {
        // 1
        nombre: 'ADMINISTRADOR',
        descripcion: 'Administrador',
        peso: 0,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 2
        nombre: 'TECNICO MINISTERIO',
        descripcion: 'Técnico del Ministerio',
        peso: 1,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 3
        nombre: 'DIRECTOR MINISTERIO',
        descripcion: 'Director Ministerio',
        peso: 1,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 4
        nombre: 'TECNICO SENARECOM',
        descripcion: 'Tecnico de SENARECOM',
        peso: 1,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 5
        nombre: 'JEFE SENARECOM',
        descripcion: 'Jefe Tecnico SENARECOM',
        peso: 1,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 6
        nombre: 'DIRECTOR SENARECOM',
        descripcion: 'Director SENARECOM',
        peso: 1,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 7
        nombre: 'APM',
        descripcion: 'Actor Productivo Minero',
        peso: 1,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 8
        nombre: 'TECNICO AJAM',
        descripcion: 'Tecnico de la AJAM',
        peso: 1,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 9
        nombre: 'JEFE AJAM',
        descripcion: 'Jefe Tecnico AJAM',
        peso: 1,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 10
        nombre: 'DIRECTOR AJAM',
        descripcion: 'Director AJAM',
        peso: 1,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
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
