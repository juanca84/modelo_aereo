module.exports = function (sequelize, DataTypes) {
  return sequelize.define('alerta', {
    id_alerta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nivel_criticidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,

      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.alerta.belongsTo(models.aeropuerto, {as: 'aeropuerto', foreignKey: {name:'fid_aeropuerto', allowNull: true}});
          //models.alerta.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_alerta', allowNull: false } });
          // models.alerta.belongsToMany(models.mineral, { through: models.mineral_alerta });
          // models.alerta.belongsToMany(models.apm, { as: 'alerta', through: models.alerta_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "alerta" }],
      },
    });
};
