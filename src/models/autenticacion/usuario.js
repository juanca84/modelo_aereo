/**
 * Modelo para la tabla usuario
 * @param {type} sequelize
 * @param {type} DataType
 * @returns usuario
 */
'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataType) => {
  const usuario = sequelize.define('usuario', {
    id_usuario: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    nit: {
      type: DataType.STRING(20),
      xlabel: 'NIT',
      unique: true,
      validate: {
        isUnique: (value, next) => {
          usuario.find({where: {nit: value}}).then((usuarioRes) => {
            if (usuarioRes)
              return next(`El NIT ${value} ya se encuentra asociado a otro usuario`);
            return next();
          }) .catch((err) => { next(err); });
        },
        //len: {args: [9, 18], msg: "El campo 'NIT' permite un mínimo de 9 caracteres y un máximo de 18 caracteres."},
      },
    },
    nro_afcoop: {
      type: DataType.STRING(20),
      xlabel: 'NRO AFCOOP',
      unique: true,
      validate: {
        isUnique: (value, next) => {
          usuario.find({where: {nro_afcoop: value}}).then((usuarioRes) => {
            if (usuarioRes)
              return next(`El Número Afcoop ${value} ya se encuentra asociado a otro usuario`);
            return next();
          }) .catch((err) => { next(err); });
        },
        //len: {args: [9, 18], msg: "El campo 'NIT' permite un mínimo de 9 caracteres y un máximo de 18 caracteres."},
      },
    },
    usuario: {
      type: DataType.STRING(100),
      xlabel: 'Nombre de usuario',
      allowNull: false,
    },
    acepta_condiciones: {
      type: DataType.BOOLEAN,
      xlabel: 'Acepta Condiciones',
      allowNull: false,
      defaultValue: false,
    },
    email: {
      type: DataType.STRING(100),
      xlabel: 'Correo electrónico',
      allowNull: true,
      unique: true,
      validate: {
        isEmail: {args: true, msg: "El campo 'Correo Electrónico' no tiene el formato correcto"},
        len: {args: [3, 100], msg: "El campo 'Correo Electrónico' permite un mínimo de 3 caracteres y un máximo de 100 caracteres"},
      },
    },
    contrasena: {
      type: DataType.STRING,
      xlabel: 'Contraseña',
      allowNull: true,
      defaultValue: '',
    },
    codigo_contrasena: {
      type: DataType.STRING(30),
      xlabel: 'Código Contraseña',
      allowNull: true,
    },
    fecha_expiracion: {
      type: DataType.DATE,
      xlabel: 'Fecha Expiración',
      allowNull: true,
    },
    estado: {
      type: DataType.ENUM,
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'PENDIENTE',
      values: ['PENDIENTE', 'ACTIVO', 'INACTIVO'],
      validate: {
        isIn: {args: [['PENDIENTE', 'ACTIVO', 'INACTIVO']], msg: "El campo estado sólo permite valores: PENDIENTE, ACTIVO e INACTIVO."},
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
        usuario.belongsTo(models.persona, {as: 'persona', foreignKey: {name: 'fid_persona', allowNull: true}});
        usuario.hasMany(models.usuario_rol, {as: 'usuarios_roles', foreignKey: {name: 'fid_usuario', allowNull: true}});
      },
    },
    tableName: 'usuario',
    comment: 'Tabla para almacenar usuarios del sistema. Los usuarios pueden ser empresarios (esto incluye: unidades productivas, icaps y proveedores), artesanos y operadores (que pueden ser usuarios con rol técnico y administrador)',
  });
  usuario.beforeUpdate((instanceUsuario, options) => {
    hashPasswordHook(instanceUsuario);
  });
  usuario.beforeCreate((instanceUsuario, options) => {
    hashPasswordHook(instanceUsuario);
  });
  //Hash password usuario MD5 para eventos de actualizacion y creacion
  const hashPasswordHook = (instance) => {
    if (!instance.changed('contrasena')) return false;
    const contrasena = instance.get('contrasena');
    const password = crypto.createHash("sha256").update(contrasena).digest("hex");
    const bolEmpresarioNit = instance.get('tipo') === USUARIO_TIPO_EMPRESARIO && (typeof(instance.get('nit'))!== undefined && instance.get('nit')!== null);
    const usuario = process.env.NODE_ENV === 'production' && bolEmpresarioNit ? instance.get('usuario').toLowerCase() : instance.get('usuario');
    instance.set('contrasena', password);
    instance.set('usuario', usuario);
  };

  return usuario;
};
