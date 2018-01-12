module.exports = function (sequelize, DataTypes) {
  return sequelize.define('operador_aereo', {
    id_operador_aereo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
      timestamps: false,
      paranoid: true,

      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.operador_aereo.belongsTo(models.licencia, {as: 'licencia', foreignKey: {name:'fid_licencia'}});
          //models.operador_aereo.belongsTo(models.vuelo, {as: 'vuelo', foreignKey: {name:'fid_vuelo',allowNull: true}});
          //models.operador_aereo.belongsTo(models.licencia, {as: 'licencia', foreignKey: {name:'fid_licencia', allowNull: true}});
          //models.operador_aereo.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_operador_aereo', allowNull: false } });
          // models.operador_aereo.belongsToMany(models.mineral, { through: models.mineral_operador_aereo });
          // models.operador_aereo.belongsToMany(models.apm, { as: 'operador_aereo', through: models.operador_aereo_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "operador_aereo" }],
      },
    });
};
