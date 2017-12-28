/**
 * Modelo para la tabla documentos del plan de trabajo
 * @param {type} sequelize
 * @param {type} DataType
 * @returns documento_plan_trabajo
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const documento_plan_trabajo = sequelize.define('documento_plan_trabajo', {
    id_documento_plan_trabajo: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID'
    },
    ruta_documento: {
      type: DataType.STRING(500),
      xlabel: 'Ruta del documento del plan de trabajo',
      allowNull: true
    },
    estado: {
      type: DataType.ENUM,
      xlabel: 'Estado de la imagens del plan de trabajo',
      allowNull: true,
      values: ['ACTIVO', 'INACTIVO'],
      validate: {
        isIn: { args: ['ACTIVO', 'INACTIVO'], msg: "El campo 'estado' sólo permite valores: 'ACTIVO' o 'INACTIVO'." }
      }
    }
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    classMethods: {
      associate: (models) => {
        documento_plan_trabajo.belongsTo(models.plan_trabajo, { as: 'plan_trabajo', foreignKey: { name: 'fid_plan_trabajo', allowNull: false } });
      }
    },
    tableName: 'documento_plan_trabajo',
    comment: 'Tabla para almacenar los documentos del plan de trabajo.'
  });
  return documento_plan_trabajo;
};
