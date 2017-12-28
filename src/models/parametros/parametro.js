/**
 * Módulo que mapea los PARAMETROS existentes, conjunto de valores parametricos
 * que son asignados a distintas tablas.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const parametro = sequelize.define('parametro', {
    id_parametro: {
      type: DataType.INTEGER,
      primaryKey: true,
      xlabel: 'ID',
      autoIncrement: true,
    },
    grupo: {
      type: DataType.STRING(30),
      xlabel: 'Grupo',
      allowNull: false,
      validate: {
        isIn: {args: [['TIPO_ORGANIZACION_AFILIADA']], msg: "El campo 'Grupo' sólo permite valores: 'TIPO_ORGANIZACION_AFILIADA'."},
        len: {args: [0, 30], msg: "El campo 'Grupo' permite un máximo de 30 caracteres."},
        notEmpty: {args: [true], msg: "El campo 'Grupo' es obligatorio."},
      },
    },
    sigla: {
      type: DataType.STRING(50),
      xlabel: 'Sigla',
      allowNull: false,
      validate: {
        len: {args: [0, 50], msg: "El campo 'Sigla' permite un máximo de 50 caracteres."},
        notEmpty: {args: [true], msg: "El campo 'Sigla' es obligatorio."},
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
    },
  },{
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    classMethods: {
      associate: (models) => {
        parametro.belongsTo(models.parametro, {as: 'parametro_padre', foreignKey: {name: 'fid_parametro_padre', allowNull: true}});
        parametro.hasMany(models.parametro, {as: 'parametros', foreignKey: {name:'fid_parametro_padre', allowNull: false}});
        parametro.hasMany(models.parametro_formulario, {as: 'parametros_formulario', foreignKey: {name: 'fid_parametro', allowNull: false}});
        parametro.belongsToMany(models.apm, { as:'actividad', through: models.actividad_apm });
      },
    },
    tableName: 'parametro',
  });
  return parametro;
};
