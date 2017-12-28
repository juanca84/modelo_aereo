/**
 * Lógica del Negocio -> ServicioBL
 */
const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const servicios = require('../../servicios_web/servicios_web');
const servicioSegip = require('../../servicios_web/servicio_segip');
const autenticacionBL = require('../../bls/autenticacion/autenticacionBL');

const crearUsuarioDeImpuestos = (usuarioObj) => {
  const app = require('../../../index.js');
  const models = app.src.db.models;
  const deferred = Q.defer();
  dao.crearRegistro(models.usuario, usuarioObj, false)
  .then(respuestaUsuario => {
    const rolObj = {
      fid_rol: ROL_UNIDAD_PRODUCTIVA,
      fid_usuario: respuestaUsuario.id_usuario,
      _usuario_creacion: respuestaUsuario._usuario_creacion,
    };
    return dao.crearRegistro(models.usuario_rol, rolObj, false)
  })
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
};

const verificaIdentidadImpuestos = (nit, usuario, contrasena) => {
 const app = require('../../../index.js');
 const models = app.src.db.models;
 const deferred = Q.defer();
 servicios.validarNIT(nit, usuario, contrasena)
 .then(respuestaImpuestos => {
   if(util.isUndefined(respuestaImpuestos)) {
     deferred.reject(new Error(`No se encuentra al usuario ${usuario} con NIT ${nit}`));
   } else {
     deferred.resolve(true);
   }
 })
 .catch(error => deferred.reject(error));
 return deferred.promise;
};

const validarNIT = (nit, usuario, contrasena, crear) => {
  const app = require('../../../index.js');
  const models = app.src.db.models;
  const deferred = Q.defer();
  let usuarioObj = {};
  servicios.validarNIT(nit, usuario, contrasena)
  .then(respuestaImpuestos => {
    const usuarioObj = {
      usuario,
      nit,
      _usuario_creacion: USUARIO_ADMIN,
    };

    return dao.crearRegistro(models.usuario, usuarioObj, false);
  })
  .then(respuestaUsuario =>  {
    usuarioObj = respuestaUsuario;
    const rolObj = {
      fid_rol: ROL_UNIDAD_PRODUCTIVA,
      fid_usuario: respuestaUsuario.id_usuario,
      _usuario_creacion: respuestaUsuario._usuario_creacion,
    };
    return dao.crearRegistro(models.usuario_rol, rolObj, false)
  })
  .then(respuesta => {
    usuarioObj.dataValues.rol = respuesta.dataValues;
    deferred.resolve(usuarioObj.dataValues);
  })
  .catch(error => deferred.reject(error))
  return deferred.promise;
};

const actualizarDatosEmpresa = (matricula_comercio, models, body) => {
  const deferred = Q.defer();
  servicios.obtenerInformacionEmpresa(matricula_comercio)
  .then(resultInfo => {
    if (resultInfo && resultInfo.data) {
      const infoDetalle = resultInfo.data.SrvInfoMatriculaResult.infoMatricula[0];
      const datosEmpresaObj = {
        nit: resultInfo.empresa.nit,
        matricula_comercio: resultInfo.empresa.matricula_comercio,
        razon_social: resultInfo.empresa.razon_social,
        actividad_declarada: resultInfo.empresa.actividad_declarada,
        descripcion_actividad_declarada: resultInfo.empresa.desc_actividad_declarada,
        tipo_sociedad: resultInfo.empresa.tipo_sociedad,
        fecha_constitucion: resultInfo.empresa.fecha_inscripcion,
        nro_sucursales: resultInfo.empresa.sucursales? resultInfo.empresa.sucursales.length : 0,
        sucursales: resultInfo.empresa.sucursales,
        casa_matriz: {
          departamento: infoDetalle.Departamento,
          provincia: infoDetalle.Provincia,
          municipio: infoDetalle.Municipio,
          calleAv: infoDetalle.CalleAv,
          calleAvRef: infoDetalle.EntreCalles,
          numero: infoDetalle.Nro,
          edificio: infoDetalle.Edificio,
          piso: infoDetalle.Piso,
          nroOficina: infoDetalle.NroOficina,
          zona: infoDetalle.Zona,
        },
      };
      deferred.resolve(datosEmpresaObj);
    } else {
      throw new Error("No se ha encontrado los datos de la empresa con la Matrícula enviada. Por favor verifique sus datos.");
    }

  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

// busca los representantes legales asignados a una matricula
const buscarRepresentanteLegal = (matricula) => {
  const deferred = Q.defer();
  servicios.buscarRepresentantes(matricula)
    .then(resultBuscarRep => deferred.resolve(resultBuscarRep))
    .catch(error => deferred.reject(error));
  return deferred.promise;
}
// busca las matriculas asignadas a un nit
const buscarMatriculas = (nit) => {
  const deferred = Q.defer();
  servicios.obtenerMatriculas(nit)
    .then(resultBuscarRep => deferred.resolve(resultBuscarRep))
    .catch(error => deferred.reject(error));
  return deferred.promise;
}
// busca los datos de la empresa en base a su matricula
const buscarInformacionEmpresa = (matricula) => {
  const deferred = Q.defer();
  servicios.obtenerInformacionEmpresa(matricula)
    .then(resultBuscarRep => deferred.resolve(resultBuscarRep))
    .catch(error => deferred.reject(error));
  return deferred.promise;
}

const buscarInformacionDeposito = (deposito,fecha) => {
  const deferred = Q.defer();
  servicios.obtenerInformacionDeposito(deposito,fecha)
    .then(resultBuscarRep => deferred.resolve(resultBuscarRep))
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

module.exports = {
  validarNIT,
  verificaIdentidadImpuestos,
  actualizarDatosEmpresa,
  buscarRepresentanteLegal,
  buscarMatriculas,
  buscarInformacionEmpresa,
  buscarInformacionDeposito,
};
