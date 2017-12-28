'use strict';

module.exports = {
  up(queryInterface, Sequelize) {

    const sql = `CREATE OR REPLACE FUNCTION sp_ascii(character varying)
                  RETURNS text AS
                  $BODY$
                  SELECT TRANSLATE
                  ($1,
                  'áàâãäéèêëíìïóòôõöúùûüÁÀÂÃÄÉÈÊËÍÌÏÓÒÔÕÖÚÙÛÜçÇ',
                  'aaaaaeeeeiiiooooouuuuAAAAAEEEEIIIOOOOOUUUUcC');
                  $BODY$
                  LANGUAGE 'sql';`
    return queryInterface.sequelize.query(sql);

  },

  down(queryInterface, Sequelize) {
  /* eliminar algo xD*/
  },
};
