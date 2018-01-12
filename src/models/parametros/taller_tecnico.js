module.exports = function (sequelize, DataTypes) {
  return sequelize.define('taller', {
    id_taller: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,

      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.taller.belongsTo(models.licencia, {as: 'licencia', foreignKey: {name:'fid_licencia',allowNull: true}});
          //models.taller.belongsTo(models.licencia, {as: 'licencia', foreignKey: {name:'fid_licencia', allowNull: true}});
          //models.taller.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_taller', allowNull: false } });
          // models.taller.belongsToMany(models.mineral, { through: models.mineral_taller });
          // models.taller.belongsToMany(models.apm, { as: 'taller', through: models.taller_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "taller" }],
      },
    });
};
