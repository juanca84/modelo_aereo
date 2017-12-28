/**
 * Modelo para la tabla asociado
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const asociado = sequelize.define('asociado', {
    id_asociado: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    estado: {
      type: DataType.ENUM,
      xlabel: 'Estado de asociado',
      allowNull: true,
      values: ['ACTIVO', 'INACTIVO'],
      validate: {
        isIn: { args: [['ACTIVO', 'INACTIVO']], msg: "El campo 'Tipo de actividad económica' sólo permite valores: 'ACTIVO', 'INACTIVO'." },
      },
    },
    tipo: {
      type: DataType.ENUM,
      xlabel: 'Tipo asociado',
      allowNull: true,
      values: ['ASOCIADO', 'MAE', 'CONSEJO_ADMINISTRATIVO', 'CONSEJO_VIGILANCIA'],
      validate: {
        isIn: { args: [['ASOCIADO', 'MAE', 'CONSEJO_ADMINISTRATIVO', 'CONSEJO_VIGILANCIA']], msg: "El campo 'Tipo de actividad económica' sólo permite valores: 'ASOCIADO', 'DIRECTORIO', 'CONSEJO_ADMINISTRATIVO' y 'CONSEJO_VIGILANCIA'." },
      },
    },
    cargo: {
      type: DataType.STRING(50),
      xlabel: 'Tipo de cargo',
      allowNull: true,
    },
    _fecha_entrada: {
      type: DataType.DATE,
      xlabel: 'Fecha entrada',
    },
    _fecha_salida: {
      type: DataType.DATE,
      xlabel: 'Fecha salida',
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    tableName: 'asociado',
    comment: 'Tabla para almacenar las declaraciones juradas de los usuarios empresarios/artesanos del sistema.',
  });

  return asociado;
};
