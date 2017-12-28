/**
 * Modelo para la tabla plan_trabajo_historico_historico
 * @param {type} sequelize
 * @param {type} DataType
 * @returns plan_trabajo_historico
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const plan_trabajo_historico = sequelize.define('plan_trabajo_historico', {
    id_plan_trabajo_historico: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID'
    },
    aspectos_generales: {
      type: DataType.JSONB,
      xlabel: 'Describe los aspectos generales del plan de trabajo, la ubicación de área y las vias de acceso',
      allowNull: true
    },
    aspectos_generales: {
      type: DataType.JSONB,
      xlabel: 'Describe los aspectos generales del plan de trabajo, la ubicación de área y las vias de acceso',
      allowNull: true
    },
    geologia_mineralizacion: {
      type: DataType.JSONB,
      xlabel: 'Describe los aspectos de la Geológica Regional, tipo de ocurrencia mineral y el potencial minero y la identificación de minerales para su producción',
      allowNull: true
    },
    mineria: {
      type: DataType.JSONB,
      xlabel: 'Describe los aspectos de tipo de explotación a emplearse, maquinaria, equipo, planta de tratamiento, estimación de costos del total y un cronograma tentativo ',
      allowNull: true
    },
    observacion_aspectos_generales: {
      type: DataType.STRING(3000),
      xlabel: 'Observación de los aspectos generales',
      allowNull: true
    },
    observacion_geologia_mineralizacion: {
      type: DataType.STRING(3000),
      xlabel: 'Observación de la geología y la mineralización',
      allowNull: true
    },
    observacion_mineria: {
      type: DataType.STRING(3000),
      xlabel: 'Observación sobre mineria',
      allowNull: true
    },
    observacion_anexos: {
      type: DataType.STRING(3000),
      xlabel: 'Observación sobre los anexos',
      allowNull: true
    },
    nota: {
      type: DataType.STRING(3000),
      xlabel: 'Nota relacionada al plan de trabajo',
      allowNull: true
    },
    fecha_solicitud: {
      type: DataType.DATE,
      xlabel: 'La fecha de cuando se deriva a la AJAM',
      allowNull: true
    },
    ruta_mapa_minero: {
      type: DataType.STRING(500),
      xlabel: 'Ruta del mapa minero',
      allowNull: true
    },
    ruta_relacion_planimetrica: {
      type: DataType.STRING(500),
      xlabel: 'Ruta de la relación planimetrica',
      allowNull: true
    },
    estado_plan_trabajo_historico: {
      type: DataType.ENUM,
      xlabel: 'Estado del plan de trabajo',
      allowNull: true,
      values: ['NUEVO', 'ENVIADO', 'OBSERVADO', 'DERIVADO', 'APROBADO', 'RECHAZADO'],
      validate: {
        isIn: {args: [['NUEVO', 'ENVIADO', 'OBSERVADO', 'DERIVADO', 'APROBADO', 'RECHAZADO']], msg: "El estado sólo permite valores: ,'NUEVO', 'ENVIADO', 'OBSERVADO', 'DERIVADO', 'APROBADO', 'RECHAZADO'."}
      }
    },
    estado: {
      type: DataType.ENUM,
      xlabel: 'Estado del plan de trabajo',
      allowNull: true,
      values: ['ACTIVO', 'INACTIVO'],
      validate: {
        isIn: { args: ['ACTIVO', 'INACTIVO'], msg: "El campo 'Tipo de actividad económica' sólo permite valores: 'ACTIVO' o 'INACTIVO'." }
      }
    }
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    classMethods: {
      associate: (models) => {
        plan_trabajo_historico.belongsTo(models.parametro, { as: 'tipo_plan_trabajo', foreignKey: { name: 'fid_tipo_plan_trabajo', allowNull: false } });
        plan_trabajo_historico.belongsTo(models.plan_trabajo, { as: 'plan_trabajo', foreignKey: { name: 'fid_plan_trabajo', allowNull: false } });
      }
    },
    tableName: 'plan_trabajo_historico',
    comment: 'Tabla para almacenar los historicos de planes de trabajo.'
  });
  return plan_trabajo_historico;
};
