/**
 * Modelo para la tabla mineral_dpa
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const mineral_dpa = sequelize.define('mineral_dpa', {
    id_mineral_dpa: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
  }, {
      createdAt: '_fecha_creacion',
      updatedAt: '_fecha_modificacion',
      deletedAt: '_fecha_eliminacion',
      paranoid: true,
      classMethods: {
        associate: (models) => {
          mineral_dpa.belongsTo(models.nim, { as: 'nim', foreignKey: { name: 'fid_nim', allowNull: false } });
        },
        tableName: 'mineral_dpa',
        comment: 'Tabla para almacenar las asociaciones de mineral_dpaes por departamento de una API.',
      }
    });

  return mineral_dpa;
};