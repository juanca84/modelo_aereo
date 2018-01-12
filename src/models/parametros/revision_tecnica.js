module.exports = function (sequelize, DataTypes) {
  return sequelize.define('revision_tecnica', {
    id_revision_tecnica: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    tipo_revision: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nro_revision: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_inicio_revision: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_fin_revision: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,

      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.revision_tecnica.belongsTo(models.aeronave, {as: 'operador_aereo', foreignKey: {name:'fid_aeronave',allowNull: true}});
          models.revision_tecnica.belongsTo(models.taller, {as: 'licencia', foreignKey: {name:'fid_taller', allowNull: true}});
          //models.revision_tecnica.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_revision_tecnica', allowNull: false } });
          // models.revision_tecnica.belongsToMany(models.mineral, { through: models.mineral_revision_tecnica });
          // models.revision_tecnica.belongsToMany(models.apm, { as: 'revision_tecnica', through: models.revision_tecnica_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "revision_tecnica" }],
      },
    });
};
