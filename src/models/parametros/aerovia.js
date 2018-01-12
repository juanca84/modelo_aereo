module.exports = function (sequelize, DataTypes) {
  return sequelize.define('aerovia', {
    id_aerovia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    codigo_segmento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.aerovia.belongsTo(models.ruta, {as: 'ruta', foreignKey: {name:'fid_ruta', allowNull: true}});
          //models.aerovia.belongsTo(models.aeropuerto, {as: 'aeropuerto', foreignKey: {name:'fid_aeropuerto', allowNull: true}});
          //models.aerovia.belongsTo(models.itinerario, {as: 'itinerario', foreignKey: {name:'fid_itinerario', allowNull: true}});
          //models.aerovia.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_aerovia', allowNull: false } });
          // models.aerovia.belongsToMany(models.mineral, { through: models.mineral_aerovia });
          // models.aerovia.belongsToMany(models.apm, { as: 'aerovia', through: models.aerovia_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "aerovia" }],
      },
    });
};
