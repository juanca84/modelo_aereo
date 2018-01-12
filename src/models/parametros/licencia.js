module.exports = function (sequelize, DataTypes) {
  return sequelize.define('licencia', {
    id_licencia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_inicio_vigencia: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_fin_vigencia: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          //models.licencia.belongsTo(models.piloto, {as: 'piloto', foreignKey: {name:'fid_piloto',allowNull: true}});
          //models.licencia.hasOne(models.licencia, {as: 'sublicencia', foreignKey: {name:'fid_licencia_superior', allowNull: true}});
          //models.licencia.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_licencia', allowNull: false } });
          // models.licencia.belongsToMany(models.mineral, { through: models.mineral_licencia });
          // models.licencia.belongsToMany(models.apm, { as: 'licencia', through: models.licencia_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "licencia" }],
      },
    });
};
