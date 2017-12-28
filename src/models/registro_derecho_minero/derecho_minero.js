/**
 * Modelo para la tabla derecho_minero
 * @param {type} sequelize
 * @param {type} DataType
 * @returns derecho_minero
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const derecho_minero = sequelize.define('derecho_minero', {
    id_derecho_minero: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    fecha_solicitud: {
      type: DataType.DATE,
      xlabel: 'Fecha de la solicitud',
      allowNull: true,
    },
    fecha_gaceta: {
      type: DataType.DATE,
      xlabel: 'Fecha de la publicación de la gaceta',
      allowNull: true,
    },
    fecha_inicio_vigencia: {
      type: DataType.DATE,
      xlabel: 'Fecha de inicio de vigencia',
      allowNull: true,
    },
    fecha_fin_vigencia: {
      type: DataType.DATE,
      xlabel: 'Fecha de fin de vigencia',
      allowNull: true,
    },
    fecha_firma: {
      type: DataType.DATE,
      xlabel: 'Fecha de de la firma',
      allowNull: true,
    },
    ruta_documento: {
      type: DataType.STRING(500),
      xlabel: 'Ruta del documento',
      allowNull: true,
    },
    utilidad: {
      type: DataType.INTEGER,
      xlabel: 'Porcentaje del interes',
      allowNull: true,
    },
    regalia: {
      type: DataType.DECIMAL(10, 2),
      xlabel: 'regalia',
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: {args: [0], msg: "El campo 'regalia' sólo permite valores numéricos mayores o iguales a cero."},
        max: {args: [9999999999], msg: "El campo 'regalia' sólo permite valores numéricos menores a 99999."},
        isInt: {args: [true], msg: "El campo 'regalia' sólo permite valores numéricos mayores o iguales a cero."},
      },
    },
    monto_patente: {
      type: DataType.DECIMAL(10, 2),
      xlabel: 'monto_patente',
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: {args: [0], msg: "El campo 'monto_patente' sólo permite valores numéricos mayores o iguales a cero."},
        max: {args: [9999999999], msg: "El campo 'monto_patente' sólo permite valores numéricos menores a 99999."},
        isInt: {args: [true], msg: "El campo 'monto_patente' sólo permite valores numéricos mayores o iguales a cero."},
      },
    },
    estado_derecho_minero: {
      type: DataType.ENUM,
      xlabel: 'Estado del Derecho Minero',
      allowNull: true,
      values: ['NUEVO', 'ENVIADO', 'APROBADO', 'OBSERVADO', 'RECHAZADO', 'CORREGIDO', 'FIRMADO'],
      validate: {
        isIn: {args: [['NUEVO', 'ENVIADO', 'APROBADO', 'OBSERVADO', 'RECHAZADO', 'CORREGIDO', 'FIRMADO']], msg: "El estado sólo permite valores: , 'NUEVO', 'ENVIADO', 'APROBADO', 'OBSERVADO', 'RECHAZADO', 'CORREGIDO', 'FIRMADO'."},
      },
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
      associate: (models) => {
        derecho_minero.belongsTo(models.entidad, {as: 'entidad_gestionadora', foreignKey: {name: 'fid_entidad_gestionadora', allowNull: false}});
        derecho_minero.belongsTo(models.entidad, {as: 'integrante_estatal', foreignKey: {name: 'fid_integrante_estatal', allowNull: true}});
        derecho_minero.belongsTo(models.parametro, {as: 'tipo', foreignKey: {name: 'fid_derecho_minero', allowNull: true}});
        derecho_minero.belongsTo(models.parametro, {as: 'actividad', foreignKey: {name: 'fid_actividad', allowNull: true}});
        derecho_minero.belongsToMany(models.apm, { as: 'derechos_mineros', through: models.derecho_minero_apm });
        derecho_minero.belongsTo(models.tramite, {as: 'tramite', foreignKey: {name: 'fid_tramite', allowNull: false}});
        derecho_minero.hasOne(models.plan_trabajo, { as: 'plan_trabajo', foreignKey: { name: 'fid_derecho_minero', allowNull: true } });
        derecho_minero.belongsTo(models.area_minera_servicio, {as: 'area_minera_servicio', foreignKey: {name: 'fid_area_minera_servicio', allowNull: true}});
      },
    },
    tableName: 'derecho_minero',
    comment: 'Tabla para almacenar los derecho mineros.',
  });

  return derecho_minero;
};
