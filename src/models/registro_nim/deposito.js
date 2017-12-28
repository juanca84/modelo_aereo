/**
 * Modelo para la tabla deposito
 * @param {type} sequelize
 * @param {type} DataType
 * @returns deposito
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const deposito = sequelize.define('deposito', {
    id_deposito: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    nro_movimiento: {
      type: DataType.STRING(500),
      xlabel: 'Número de movimiento',
      allowNull: false,
      validate: {
        len: {args: [0, 1000], msg: "El campo 'Descripción' permite un máximo de 1000 caracteres."},
        notEmpty: {args: [true], msg: "El campo 'Descripción' es obligatorio."},
      },
    },
    fecha_movimiento: {
      type: DataType.DATE,
      xlabel: 'Fecha de movimiento',
      allowNull: true,
    },
    monto: {
      type: DataType.DECIMAL(5, 0),
      xlabel: 'Monto',
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: {args: [0], msg: "El campo 'Monto' sólo permite valores numéricos mayores o iguales a cero."},
        max: {args: [99999], msg: "El campo 'Monto' sólo permite valores numéricos menores a 99999."},
        isInt: {args: [true], msg: "El campo 'Monto' sólo permite valores numéricos mayores o iguales a cero."},
      },
    },
    descripcion: {
      type: DataType.STRING(500),
      xlabel: 'Descripción',
      allowNull: false,
      validate: {
        len: {args: [0, 1000], msg: "El campo 'Descripción' permite un máximo de 1000 caracteres."},
        notEmpty: {args: [true], msg: "El campo 'Descripción' es obligatorio."},
      },
    },
    tipo_movimiento: {
      type: DataType.STRING(20),
      xlabel: 'Tipo de Movimiento',
      allowNull: false,
      validate: {
        len: {args: [0, 20], msg: "El campo 'Descripción' permite un máximo de 1000 caracteres."},
        notEmpty: {args: [true], msg: "El campo 'Descripción' es obligatorio."},
      },
    },
    detalle: {
      type: DataType.STRING(1000),
      xlabel: 'Detalle',
      allowNull: false,
      validate: {
        len: {args: [0, 1000], msg: "El campo 'Descripción' permite un máximo de 1000 caracteres."},
        notEmpty: {args: [true], msg: "El campo 'Descripción' es obligatorio."},
      },
    },
    utilizado: {
      type: DataType.BOOLEAN,
      field: 'method_post',
      xlabel: 'Utilizado',
      allowNull: false,
    },
    estado: {
      type: DataType.ENUM,
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'ACTIVO',
      values: ['ACTIVO', 'INACTIVO'],
      validate: {
        isIn: {args: [['ACTIVO', 'INACTIVO']], msg: "El campo 'Estado' sólo permite valores: ACTIVO o INACTIVO."},
        notEmpty: {args: [true], msg: "El campo 'Estado' es obligatorio."},
      },
    },
  }, {
      createdAt: '_fecha_creacion',
      updatedAt: '_fecha_modificacion',
      deletedAt: '_fecha_eliminacion',
      paranoid: true,
      classMethods: {
        associate: (models) => {
          deposito.hasOne(models.nim, {as: 'nim', foreignKey: {name: 'fid_deposito'}});
        },
        tableName: 'deposito',
        comment: 'Tabla para almacenar los depositos.',
      }
    });

  return deposito;
};
