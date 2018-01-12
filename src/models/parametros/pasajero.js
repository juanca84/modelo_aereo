module.exports = function (sequelize, DataTypes) {
  return sequelize.define('pasajero', {
    id_pasajero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nro_pasaje: {
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
          models.pasajero.belongsTo(models.vuelo, {as: 'vuelo', foreignKey: {name:'fid_vuelo'}});
          //models.pasajero.hasMany(models.piloto, {as: 'pilotos', foreignKey: {name:'fid_pasajero', allowNull: true}});
          //models.pasajero.hasMany(models.persona, { as: 'persona', foreignKey: { name: 'fid_pasajero', allowNull: false } });
          // models.pasajero.belongsToMany(models.mineral, { through: models.mineral_pasajero });
          // models.pasajero.belongsToMany(models.apm, { as: 'pasajero', through: models.pasajero_apm });
        },
        filterTo: () => [{ "type": "fk", "field": "pasajero" }],
      },
    });
};
