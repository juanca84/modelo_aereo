module.exports = function (sequelize, DataTypes) {
  return sequelize.define('plan_vuelo', {
    id_plan_vuelo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_hora_llegada: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_hora_salida: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_hora_llegada_plataforma: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_hora_salida_plataforma: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_hora_llegada_PIT: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_hora_salida_PIT: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.plan_vuelo.belongsTo(models.aeropuerto, {as: 'aeropuerto_salida', foreignKey: {name:'fid_aeropuerto_salida', allowNull: true}});
          models.plan_vuelo.belongsTo(models.aeropuerto, {as: 'aeropuerto_llegada', foreignKey: {name:'fid_aeropuerto_llegada', allowNull: true}});
          models.plan_vuelo.belongsTo(models.ruta, {as: 'ruta', foreignKey: {name:'fid_ruta', allowNull: true}});
          models.plan_vuelo.belongsTo(models.aeronave, {as: 'aeronave', foreignKey: {name:'fid_aeronave', allowNull: true}});
          models.plan_vuelo.belongsTo(models.itinerario, {as: 'itinerario', foreignKey: {name:'fid_itinerario', allowNull: true}});
          //models.plan_vuelo.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_plan_vuelo', allowNull: false } });
          // models.plan_vuelo.belongsToMany(models.mineral, { through: models.mineral_plan_vuelo });
          // models.plan_vuelo.belongsToMany(models.apm, { as: 'plan_vuelo', through: models.plan_vuelo_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "plan_vuelo" }],
      },
    });
};
