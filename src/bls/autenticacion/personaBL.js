/**
 * Lógica del Negocio -> plantilla
 */
const moment = require('moment');

const servicios = require('../../servicios_web/servicio_segip');
const dao = require('../../dao/dao');
const Q = require('q');

const crearPersona = (personaObj, body, models, transaccion) => {
  const deferred = Q.defer();
  if (personaObj.tipo_documento === PERSONA_TIPO_FUNDEMPRESA) {
    personaObj.complemento_documento = personaObj.codigo_tipo_documento;
    personaObj.documento_identidad = personaObj.nro_documento;
  } else if (personaObj.tipo_documento === PERSONA_TIPO_PASAPORTTE) {
    personaObj.complemento_documento = PERSONA_TIPO_PASAPORTTE;
    if (!personaObj.primer_apellido && !personaObj.segundo_apellido) {
      throw new Error("Debe llenar al menos un Apellido");
      return deferred.promise;
    }
    if (!personaObj.nombres) {
      throw new Error("Debe llenar el campo Nombres.");
      return deferred.promise;
    }
  }
  if (!personaObj.fecha_nacimiento) {
    throw new Error("Debe llenar la Fecha de Nacimiento de la persona.");
    return deferred.promise;
  }
  // if (!personaObj.genero) {
  //   throw new Error("Debe llenar el Género de la persona.");
  //   return deferred.promise;
  // }
  if (personaObj.tipo_documento === PERSONA_TIPO_FUNDEMPRESA || personaObj.tipo_documento === PERSONA_TIPO_PASAPORTTE) {
    obtenerPersona({where: {
      documento_identidad: personaObj.documento_identidad,
      complemento_documento: personaObj.complemento_documento,
      fecha_nacimiento: personaObj.fecha_nacimiento,
      tipo_documento: personaObj.tipo_documento,
    }}, models)
    .then(respuesta => {
      if (respuesta && respuesta.id_persona) {
        personaObj._usuario_modificacion = body.audit_usuario.id_usuario;
        return modificarPersona(respuesta.id_persona, personaObj, models, body, transaccion);
      } else {
        personaObj.estado = ESTADO_ACTIVO;
        personaObj._usuario_creacion = body.audit_usuario.id_usuario;
        return dao.crearRegistro(models.persona, personaObj, false, transaccion);
      }
    }).then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  } else {
    dao.crearRegistro(models.persona, personaObj, false, transaccion)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  }
  return deferred.promise;
}

const guardarPersonaSegip = (datos, body, models) => {
  const deferred = Q.defer();
  datos.fecha_nacimiento = datos.fecha_nacimiento.split('/');
  datos.fecha_nacimiento[1] = (datos.fecha_nacimiento[1] < 10 && datos.fecha_nacimiento[1].length < 2) ? `0${datos.fecha_nacimiento[1]}` : datos.fecha_nacimiento[1];
  datos.fecha_nacimiento[2] = (datos.fecha_nacimiento[2] < 10 && datos.fecha_nacimiento[2].length < 2) ? `0${datos.fecha_nacimiento[2]}` : datos.fecha_nacimiento[2];
  datos.fecha_nacimiento = `${datos.fecha_nacimiento[0]}/${datos.fecha_nacimiento[1]}/${datos.fecha_nacimiento[2]}`;
  console.log("******************************");
  validarDatosSegip(datos)
  .then(respuesta => {
    const fecha2 = datos.fecha_nacimiento.split('/');
    let tipo_documento = PERSONA_TIPO_DOCUMENTO_IDENTIDAD_CI;
    if(datos.extranjero === "true"){
      tipo_documento = PERSONA_TIPO_PASAPORTTE;
    }
    const parametros = {
      attributes: ["id_persona", "documento_identidad", "complemento_documento", "nombres", "primer_apellido", "segundo_apellido", "casada_apellido", "genero", "fecha_nacimiento", "tipo_documento", "direccion", "telefono"],
      where: {
        documento_identidad: datos.ci,
        fecha_nacimiento: new Date(fecha2[0], fecha2[1] - 1, fecha2[2]),
        tipo_documento,
      },
    };
    datos.fecha_nacimiento = [fecha2[2], fecha2[1], fecha2[0]].join('/');
    return buscarPersonaLocal(parametros, models);
  })
  // TODO: Aumetar aqui si se verificaran pasaportes
  .then(respuesta => {
    if (respuesta && respuesta.id_persona) {
      return respuesta;
    } else {
      return buscarPersonaSegip(datos, body, models);
    }
  })
  .then(respuesta => {
    if (respuesta && respuesta.id_persona) {
      deferred.resolve(respuesta);
    } else {
      throw new Error("Error al registrar a la persona.");
    }
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const buscarPersonaLocal = (parametros, models) => {
  const deferred = Q.defer();
  dao.obtenerRegistro(models.persona, parametros)
  .then(respuesta => {
    if (respuesta) {
      const persona = {
        "id_persona": respuesta.id_persona,
        "documento_identidad": respuesta.documento_identidad,
        "complemento_documento": respuesta.complemento_documento,
        "nombres": respuesta.nombres,
        "primer_apellido": respuesta.primer_apellido,
        "segundo_apellido": respuesta.segundo_apellido,
        "casada_apellido": respuesta.casada_apellido,
        "genero": respuesta.genero,
        "fecha_nacimiento": respuesta.fecha_nacimiento,
        "tipo_documento": respuesta.tipo_documento,
        "direccion": respuesta.direccion,
        "nombre_completo": respuesta.nombre_completo,
        "discapacidad": respuesta.discapacidad,
      };
      deferred.resolve(persona);
    } else {
      deferred.resolve(null);
    }
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const buscarPersonaSegip = (datos, body, models) => {
  const deferred = Q.defer();
  servicios.obtenerPersona(datos.ci, datos.fecha_nacimiento)
  .then(respuesta => {
    if (respuesta && respuesta.codigo && respuesta.datos) {
      throw new Error(`Se ha producido el siguiente error en la consulta a SEGIP: COD-${respuesta.datos.estado}:${respuesta.datos.estado_mensaje}`);
    }
    if (respuesta.ApellidoEsposo == "--") {
      respuesta.ApellidoEsposo = "";
    }
    if (respuesta.PrimerApellido == "--") {
      respuesta.PrimerApellido = "";
    }
    if (respuesta.SegundoApellido == "--") {
      respuesta.SegundoApellido = "";
    }
    return models.persona.findOrCreate({
      where: {
        documento_identidad:respuesta.NumeroDocumento,
        complemento_documento: respuesta.Complemento,
        nombres: respuesta.Nombres,
        primer_apellido: respuesta.PrimerApellido,
        segundo_apellido: respuesta.SegundoApellido,
        fecha_nacimiento: respuesta.FechaNacimiento,
        tipo_documento: PERSONA_TIPO_DOCUMENTO_IDENTIDAD_CI,
      },
      defaults: {
        documento_identidad:respuesta.NumeroDocumento,
        complemento_documento: respuesta.Complemento,
        nombres: respuesta.Nombres,
        primer_apellido: respuesta.PrimerApellido,
        segundo_apellido: respuesta.SegundoApellido,
        casada_apellido: respuesta.ApellidoEsposo,
        direccion: respuesta.Domicilio,
        fecha_nacimiento: respuesta.FechaNacimiento,
        estado: 'ACTIVO',
        _usuario_creacion: body.audit_usuario.id_usuario,
        _usuario_creacion: 1,
        tipo_documento: PERSONA_TIPO_DOCUMENTO_IDENTIDAD_CI,
        discapacidad: respuesta.discapacidad,
      },
    });
  })
  .then(respuesta => {
    const persona2 = {
      "id_persona": respuesta[0].id_persona,
      "documento_identidad": respuesta[0].documento_identidad,
      "complemento_documento": respuesta[0].complemento_documento,
      "nombres": respuesta[0].nombres,
      "primer_apellido": respuesta[0].primer_apellido,
      "segundo_apellido": respuesta[0].segundo_apellido,
      "casada_apellido": respuesta[0].casada_apellido,
      "fecha_nacimiento": respuesta[0].fecha_nacimiento,
      "direccion": respuesta[0].direccion,
      "nombre_completo": respuesta[0].nombre_completo,
      "discapacidad": respuesta[0].discapacidad,
    };
    deferred.resolve(persona2);
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const modificarPersona = (id, personaObj, models, body, transaccion) => {
  const deferred = Q.defer();
  let modificarObj = {};
  if (id) {
    modificarObj.testimonio_poder = personaObj.testimonio_poder;
    modificarObj.correo_electronico = personaObj.correo_electronico;
    if (personaObj.tipo_documento === PERSONA_TIPO_PASAPORTTE) {
      modificarObj = personaObj;
    } else {
      if (personaObj.direccion) modificarObj.direccion = personaObj.direccion;
      if (personaObj.genero) modificarObj.genero = personaObj.genero;
      modificarObj.telefono = personaObj.telefono ? personaObj.telefono : null;
      if (personaObj.fecha_nacimiento) modificarObj.fecha_nacimiento = personaObj.fecha_nacimiento;
      if (personaObj.discapacidad === true || personaObj.discapacidad === false) modificarObj.discapacidad = personaObj.discapacidad;
    }
    personaObj._usuario_modificacion = body.audit_usuario.id_usuario;
    dao.modificarRegistro(models.persona, id, modificarObj, transaccion)
    .then(respuestaMod => deferred.resolve(respuestaMod))
    .catch(error => deferred.reject(error));
  } else {
    deferred.resolve({});
  }
  return deferred.promise;
};

const obtenerPersonaPorId = (id, models) => {
  const deferred = Q.defer();
  const parametros = {attributes: ["id_persona", "documento_identidad", "complemento_documento", "nombres", "primer_apellido", "segundo_apellido", "casada_apellido", "genero", "fecha_nacimiento", "tipo_documento", "direccion", "telefono", "discapacidad"]};
  dao.obtenerRegistroPorId(models.persona, id, parametros)
  .then(respuesta => {
    if (respuesta) {
      deferred.resolve(respuesta);
    } else {
      throw new Error("No se ha encontrado el registro solicitado.")
    }
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerPersona = (parametros, models) => {
  const deferred = Q.defer();
  dao.obtenerRegistro(models.persona, parametros)
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const validarDatosSegip = (datos) => {
  const deferred = Q.defer();
  if (!datos.ci) {
    deferred.reject(new Error("El parámetro Documento de Identidad es requerido."));
    return deferred.promise;
  } else if (!datos.fecha_nacimiento) {
    deferred.reject(new Error("El parámetro Fecha de Nacimiento es requerido (formato = dd/mm/yyyy)."));
    return deferred.promise;
  } else if (datos.extranjero === "true" && !datos.nombre) {
    deferred.reject(new Error("El parámetro Nombre es requerido."));
    return deferred.promise;
  } else {
    // Validar mayoria de edad
    const fecha_nacimiento = moment(datos.fecha_nacimiento);
    const fecha_actual = moment();
    const diferencia = fecha_nacimiento.diff(fecha_actual, "years");
    if (Math.abs(diferencia) < VALIDACION_MAYORIA_EDAD) {
      deferred.reject(new Error("Para ser registrado en el Sistema debe contar con al menos dieciocho años de edad."));
      return deferred.promise;
    } else {
      deferred.resolve(true);
    }
  }
  return deferred.promise;
}

module.exports = {
  crearPersona,
  guardarPersonaSegip,
  modificarPersona,
  obtenerPersonaPorId,
}
