'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('apm', [
      {
        nit: '6148379',
        rum: '6148379',
        actividad_matricula: 'Pruebas dedicadas a probar pruebas complicadas',
        estado: 'ACTIVO',
        estado_rum: 'ENVIADO',
        razon_social: 'EMPRESA DE PRUEBA 1',
        matricula_comercio: '0001',
        fid_usuario: 12,
        fid_par_tipo_societario: 200,
        fid_par_tipo_apm: 261,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        nro_afcoop: '48379011',
        rum: '6148379011',
        actividad_matricula: 'Probadores privados - <Le Probamos hasta lo improbable>',
        estado: 'ACTIVO',
        estado_rum: 'ENVIADO',
        razon_social: 'EMPRESA DE PRUEBA 2',
        matricula_comercio: '0002',
        fid_usuario: 12,
        fid_par_tipo_societario: 200,
        fid_par_tipo_apm: 275,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        nit: '494949017',
        rum: '494949017',
        actividad_matricula: 'Don Pollo, venta y engorde',
        estado: 'ACTIVO',
        estado_rum: 'ENVIADO',
        razon_social: 'DON POLLO',
        matricula_comercio: '0003',
        fid_usuario: 12,
        fid_par_tipo_societario: 200,
        fid_par_tipo_apm: 261,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // {
      //   nit: '494949016',
      //   rum: '494949016',
      //   actividad_matricula: 'Polluelos sin ensalada',
      //   estado: 'ACTIVO',
      //   estado_rum: 'ENVIADO',
      //   razon_social: 'POLLOS COPACABANA',
      //   matricula_comercio: '0004',
      //   fid_usuario: 5,
      //   fid_par_tipo_societario: 200,
      //   fid_par_tipo_apm: 261,
      //   _fecha_creacion: new Date(),
      //   _fecha_modificacion: new Date(),
      // },
    ], {});
    return 

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
