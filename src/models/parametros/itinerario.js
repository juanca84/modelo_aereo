module.exports = function (sequelize, DataTypes) {
  return sequelize.define('itinerario', {
    id_itinerario: {
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
    dia_semana: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hora_llegada: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hora_salida: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {          
          //models.itinerario.belongsTo(models.aeropuerto, {as: 'aeropuerto', foreignKey: {name:'fid_aeropuerto', allowNull: true}});
          //models.itinerario.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_itinerario', allowNull: false } });
          // models.itinerario.belongsToMany(models.mineral, { through: models.mineral_itinerario });
          // models.itinerario.belongsToMany(models.apm, { as: 'itinerario', through: models.itinerario_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "itinerario" }],
      },
    });
};
