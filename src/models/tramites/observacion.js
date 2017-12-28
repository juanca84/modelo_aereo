/**
 * Modelo para la tabla observacion
 * @param {type} sequelize
 * @param {type} DataType
 * @returns observacion
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const observacion = sequelize.define('observacion', {
    id_observacion: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    seccion: {
      type: DataType.STRING(250),
      xlabel: 'Nombre de la Sección',
    },
    descripcion: {
      type: DataType.STRING(1000),
      xlabel: 'Código tramite',
    },
    atendido: {
      type: DataType.BOOLEAN,
      allowNull: false,
      xlabel: 'Indica si la la observación ha sido atendida',
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
          observacion.belongsTo(models.seguimiento_tramite, { as: 'seguimiento_tramite', foreignKey: { name: 'fid_seguimiento_tramite', allowNull: false } });
        },
        tableName: 'observacion',
        comment: 'Tabla para almacenar los seguimientos de los tramites.',
      }
    });

  return observacion;
};
