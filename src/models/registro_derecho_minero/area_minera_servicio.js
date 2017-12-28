/**
 * Modelo para la tabla area_minera_servicio
 * @param {type} sequelize
 * @param {type} DataType
 * @returns area_minera_servicio
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const area_minera_servicio = sequelize.define('area_minera_servicio', {
    id_area_minera_servicio: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'Identificador de Area Minera'
    },
    codigo_area: {
      type: DataType.STRING(20),
      xlabel: 'Código de área minera',
      allowNull: false
    },
    denominacion_area: {
      type: DataType.STRING(100),
      xlabel: 'Denominación de área minera',
      allowNull: false
    },
    departamento: {
      type: DataType.STRING(50),
      xlabel: 'Nombre de departamento',
      allowNull: true
    },
    provincias: {
      type: DataType.STRING(250),
      xlabel: 'Nombre de las provincias',
      allowNull: true
    },
    municipios: {
      type: DataType.STRING(250),
      xlabel: 'Nombre de los municipios',
      allowNull: true
    },
    cuadriculas_libres: {
      type: DataType.STRING(3000),
      xlabel: 'Listado de la cuadriculas libres',
      allowNull: true
    },
    cantidad_cuadriculas_libres: {
      type: DataType.STRING(10),
      xlabel: 'Cantidad de las cuadriculas libres',
      allowNull: true
    },
    correlativo: {
      type: DataType.STRING(50),
      xlabel: 'Correlativo',
      allowNull: true
    },
    fecha_solicitud: {
      type: DataType.DATE,
      xlabel: 'Fecha de solicitud',
      allowNull: true
    },
    estado: {
      type: DataType.ENUM,
      xlabel: 'Tipo de actividad económica',
      allowNull: true,
      values: ['ACTIVO', 'INACTIVO'],
      validate: {
        isIn: {args: [['ACTIVO', 'INACTIVO' ]], msg: "El campo 'Tipo de actividad económica' sólo permite valores: 'ACTIVO' o 'INACTIVO'."}
      },
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    classMethods: {
      associate: (models) => {
        area_minera_servicio.hasMany(models.derecho_minero, { as: 'derecho_minero', foreignKey: { name: 'fid_area_minera_servicio', allowNull: true } });
      }
    },
    tableName: 'area_minera_servicio',
    comment: 'Tabla para almacenar los derecho mineros.'
  });

  return area_minera_servicio;
};
