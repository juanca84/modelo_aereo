/**
 * Modelo para la tabla mineral
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const mineral = sequelize.define('mineral', {
    id_mineral: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    grupo: {
      type: DataType.STRING(30),
      xlabel: 'Grupo',
      allowNull: false,
      validate: {
        isIn: {args: [['MINERAL', 'AGREGADO']], msg: "El campo 'Grupo' sólo permite valores: 'MINERAL' o 'AGREGADO'."},
        len: {args: [0, 30], msg: "El campo 'Grupo' permite un máximo de 30 caracteres."},
        notEmpty: {args: [true], msg: "El campo 'Grupo' es obligatorio."},
      },
    },
    nombre: {
      type: DataType.STRING(200),
      xlabel: 'Nombre',
      allowNull: false,
      validate: {
        len: {args: [0, 200], msg: "El campo 'Nombre' permite un máximo de 200 caracteres."},
        notEmpty: {args: [true], msg: "El campo 'Nombre' es obligatorio."},
      },
    },
    descripcion: {
      type: DataType.STRING(200),
      xlabel: 'Descripción',
      validate: {
        len: {args: [0, 200], msg: "El campo 'Descripción' permite un máximo de 200 caracteres."},
        notEmpty: {args: [true], msg: "El campo 'Descripción' es obligatorio."},
      },
    },
    orden: {
      type: DataType.INTEGER,
      xlabel: 'Orden',
      allowNull : false,
      validate: {
        min: {args: [0], msg: "El campo 'Orden' sólo permite valores numéricos positivos mayores o iguales a 0."},
        isInt: {args: true, msg: "El campo 'Orden' sólo permite valores numéricos enteros positivos."},
      },
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
            mineral.belongsToMany(models.dpa, { through: models.mineral_dpa });
            mineral.belongsToMany(models.apm, { through: models.mineral_apm });
        },
        tableName: 'mineral',
        comment: 'Tabla para almacenar los minerales.',
      }
    });

  return mineral;
};