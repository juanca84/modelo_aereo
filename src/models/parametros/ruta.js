module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ruta', {
    id_ruta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    origen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          //models.ruta.belongsTo(models.aeronave, {as: 'aeronave', foreignKey: {name:'fid_aeronave', allowNull: true}});
          //models.ruta.belongsTo(models.aeropuerto, {as: 'aeropuerto', foreignKey: {name:'fid_aeropuerto', allowNull: true}});
          //models.ruta.belongsTo(models.itinerario, {as: 'itinerario', foreignKey: {name:'fid_itinerario', allowNull: true}});
          //models.ruta.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_ruta', allowNull: false } });
          // models.ruta.belongsToMany(models.mineral, { through: models.mineral_ruta });
          // models.ruta.belongsToMany(models.apm, { as: 'ruta', through: models.ruta_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "ruta" }],
      },
    });
};
