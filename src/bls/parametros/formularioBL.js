/**
 * Lógica del Negocio -> ConfiguracionBL
 */
const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;

  const listarFormularios = (query, body) => {
    const deferred = Q.defer();
    const parametros = {
      where: {
        estado: ESTADO_ACTIVO,
      },
    };
    parametros.attributes = ['id_formulario', 'tipo', 'nombre', 'descripcion', 'duracion', 'secciones', 'fecha_inicio', 'estado'];
    if ((body.audit_usuario.id_rol === ROL_ACTOR_PRODUCTIVO_MINERO && !body.audit_usuario.nit) || body.audit_usuario.id_rol === ROL_TECNICO) {
      parametros.where.tipo = {
        $in: [FORMULARIO_TIPO_UNIDAD_PRODUCTIVA],
      };
    }
    // parametros.where.ambito = query.ambito;
    parametros.order = 'id_formulario ASC';
    dao.listarRegistros(models.formulario, parametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const obtenerFormulario = (id, body) => {
    const deferred = Q.defer();
    const parametros = {
      where: {
        id_formulario: id,
        estado: ESTADO_ACTIVO,
      },
    };
    parametros.attributes = ['id_formulario', 'ambito', 'tipo', 'nombre', 'descripcion', 'duracion', 'secciones'];
    if (body.audit_usuario.id_rol === ROL_ACTOR_PRODUCTIVO_MINERO && !body.audit_usuario.nit) {
      parametros.where.tipo = {
        $in: [FORMULARIO_TIPO_UNIDAD_PRODUCTIVA],
      };
    }
    dao.obtenerRegistro(models.formulario, parametros)
    .then(respuesta => {
      if (respuesta) {
        deferred.resolve(respuesta)
      } else {
        throw new Error("El formulario solicitado no ha sido encontrado. Es posible que no esté disponible para el tipo de usuario al que pertenece.");
      }
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  };


  const obtenerFormularioPorId = (id, body) => {
    const deferred = Q.defer();
    const parametros = {
      where: {
        estado: ESTADO_ACTIVO,
      },
    };
    parametros.attributes = ['id_formulario', 'ambito', 'tipo', 'nombre', 'descripcion', 'duracion', 'secciones'];
    if (body.audit_usuario.id_rol === ROL_ACTOR_PRODUCTIVO_MINERO && !body.audit_usuario.nit) {
      parametros.where.tipo = {
        $in: [FORMULARIO_TIPO_UNIDAD_PRODUCTIVA, FORMULARIO_TIPO_ARTESANO],
      };
    } else if (body.audit_usuario.id_rol === ROL_TECNICO) {
      //TODO: colocar el tipo de formulario que podría crear el técnico
    }
    dao.obtenerRegistroPorId(models.formulario, id, parametros)
    .then(respuesta => {
      if (respuesta) {
        deferred.resolve(respuesta)
      } else {
        throw new Error("El formulario solicitado no ha sido encontrado. Es posible que no esté disponible para el tipo de usuario al que pertenece.");
      }
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  };
  const validarCamposFormulario = (formularioObj, objetoValidar, hist_empresa, arraySecciones, validarObligatoriedad, valorCeroDefault) => {
    valorCeroDefault = (typeof valorCeroDefault !== 'undefined') ? valorCeroDefault : true;
    const deferred = Q.defer();
    const objetoValidarDevolver = {};
    for (const i in formularioObj.secciones[0]) {
      // i = empresa, pagos, factura, etc.
      for (const j in formularioObj.secciones[0][i]) {
        // j = personal_hombres_total, personal_mujeres_total, patrimonio_creacion, etc.
        if (arraySecciones.indexOf(i) >= 0) {
          //console.log('-------------------------------------------------------000', objetoValidar);
          if (!validarObligatoriedad && (objetoValidar[j] || objetoValidar[j] >= 0) && formularioObj.secciones[0][i][j] && (!formularioObj.secciones[0][i][j].disabled || !hist_empresa)) {
            objetoValidarDevolver[j] = objetoValidar[j];
            if ((!objetoValidar[j] || isNaN(objetoValidar[j])) && (formularioObj.secciones[0][i][j].validarCero || formularioObj.secciones[0][i][j].validarNumerico)) {
              objetoValidarDevolver[j] = objetoValidar[j].toString().replace(',', '.');
              if (isNaN(parseFloat(objetoValidar[j]))) {
                objetoValidarDevolver[j] = 0;
              }
            }
            if (objetoValidar[j] && formularioObj.secciones[0][i][j].validarEntero) {
              objetoValidarDevolver[j] = parseInt(objetoValidar[j]);
            }
          } else if ((!validarObligatoriedad && (!objetoValidar[j] || isNaN(objetoValidar[j])) && formularioObj.secciones[0][i][j].validarCero) && valorCeroDefault) {
            objetoValidarDevolver[j] = 0;
          } else if (validarObligatoriedad && formularioObj.secciones[0][i][j] && ((objetoValidar[j] === null || objetoValidar[j] === undefined) || (objetoValidar[j] <= 0 && formularioObj.secciones[0][i][j].validarNumerico)) && formularioObj.secciones[0][i][j].requerido === true) {
            if (formularioObj.secciones[0][i][j].label) {
              if (formularioObj.secciones[0][i][j].validarNumerico) {
                deferred.reject(new Error(`El campo ${formularioObj.secciones[0][i][j].label} debe ser un valor mayor a cero. Por favor revise sus datos.`));
              } else {
                deferred.reject(new Error(`El campo ${formularioObj.secciones[0][i][j].label} es obligatorio. Por favor revise sus datos.`));
              }
            } else {
              deferred.reject(new Error(`Hay campos obligatorios sin llenar en el formulario. Por favor revise sus datos.`));
            }
            return deferred.promise;
          }
        }
      }
    }
    if (validarObligatoriedad) {
      deferred.resolve(objetoValidar)
    } else {
      console.log("DEVOLVIENDO.............................................................", objetoValidarDevolver);
      deferred.resolve(objetoValidarDevolver)
    }
    return deferred.promise;
  }

  const formularioBL = {
    listarFormularios,
    obtenerFormularioPorId,
    obtenerFormulario,
    validarCamposFormulario,
  };

  return formularioBL;
};
