/**
 * Modelo para la tabla actividad_apm
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const actividad_apm = sequelize.define('actividad_apm', {
    id_actividad_apm: {
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
        tableName: 'actividad_apm',
        comment: 'Tabla para almacenar las asociaciones de actividad_apm por apm.',
      }
    });

  return actividad_apm;
};
