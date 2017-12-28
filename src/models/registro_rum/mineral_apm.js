/**
 * Modelo para la tabla mineral_apm
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const mineral_apm = sequelize.define('mineral_apm', {
    id_mineral_apm: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    estado: {
      type: DataType.ENUM,
      xlabel: 'Tipo de actividad económica',
      allowNull: true,
      values: ['ACTIVO', 'INACTIVO'],
      validate: {
        isIn: {args: [['ACTIVO', 'INACTIVO' ]], msg: "El campo 'Tipo de actividad económica' sólo permite valores: 'ACTIVO' o 'INACTIVO'."},
      },
    },
  }, {
      createdAt: '_fecha_creacion',
      updatedAt: '_fecha_modificacion',
      deletedAt: '_fecha_eliminacion',
      paranoid: true,
      classMethods: {
        // associate: (models) => {
        //   mineral_apm.belongsTo(models.nim, { as: 'nim', foreignKey: { name: 'fid_nim', allowNull: false } });
        // },
        tableName: 'mineral_apm',
        comment: 'Tabla para almacenar las asociaciones de mineral_apmes por apm.',
      }
    });

  return mineral_apm;
};
