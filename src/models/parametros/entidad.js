/**
 * Modelo para la tabla entidad
 * @param {type} sequelize
 * @param {type} DataType
 * @returns entidad
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const entidad = sequelize.define('entidad', {
    id_entidad: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    codigo: {
      type: DataType.STRING(10),
      xlabel: 'Código de tramite',
    },
    sigla: {
      type: DataType.STRING(15),
      xlabel: 'Sigla',
      allowNull: false,
    },
    nombre: {
      type: DataType.STRING(200),
      xlabel: 'Descripción',
      allowNull: false,
      validate: {
        len: {args: [0, 200], msg: "El campo 'Descripción' permite un máximo de 200 caracteres."},
        notEmpty: {args: [true], msg: "El campo 'Descripción' es obligatorio."},
      },
    },
    ruta_logo: {
      type: DataType.STRING(500),
      xlabel: 'Ruta del logo de la institución',
      allowNull: true,
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
    _usuario_creacion: {
      type: DataType.INTEGER,
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      xlabel: 'Usuario de modificación',
    }
  }, {
      createdAt: '_fecha_creacion',
      updatedAt: '_fecha_modificacion',
      deletedAt: '_fecha_eliminacion',
      paranoid: true,
      classMethods: {
        associate: (models) => {
          models.entidad.belongsTo(models.entidad, {as: 'entidad_padre', foreignKey: {name:'fid_entidad_padre', targetKey: 'id_entidad', allowNull: true}});
          models.entidad.hasMany(models.entidad, {as: 'entidad_hijo', foreignKey: {name:'fid_entidad_padre', allowNull: true}});
          models.entidad.hasMany(models.tramite, { as: 'tramites', foreignKey: { name: 'fid_entidad', allowNull: false } });
        },
        tableName: 'entidad',
        comment: 'Tabla para almacenar las entidades.'
      }
    });

  return entidad;
};
