module.exports = function (sequelize, DataTypes) {
  return sequelize.define('vuelo', {
    id_vuelo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    origen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destino: {
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
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.vuelo.belongsTo(models.aeronave, {as: 'aeronave', foreignKey: {name:'fid_aeronave', allowNull: true}});
          models.vuelo.belongsTo(models.aeropuerto, {as: 'aeropuerto', foreignKey: {name:'fid_aeropuerto', allowNull: true}});
          models.vuelo.belongsTo(models.itinerario, {as: 'itinerario', foreignKey: {name:'fid_itinerario', allowNull: true}});
          //models.vuelo.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_vuelo', allowNull: false } });
          // models.vuelo.belongsToMany(models.mineral, { through: models.mineral_vuelo });
          // models.vuelo.belongsToMany(models.apm, { as: 'vuelo', through: models.vuelo_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "vuelo" }],
      },
    });
};
