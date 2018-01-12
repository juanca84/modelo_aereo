module.exports = function (sequelize, DataTypes) {
  return sequelize.define('reclamo', {
    id_reclamo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,

      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.reclamo.belongsTo(models.incidente, {as: 'incidente', foreignKey: {name:'fid_incidente', allowNull: true}});
          models.reclamo.belongsTo(models.pasajero, {as: 'pasajero', foreignKey: {name:'fid_pasajero', allowNull: true}});
          //models.reclamo.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_reclamo', allowNull: false } });
          // models.reclamo.belongsToMany(models.mineral, { through: models.mineral_reclamo });
          // models.reclamo.belongsToMany(models.apm, { as: 'reclamo', through: models.reclamo_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "reclamo" }],
      },
    });
};
