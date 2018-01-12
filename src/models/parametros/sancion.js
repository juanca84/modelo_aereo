module.exports = function (sequelize, DataTypes) {
  return sequelize.define('sancion', {
    id_sancion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,

      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.sancion.belongsTo(models.operador_aereo, {as: 'operador_aereo', foreignKey: {name:'fid_operador_aereo', allowNull: true}});
          //models.sancion.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_sancion', allowNull: false } });
          // models.sancion.belongsToMany(models.mineral, { through: models.mineral_sancion });
          // models.sancion.belongsToMany(models.apm, { as: 'sancion', through: models.sancion_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "sancion" }],
      },
    });
};
