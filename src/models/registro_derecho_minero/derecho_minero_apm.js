/**
 * Modelo para la tabla derecho_minero_apm
 * @param {type} sequelize
 * @param {type} DataType
 * @returns derecho_minero_apm
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const derecho_minero_apm = sequelize.define('derecho_minero_apm', {
    id_derecho_minero_apm: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    estado: {
      type: DataType.ENUM,
      xlabel: 'Estado de derecho_minero_apm',
      allowNull: true,
      values: ['ACTIVO', 'INACTIVO'],
      validate: {
        isIn: { args: [['ACTIVO', 'INACTIVO']], msg: "El campo 'Tipo de actividad económica' sólo permite valores: 'ACTIVO', 'INACTIVO'." },
      },
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    tableName: 'derecho_minero_apm',
    comment: 'Tabla para almacenar la relacion entre los dpas y derecho minero.',
  });

  return derecho_minero_apm;
};
