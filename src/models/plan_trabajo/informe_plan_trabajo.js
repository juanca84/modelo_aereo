/**
 * Modelo para la tabla informe_plan_trabajo
 * @param {type} sequelize
 * @param {type} DataType
 * @returns informe_plan_trabajo
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const informe_plan_trabajo = sequelize.define('informe_plan_trabajo', {
    id_informe_plan_trabajo: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID'
    },
    fecha_aprobacion: {
      type: DataType.DATE,
      xlabel: 'Fecha de la aprobación del informe',
      allowNull: true
    },
    fecha_firma: {
      type: DataType.DATE,
      xlabel: 'Fecha de la firma',
      allowNull: true
    },
    ruta_informe: {
      type: DataType.STRING(500),
      xlabel: 'Ruta del informe del plan de trabajo',
      allowNull: true
    },
    estado_informe_plan_trabajo: {
      type: DataType.ENUM,
      xlabel: 'Estado del informe del plan de trabajo',
      allowNull: true,
      values: ['GENERADO', 'ENVIADO', 'FIRMADO'],
      validate: {
        isIn: {args: [['GENERADO', 'ENVIADO', 'FIRMADO']], msg: "El 'estado informe_plan_trabajo' sólo permite valores: 'GENERADO', 'ENVIADO', 'FIRMADO'."}
      }
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
        informe_plan_trabajo.belongsTo(models.plan_trabajo, { as: 'plan_trabajo', foreignKey: { name: 'fid_plan_trabajo', allowNull: false } });
        informe_plan_trabajo.belongsTo(models.usuario, { as: 'usuario_revisor', foreignKey: { name: 'fid_usuario_revisor', allowNull: true } });
        informe_plan_trabajo.belongsTo(models.usuario, { as: 'usuario_director', foreignKey: { name: 'fid_usuario_director', allowNull: true } });
      }
    },
    tableName: 'informe_plan_trabajo',
    comment: 'Tabla para almacenar las imagenes del plan de trabajo.'
  });
  return informe_plan_trabajo;
};
