/**
 * Modelo para la tabla apm
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const apm = sequelize.define('apm', {
    id_apm: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    nit: {
      type: DataType.STRING(20),
      xlabel: 'NIT',
      allowNull: true,
      validate: {
        isInt: (value, next) => {
          if(value && isNaN(parseInt(value))) {
            return next(`El campo 'NIT' sólo permite valores numéricos.`);
          } else {
            return next();
          }
        },
        len: (value, next) => {
          if(value && value.length < 8) {
            return next(`El campo 'NIT' permite un mínimo de 9 caracteres y un máximo de 12 caracteres.`);
          } else if(value && value.length > 12) {
            return next(`El campo 'NIT' permite un mínimo de 9 caracteres y un máximo de 12 caracteres.`);
          } else {
            return next();
          }
        },
      },
    },
    rum: {
      type: DataType.STRING(20),
      xlabel: 'RUM',
      allowNull: true,
      validate: {
        isInt: (value, next) => {
          if(value && isNaN(parseInt(value))) {
            return next(`El campo 'RUM' sólo permite valores numéricos.`);
          } else {
            return next();
          }
        },
        len: (value, next) => {
          if(value && value.length < 8) {
            return next(`El campo 'RUM' permite un mínimo de 9 caracteres y un máximo de 12 caracteres.`);
          } else if(value && value.length > 12) {
            return next(`El campo 'RUM' permite un mínimo de 9 caracteres y un máximo de 12 caracteres.`);
          } else {
            return next();
          }
        },
      },
    },
    razon_social: {
      type: DataType.STRING(250),
      xlabel: 'Razón Social',
      allowNull: true,
      validate: {
        len: {args: [0, 250], msg: "El campo 'Razón Social' permite un máximo de 250 caracteres."},
      },
    },
    matricula_comercio: {
      type: DataType.STRING(50),
      xlabel: 'Matrícula de comercio',
      allowNull: true,
      validate: {
        len: {args: [0, 50], msg: "El campo 'Matrícula de comercio' permite un máximo de 50 caracteres."},
      },
    },
    nro_afcoop: {
      type: DataType.STRING(20),
      xlabel: 'Número de registro AFCOOP',
      allowNull: true,
    },
    nro_resolucion_afcoop: {
      type: DataType.STRING(25),
      xlabel: 'Número de resolución de personeria juridica AFCOOP',
      allowNull: true,
    },
    fecha_afcoop: {
      type: DataType.DATE,
      xlabel: 'Fecha de AFCOOP',
      allowNull: true,
    },
    nro_asociado: {
      type: DataType.INTEGER,
      xlabel: 'Número de asociados',
      allowNull: true,
    },
    denominacion: {
      type: DataType.STRING(250),
      xlabel: 'Denominación',
      allowNull: true,
    },
    actividad_matricula: {
      type: DataType.STRING(250),
      xlabel: 'Actividad Matricula',
      allowNull: true,
    },
    ruta_resolucion_afcoop: {
      type: DataType.STRING(500),
      xlabel: 'Ruta de Resolución de la AFCOOP',
      allowNull: true,
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
    estado_rum: {
      type: DataType.ENUM,
      xlabel: 'estado rum',
      allowNull: true,
      values: [, 'NUEVO', 'ENVIADO', 'APROBADO', 'OBSERVADO', 'RECHAZADO', 'FIRMADO', 'CORREGIDO'],
      validate: {
        isIn: {args: [[, 'NUEVO', 'ENVIADO', 'APROBADO', 'OBSERVADO', 'RECHAZADO', 'FIRMADO', 'CORREGIDO']], msg: "El campo 'estado_rum' sólo permite valores: , 'NUEVO', 'ENVIADO', 'APROBADO', 'OBSERVADO', 'RECHAZADO', 'FIRMADO', 'CORREGIDO'"},
      },
    },
    fecha_actualziacion: {
      type: DataType.DATE,
      xlabel: 'Fecha de actualizacion',
      allowNull: true,
    },
    fid_federacion_cooperativa: {
      type: DataType.INTEGER,
      xlabel: 'Federación Cooperativa',
      allowNull: true,
    },
    ruta_certificado: {
      type: DataType.STRING(250),
      xlabel: 'Ruta Documento',
      allowNull: true,
    },
    ruta_asociados: {
      type: DataType.STRING(250),
      xlabel: 'Ruta Federación Cooperativa',
      allowNull: true,
    },
    ruta_federacion_cooperativa: {
      type: DataType.STRING(250),
      xlabel: 'Ruta Federación Cooperativa',
      allowNull: true,
    },
    ruta_asignacion_mae: {
      type: DataType.STRING(250),
      xlabel: 'Ruta Asignacion MAE',
      allowNull: true,
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    classMethods: {
      associate: (models) => {
        apm.belongsTo(models.usuario, {as: 'usuario', foreignKey: {name: 'fid_usuario', allowNull: false}});
        apm.belongsTo(models.parametro, {as: 'tipo_societario', foreignKey: {name: 'fid_par_tipo_societario', allowNull: true}});
        apm.belongsTo(models.parametro, {as: 'tipo_organizacion', foreignKey: {name: 'fid_par_tipo_organizacion', allowNull: true}});
        apm.belongsTo(models.parametro, {as: 'tipo_entidad_publica', foreignKey: {name: 'fid_par_tipo_entidad_publica', allowNull: true}});
        apm.belongsTo(models.parametro, {as: 'sector', foreignKey: {name: 'fid_par_sector', allowNull: true}});
        apm.belongsTo(models.parametro, {as: 'clase', foreignKey: {name: 'fid_par_clase', allowNull: true}});
        apm.hasMany(models.ubicacion, {as: 'ubicaciones', foreignKey: {name: 'fid_apm', allowNull: false}});
        apm.belongsToMany(models.persona, { as: 'asociado',through: models.asociado });
        apm.belongsToMany(models.persona, { as: 'representante',through: models.representante_legal });
        apm.belongsToMany(models.mineral, { through: models.mineral_apm });
        apm.belongsToMany(models.dpa, { as: 'dpa',through: models.dpa_apm });
        apm.belongsToMany(models.parametro, { as: 'actividad',through: models.actividad_apm });
        apm.belongsTo(models.parametro, {as: 'tipo_apm', foreignKey: {name: 'fid_par_tipo_apm', allowNull: true}});
        apm.belongsToMany(models.derecho_minero, { as: 'derechos_mineros', through: models.derecho_minero_apm });
      },
    },
    tableName: 'apm',
    comment: 'Tabla para almacenar las declaraciones juradas de los usuarios empresarios/artesanos del sistema.',
  });

  return apm;
};
