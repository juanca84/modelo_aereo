module.exports = function (sequelize, DataTypes) {
  return sequelize.define('aeropuerto', {
    id_aeropuerto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codigo_identificacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          //models.aeropuerto.belongsTo(models.vuelo, {as: 'vuelo', foreignKey: {name:'fid_vuelo'}});
          //models.aeropuerto.hasMany(models.piloto, {as: 'pilotos', foreignKey: {name:'fid_aeropuerto', allowNull: true}});
          //models.aeropuerto.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_aeropuerto', allowNull: false } });
          // models.aeropuerto.belongsToMany(models.mineral, { through: models.mineral_aeropuerto });
          // models.aeropuerto.belongsToMany(models.apm, { as: 'aeropuerto', through: models.aeropuerto_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "aeropuerto" }],
      },
    });
};
