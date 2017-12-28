'use strict';

module.exports = {

  up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('ALTER SEQUENCE parametro_id_parametro_seq RESTART WITH 2000 ');

  },
  down (queryInterface, Sequelize) {
   return queryInterface.sequelize.query('ALTER SEQUENCE parametro_id_parametro_seq RESTART WITH 2000 ');
  },
};
