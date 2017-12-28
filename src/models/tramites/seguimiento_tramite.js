/**
 * Modelo para la tabla seguimiento_tramite
 * @param {type} sequelize
 * @param {type} DataType
 * @returns seguimiento tramite
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const seguimiento_tramite = sequelize.define('seguimiento_tramite', {
    id_seguimiento_tramite: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    cod_tramite: {
      type: DataType.STRING(10),
      xlabel: 'Código tramite',
    },
    fecha: {
      type: DataType.DATE,
      xlabel: 'Fecha de la transición',
    },
    transicion: {
      type: DataType.STRING(30),
      xlabel: 'Nombre de la transición',
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
          seguimiento_tramite.belongsTo(models.usuario, {as: 'usuarioOrigen', foreignKey: {name: 'fid_usuario_origen', allowNull: false}});
          seguimiento_tramite.belongsTo(models.usuario, {as: 'usuarioDestino', foreignKey: {name: 'fid_usuario_destino', allowNull: true}});
          seguimiento_tramite.belongsTo(models.apm, {as: 'apm', foreignKey: {name: 'fid_apm', allowNull: false}});
          seguimiento_tramite.belongsTo(models.nim, {as: 'nim', foreignKey: {name: 'fid_nim', allowNull: true}});
          seguimiento_tramite.belongsTo(models.derecho_minero, {as: 'derecho_minero', foreignKey: {name: 'fid_derecho_minero', allowNull: true}});
          seguimiento_tramite.belongsTo(models.tramite, {as: 'tramite', foreignKey: {name: 'fid_tramite', allowNull: false}});
          seguimiento_tramite.hasMany(models.observacion, { as: 'observaciones', foreignKey: { name: 'fid_seguimiento_tramite', allowNull: false } });
        },
        tableName: 'seguimiento_tramite',
        comment: 'Tabla para almacenar los seguimientos de los tramites.',
      }
    });

  return seguimiento_tramite;
};
