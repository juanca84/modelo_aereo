module.exports = function (sequelize, DataTypes) {
  return sequelize.define('sobrevuelo', {
    id_sobrevuelo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fecha_hora_entrada: {
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
          models.sobrevuelo.belongsTo(models.ruta, {as: 'ruta', foreignKey: {name:'fid_ruta', allowNull: true}});
          //models.sobrevuelo.belongsTo(models.aeropuerto, {as: 'aeropuerto', foreignKey: {name:'fid_aeropuerto', allowNull: true}});
          //models.sobrevuelo.belongsTo(models.itinerario, {as: 'itinerario', foreignKey: {name:'fid_itinerario', allowNull: true}});
          //models.sobrevuelo.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_sobrevuelo', allowNull: false } });
          // models.sobrevuelo.belongsToMany(models.mineral, { through: models.mineral_sobrevuelo });
          // models.sobrevuelo.belongsToMany(models.apm, { as: 'sobrevuelo', through: models.sobrevuelo_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "sobrevuelo" }],
      },
    });
};
