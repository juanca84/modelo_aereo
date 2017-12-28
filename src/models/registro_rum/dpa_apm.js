/**
 * Modelo para la tabla dpa_apm
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const dpa_apm = sequelize.define('dpa_apm', {
    id_dpa_apm: {
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
        tableName: 'dpa_apm',
        comment: 'Tabla para almacenar las asociaciones de dpa_apm por apm.',
      }
    });

  return dpa_apm;
};
