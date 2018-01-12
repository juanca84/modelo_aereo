module.exports = function (sequelize, DataTypes) {
  return sequelize.define('incidente', {
    id_incidente: {
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
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.incidente.belongsTo(models.vuelo, {as: 'vuelo', foreignKey: {name:'fid_vuelo',allowNull: true}});
          models.incidente.belongsTo(models.sancion, {as: 'sancion', foreignKey: {name:'fid_sancion', allowNull: true}});
          //models.incidente.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_incidente', allowNull: false } });
          // models.incidente.belongsToMany(models.mineral, { through: models.mineral_incidente });
          // models.incidente.belongsToMany(models.apm, { as: 'incidente', through: models.incidente_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "incidente" }],
      },
    });
};
