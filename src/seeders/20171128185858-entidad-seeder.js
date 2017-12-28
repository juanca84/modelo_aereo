module.exports = {
    up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('entidad', [
        { codigo: '76',
          sigla: 'MIN‐MM',
          nombre: 'Ministerio de Minería y Metalurgia',
          estado: 'ACTIVO',
          _usuario_creacion: 1,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad_padre: null
        },
        { codigo: '517',
          sigla: 'COMIBOL',
          nombre: 'Corporación Minera de Bolivia',
          estado: 'ACTIVO',
          _usuario_creacion: 1,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad_padre: 1
        },
        { codigo: '190',
          sigla: 'AJAM',
          nombre: 'Autoridad Jurisdiccional Administrativa Minera',
          estado: 'ACTIVO',
          _usuario_creacion: 1,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad_padre: 1
        },
        { codigo: '221',
          sigla: 'SENARECOM',
          nombre: 'Servicio Nacional de Registro y Control de la Comercialización de Minerales y Metales',
          estado: 'ACTIVO',
          _usuario_creacion: 1,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad_padre: 1
        },
        { codigo: '234',
          sigla: 'SERGEOMIN',
          nombre: 'Servicio Geológico Minero',
          estado: 'ACTIVO',
          _usuario_creacion: 1,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad_padre: 1
        },
        { codigo: '130',
          sigla: 'FOFIM',
          nombre: 'Fondo de Financiamiento para la Minería',
          estado: 'ACTIVO',
          _usuario_creacion: 1,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad_padre: 1
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
