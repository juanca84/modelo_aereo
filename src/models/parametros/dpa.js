module.exports = function (sequelize, DataTypes) {
  return sequelize.define('dpa', {
    id_dpa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nivel_dpa: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    codigo_ine: {
      type: DataTypes.STRING(25),
      allowNull: true,
      // unique: true
    },
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.dpa.belongsTo(models.dpa, {as: 'dpa_superior', foreignKey: {name:'fid_dpa_superior', targetKey: 'id_dpa', allowNull: true}});
          models.dpa.hasMany(models.dpa, {as: 'subdpa', foreignKey: {name:'fid_dpa_superior', allowNull: true}});
          // models.dpa.hasMany(models.ubicacion, { as: 'ubicaciones', foreignKey: { name: 'fid_dpa', allowNull: false } });
          // models.dpa.belongsToMany(models.mineral, { through: models.mineral_dpa });
          // models.dpa.belongsToMany(models.apm, { as: 'dpa', through: models.dpa_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "dpa" }],
      },
    });
};
