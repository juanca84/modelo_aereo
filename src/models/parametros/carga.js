module.exports = function (sequelize, DataTypes) {
  return sequelize.define('carga', {
    id_carga: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cantidad: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    unidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    peso: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    volumen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ruex: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.carga.belongsTo(models.vuelo, {as: 'vuelo', foreignKey: {name:'fid_vuelo', allowNull: true}});
          //models.carga.belongsTo(models.aeropuerto, {as: 'aeropuerto', foreignKey: {name:'fid_aeropuerto', allowNull: true}});
          //models.carga.belongsTo(models.itinerario, {as: 'itinerario', foreignKey: {name:'fid_itinerario', allowNull: true}});
          //models.carga.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_carga', allowNull: false } });
          // models.carga.belongsToMany(models.mineral, { through: models.mineral_carga });
          // models.carga.belongsToMany(models.apm, { as: 'carga', through: models.carga_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "carga" }],
      },
    });
};
