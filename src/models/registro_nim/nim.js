/**
 * Modelo para la tabla nim
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const nim = sequelize.define('nim', {
    id_nim: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    codigo: {
      type: DataType.STRING(50),
      xlabel: 'Código',
    },
    comercializacion_interna: {
      type: DataType.BOOLEAN,
      xlabel: 'Comercialización interna',
      allowNull: false,
      default: false
    },
    comercializacion_externa: {
      type: DataType.BOOLEAN,
      xlabel: 'Comercialización externa',
      allowNull: false,
      default: false
    },
    ruex: {
      type: DataType.STRING(50),
      xlabel: 'RUEX',
    },
    ruta_ruex: {
      type: DataType.STRING(250),
      xlabel: 'Ruta Ruex',
      allowNull: true,
    },
    ruta_certificado: {
      type: DataType.STRING(250),
      xlabel: 'Ruta Certifcado',
      allowNull: true,
    },
    estado_nim: {
      type: DataType.ENUM,
      xlabel: 'Estado del Formulario Nim',
      allowNull: true,
      values: [, 'NUEVO', 'ENVIADO', 'APROBADO', 'OBSERVADO', 'RECHAZADO', 'CORREGIDO', 'FIRMADO'],
      validate: {
        isIn: {args: [[, 'NUEVO', 'ENVIADO', 'APROBADO', 'OBSERVADO', 'RECHAZADO', 'CORREGIDO', 'FIRMADO']], msg: "El estado sólo permite valores: , 'NUEVO', 'ENVIADO', 'APROBADO', 'OBSERVADO', 'RECHAZADO', 'CORREGIDO', 'FIRMADO'."},
      },
    },
    fecha_actualizacion: {
      type: DataType.DATE,
      xlabel: 'Fecha Actualizacion',
      allowNull: true,
    },
    fecha_solicitud: {
      type: DataType.DATE,
      xlabel: 'Fecha Solicitud',
      allowNull: true,
    },
  }, {
      createdAt: '_fecha_creacion',
      updatedAt: '_fecha_modificacion',
      deletedAt: '_fecha_eliminacion',
      paranoid: true,
      classMethods: {
        associate: (models) => {
          nim.belongsTo(models.deposito, { as: 'deposito', foreignKey: { name: 'fid_deposito', allowNull: true } });
          nim.belongsTo(models.apm, { as: 'apm', foreignKey: { name: 'fid_apm', allowNull: true } });
        },
        tableName: 'nim',
        comment: 'Tabla para almacenar las declaraciones juradas de formularios NIM.'
      }
    });

  return nim;
};
