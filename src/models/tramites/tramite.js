/**
 * Modelo para la tabla tramite
 * @param {type} sequelize
 * @param {type} DataType
 * @returns tramite
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const tramite = sequelize.define('tramite', {
    id_tramite: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    codigo: {
      type: DataType.STRING(10),
      xlabel: 'Código de tramite',
    },
    denominacion: {
      type: DataType.STRING(50),
      xlabel: 'Denominación',
      allowNull: false,
    },
    abreviatura: {
      type: DataType.STRING(30),
      xlabel: 'Abreviatura',
      allowNull: false,
    },
    descripcion: {
      type: DataType.STRING(1000),
      xlabel: 'Descripción',
      allowNull: false,
      validate: {
        len: {args: [0, 1000], msg: "El campo 'Descripción' permite un máximo de 1000 caracteres."},
        notEmpty: {args: [true], msg: "El campo 'Descripción' es obligatorio."}
      },
    },
    costo: {
      type: DataType.DECIMAL(5, 0),
      xlabel: 'Costo',
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: {args: [0], msg: "El campo 'Costo' sólo permite valores numéricos mayores o iguales a cero."},
        max: {args: [99999], msg: "El campo 'Costo' sólo permite valores numéricos menores a 99999."},
        isInt: {args: [true], msg: "El campo 'Costo' sólo permite valores numéricos mayores o iguales a cero."},
      },
    },
    vigencia_meses: {
      type: DataType.INTEGER,
      xlabel: 'Vigencia en número de meses',
      allowNull: true,
    },
    nro_cuenta_bancaria: {
      type: DataType.STRING(20),
      xlabel: 'Número de cuenta Bancaria',
      allowNull: true,
    },
    modelo: {
      type: DataType.STRING(50),
      xlabel: 'Nombre del modelo relacionado al trámite.',
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
      allowNull :false,
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
            tramite.belongsTo(models.entidad, {as: 'entidad', foreignKey: {name: 'fid_entidad', allowNull: false}});
            tramite.hasMany(models.seguimiento_tramite, { as: 'seguimientos', foreignKey: { name: 'fid_tramite', allowNull: false } });
        },
        tableName: 'tramite',
        comment: 'Tabla para almacenar los tramites.'
      }
    });

  return tramite;
};
