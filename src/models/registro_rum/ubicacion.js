/**
 * Modelo para la tabla Ubicacion de la Unidad Productiva
 * @param {type} sequelize
 * @param {type} DataType
 * @returns ubicacion
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const ubicacion = sequelize.define('ubicacion', {
    id_ubicacion: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    tipo: {
      type: DataType.ENUM,
      xlabel: 'Tipo de ubicacion',
      allowNull: true,
      values: [, 'CENTRAL', 'SUCURSAL', 'LEGAL'],
      validate: {
        isIn: {args: [[, 'CENTRAL', 'SUCURSAL', 'LEGAL']], msg: "El campo 'Tipo de Ubicacion: , 'CENTRAL', 'SUCURSAL', 'LEGAL'."},
      },
    },
    zona: {
      type: DataType.STRING(100),
      allowNull: true,
      validate: {
        len: {args: [1, 100], msg: "El campo 'Zona' permite un mínimo de 1 caracter y un máximo de 100 caracteres"},
      },
    },
    avenida_calle: {
      type: DataType.STRING(200),
      allowNull: true,
      validate: {
        len: {args: [1, 100], msg: "El campo 'Avenida/Calle' permite un mínimo de 1 caracter y un máximo de 200 caracteres"},
      },
    },
    avenida_calle_referencia: {
      type: DataType.STRING(200),
      allowNull: true,
      validate: {
        len: {args: [1, 100], msg: "El campo 'Avenida(calle referencia)' permite un mínimo de 1 caracter y un máximo de 200 caracteres"},
      },
    },
    numero: {
      type: DataType.STRING(10),
      allowNull: true,
      validate: {
        len: {args: [1, 10], msg: "El campo 'Número' permite un mínimo de 1 caracter y un máximo de 10 caracteres"}
      },
    },
    edificio: {
      type: DataType.STRING(100),
      allowNull: true,
      validate: {
        len: {args: [0, 100], msg: "El campo 'Edificio' permite un mínimo de 0 caracter y un máximo de 100 caracteres"},
      },
    },
    piso: {
      type: DataType.STRING(10),
      allowNull: true,
      validate: {
        len: {args: [1, 10], msg: "El campo 'Piso' permite un mínimo de 1 caracter y un máximo de 10 caracteres"}
      },
    },
    telefonos: {
      type: DataType.STRING(54),
      allowNull: true,
      validate: {
        len: {args: [7, 54], msg: "El campo 'Teléfonos' permite un mínimo de 7 caracteres y un máximo de 54 caracteres"},
      },
    },
    correo: {
      type: DataType.STRING(100),
      allowNull: true,
      validate: {
        isEmail: {args: true, msg: "El campo 'Correo Electrónico' no tiene el formato correcto"},
        len: {args: [3, 100], msg: "El campo 'Correo Electrónico' permite un mínimo de 3 caracteres y un máximo de 100 caracteres"},
      },
    },
    latitud: {
      type: DataType.DECIMAL(12,6),
      allowNull: true,
      xlabel: 'Latitud',
    },
    longitud: {
      type: DataType.DECIMAL(12,6),
      allowNull: true,
      xlabel: 'Longitud',
    },
    imagen_ubicacion: {
      type: DataType.STRING(100),
      xlabel: 'Croquis de la Ubicación',
      allowNull: true,
    },
    estado: {
      type: DataType.ENUM,
      xlabel: 'estado de ubicacion',
      allowNull: true,
      values: ['ACTIVO', 'INACTIVO'],
      validate: {
        isIn: {args: [['ACTIVO', 'INACTIVO' ]], msg: "El campo 'estado' sólo permite valores: 'ACTIVO' o 'INACTIVO'."},
      },
    },
    _usuario_creacion: {
      type: DataType.INTEGER,
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      xlabel: 'Usuario de modificación',
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    classMethods: {
      associate: (models) => {
        ubicacion.belongsTo(models.apm, {as: 'apm', foreignKey: {name: 'fid_apm', allowNull: false}});
        ubicacion.belongsTo(models.dpa, {as: 'dpa', foreignKey: {name: 'fid_dpa', allowNull: false}});
      },
    },
    tableName: 'ubicacion',
    comment: 'Tabla para almacenar la ubicacion de la unidad productiva)',
    hooks: {
      // beforeCreate: (rowUbicacion, options) => new Promise((resolve, reject) => {
      //   const util = require('../../libs/util');
      //   if (util.isUndefined(rowUbicacion.longitud) || util.isUndefined(rowUbicacion.latitud)) {
      //     resolve(true);
      //   } else {
      //     rowUbicacion.imagen_ubicacion = "";
      //     guardarCroquis(rowUbicacion.get().fid_apm, rowUbicacion.get().latitud, rowUbicacion.get().longitud, "500x500") //500x500 es el tamaño de la captura del mapa
      //       .then(respuesta => {
      //         rowUbicacion.imagen_ubicacion = respuesta;
      //         resolve("La ubicación se registro correctamente.")
      //       })
      //       .catch(error => reject(error));
      //   }
      // }),
      // beforeUpdate: (rowUbicacion, options) => new Promise((resolve, reject) => {
      //   ubicacion.findOne({
      //     where: {
      //       id_ubicacion: rowUbicacion.id_ubicacion,
      //     },
      //   }).then(respuestaUbicacion => {
      //     if (respuestaUbicacion.latitud != rowUbicacion.latitud && respuestaUbicacion.longitud != rowUbicacion.longitud) {
      //       const util = require('../../libs/util');
      //       if (util.isUndefined(rowUbicacion.longitud) || util.isUndefined(rowUbicacion.latitud)) {
      //         rowUbicacion.imagen_ubicacion = null;
      //         resolve(true);
      //       } else {
      //         actualizarCroquis(rowUbicacion.get().id_ubicacion, rowUbicacion.get().latitud, rowUbicacion.get().longitud, "500x500") //500x500 es el tamaño de la captura del mapa
      //           .then(respuesta => resolve(respuesta))
      //           .catch(error => reject(error));
      //       }
      //     } else {
      //       resolve("La Ubicación no se modificó.")
      //     }
      //   }).catch(error => reject(error));
      // }),
    },
  });

  const guardarCroquis = (id_apm, latitud, longitud, tamanho) => {
    const Q = require('q');
    const deferred = Q.defer();
    const util = require('../../libs/util');
    const dao = require('../../dao/dao');
    const config = require('konfig')();
    const rp = require('request-promise');
    const fs = require('fs');

    const parametros = {
      attributes: ['id_apm'],
      include: [{
        model: sequelize.models.certificacion, as: 'certificaciones',
        required: true,
        attributes: ['id_certificacion'],
        include: [{
          model: sequelize.models.formulario, as: 'formulario',
          required: true,
          attributes: ['tipo'],
        }],
      }],
    };
    dao.obtenerRegistroPorId(sequelize.models.apm, id_apm, parametros)
      .then(respuestaUnidadProductiva => {
        if (util.isUndefined(respuestaUnidadProductiva)) {
          throw new Error("No se logró encontrar formulario correspondiente a la ubicación.")
        }
        const dir = `${__dirname}/../../../files/`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        const dirCroquis = `${__dirname}/../../../files/croquis/`;
        if (!fs.existsSync(dirCroquis)) {
          fs.mkdirSync(dirCroquis);
        }
        let carpetaTipo = "SIN_FORMULARIO";
        carpetaTipo = respuestaUnidadProductiva.certificaciones[0].formulario.tipo;
        if (!fs.existsSync(`${dirCroquis}${carpetaTipo}`)) {
          fs.mkdirSync(`${dirCroquis}${carpetaTipo}`);
        }
        const hora = new Date();
        const file = `${id_apm}_${hora.getTime()}.png`;
        const token = config.app.mapboxToken;
        const pagina = `https://api.mapbox.com/styles/v1/mapbox/streets-v9/static/pin-s-circle+1524d1(${longitud},${latitud})/${longitud},${latitud},16,0/${tamanho}@2x?access_token=${token}&logo=false`;
        console.log('Pagina*: ', pagina);
        const imagen_ubicacion = `/files/croquis/${carpetaTipo}/${file}`;
        guardarAsincrono(pagina, `${dirCroquis}${carpetaTipo}/${file}`);
        deferred.resolve(imagen_ubicacion);
      }).catch(error => {
        deferred.reject(error)
      });
    return deferred.promise;
  };

  const guardarAsincrono = (pagina, ruta) => {
    const rp = require('request-promise');
    const fs = require('fs');
    rp({uri: pagina, encoding: 'binary'}).then(body => {
      fs.writeFile(ruta, body, 'binary', (err) => {
        if (err) {
          console.log("erorr ==>", err);
        } else {
          console.log("guardado exitosamente =>", pagina);
        }
      });
    }).catch(error => {
      console.log("errorr ", error)
    });

  };


  const actualizarCroquis = (id_ubicacion, latitud, longitud, tamanho) => {
    const Q = require('q');
    const deferred = Q.defer();
    const util = require('../../libs/util');
    const dao = require('../../dao/dao');
    const config = require('konfig')();
    const rp = require('request-promise');
    const fs = require('fs');
    const parametros = {
      attributes: ['id_ubicacion', 'latitud', 'longitud'],
      include: [{
        model: sequelize.models.apm, as: 'apm',
        required: true,
        attributes: ['id_apm'],
        include: [{
          model: sequelize.models.certificacion, as: 'certificaciones',
          required: true,
          attributes: ['id_certificacion'],
          include: [{
            model: sequelize.models.formulario, as: 'formulario',
            required: true,
            attributes: ['tipo'],
          }],
        }],
      }],
    };
    dao.obtenerRegistroPorId(sequelize.models.ubicacion, id_ubicacion, parametros)
      .then(respuestaUbicacion => {
        if (util.isUndefined(respuestaUbicacion)) {
          throw new Error("No se logró encontrar formulario correspondiente a la ubicación.")
        }
        const dir = `${__dirname}/../../../files/`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        const dirCroquis = `${__dirname}/../../../files/croquis/`;
        if (!fs.existsSync(dirCroquis)) {
          fs.mkdirSync(dirCroquis);
        }
        let carpetaTipo = "SIN_FORMULARIO";
        carpetaTipo = respuestaUbicacion.apm.certificaciones[0].formulario.tipo;
        if (!fs.existsSync(`${dirCroquis}${carpetaTipo}`)) {
          fs.mkdirSync(`${dirCroquis}${carpetaTipo}`);
        }
        const hora = new Date();
        const file = `${respuestaUbicacion.apm.id_apm}_${hora.getTime()}.png`;
        const token = config.app.mapboxToken;
        const pagina = `https://api.mapbox.com/styles/v1/mapbox/streets-v9/static/pin-s-circle+1524d1(${longitud},${latitud})/${longitud},${latitud},16,0/${tamanho}@2x?access_token=${token}&logo=false`;
        console.log('Pagina: ', pagina);
        const imagen_ubicacion = `/files/croquis/${carpetaTipo}/${file}`;
        guardarAsincronoUpdate(pagina, `${dirCroquis}${carpetaTipo}/${file}`, id_ubicacion, imagen_ubicacion);
        deferred.resolve(imagen_ubicacion);
      }).catch(error => {
        deferred.reject(error)
      });
    return deferred.promise;
  };

  const guardarAsincronoUpdate = (pagina, ruta, id_ubicacion, imagen_ubicacion) => {
    const rp = require('request-promise');
    const fs = require('fs');
    rp({uri: pagina, encoding: 'binary'}).then(body => {
      fs.writeFile(ruta, body, 'binary', (err) => {
        if (err) {
          console.log("error", err);
        } else {
          return sequelize.models.ubicacion.update(
            {
              imagen_ubicacion,
            }, {
              where: {
                id_ubicacion: id_ubicacion,
              },
            }
          ).then(ubicacionActualizada => {
            if (ubicacionActualizada == 0) {
              console.log("No se logró actualizar las coordenadas.");
            }
            console.log("Se guardo exitosamente");
          });
        }
      })
    }).catch(error => {
      console.log("error ", error);
    });
  };


  return ubicacion;
};
