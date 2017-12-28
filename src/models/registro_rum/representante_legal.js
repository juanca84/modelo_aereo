/**
 * Modelo para la tabla representante_legal
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const representante_legal = sequelize.define('representante_legal', {
    id_representante_legal: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID'
    },
    propietario: {
      type: DataType.BOOLEAN,
      xlabel: 'Si es propietario',
      allowNull: false,
      defaultValue: false
    },
    ruta_adjunta: {
      type: DataType.STRING(200),
      xlabel: 'Ruta Documento',
      allowNull: true
    },
    _fecha_entrada: {
      type: DataType.DATE,
      xlabel: 'Fecha entrada'
    },
    _fecha_salida: {
      type: DataType.DATE,
      xlabel: 'Fecha salida'
    },
    celular: {
      type: DataType.STRING(10),
      xlabel: 'celular',
      allowNull: false,
      validate: {
        len: { args: [7, 10], msg: "El campo 'Celular' permite un mínimo de 7 caracteres y un máximo de 10 caracteres" },
        isInt: { args: [true], msg: "El campo 'Celular' sólo permite valores numéricos." }
      }
    },
    estado: {
      type: DataType.ENUM,
      xlabel: 'Tipo de actividad económica',
      allowNull: true,
      values: ['ACTIVO', 'INACTIVO'],
      validate: {
        isIn: {args: [['ACTIVO', 'INACTIVO']], msg: "El campo 'Tipo de actividad económica' sólo permite valores: 'ACTIVO', 'INACTIVO'."}
      }
    }
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    classMethods: {
      associate: (models) => {
        representante_legal.belongsTo(models.ubicacion, {as: 'ubicacion', foreignKey: {name: 'fid_ubicacion', allowNull: true}});
      }
    },
    tableName: 'representante_legal',
    comment: 'Tabla para almacenar las declaraciones juradas de los usuarios empresarios/artesanos del sistema.'
  });

  return representante_legal;
};
