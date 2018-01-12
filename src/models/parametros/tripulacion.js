module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tripulacion', {
    id_tripulacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apellido_paterno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apellido_materno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo_documento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numero_documento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.tripulacion.belongsTo(models.vuelo, {as: 'vuelo', foreignKey: {name:'fid_vuelo'}});
          models.tripulacion.belongsTo(models.licencia, {as: 'licencia', foreignKey: {name:'fid_licencia'}});
          //models.tripulacion.hasMany(models.piloto, {as: 'pilotos', foreignKey: {name:'fid_tripulacion', allowNull: true}});
          //models.tripulacion.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_tripulacion', allowNull: false } });
          // models.tripulacion.belongsToMany(models.mineral, { through: models.mineral_tripulacion });
          // models.tripulacion.belongsToMany(models.apm, { as: 'tripulacion', through: models.tripulacion_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "tripulacion" }],
      },
    });
};
