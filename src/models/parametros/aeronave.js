module.exports = function (sequelize, DataTypes) {
  return sequelize.define('aeronave', {
    id_aeronave: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fabricante: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capacidad_pasajeros: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    capacidad_carga: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    capacidad_equipaje: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    autonomia: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,

      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.aeronave.belongsTo(models.operador_aereo, {as: 'operador_aereo', foreignKey: {name:'fid_operador_aereo',allowNull: true}});
          //models.aeronave.belongsTo(models.licencia, {as: 'licencia', foreignKey: {name:'fid_licencia', allowNull: true}});
          //models.aeronave.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_aeronave', allowNull: false } });
          // models.aeronave.belongsToMany(models.mineral, { through: models.mineral_aeronave });
          // models.aeronave.belongsToMany(models.apm, { as: 'aeronave', through: models.aeronave_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "aeronave" }],
      },
    });
};
