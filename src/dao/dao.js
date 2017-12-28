/**
 * DAO GENÉRICO
 */

const Q = require('q');
const util = require('../libs/util');


// =========================== Crea un registro ==========================
const crearRegistro = (model, parametros, multiple, transaccion, options) => {
  console.log("Creando objeto:", parametros);
  const deferred = Q.defer();
  options =  options || {};
  if (transaccion) {
    options.transaction = transaccion
  }
  options.returning = options.returning || true;
  if (multiple) {
    model.bulkCreate(parametros, options)
      .then(result => {
        deferred.resolve(result);
      })
      .catch(error => {
        deferred.reject(new Error(error.message));
      });
  } else {
    model.create(parametros, options)
      .then(result => {
        deferred.resolve(result);
      })
      .catch(error => {
        deferred.reject(new Error(error.message));
      });
  }
  return deferred.promise;
};

// =========================== Modifica un registro ==========================
const modificarRegistro = (model, id, parametrosModificar, transaccion) => {
  console.log("Modificando objeto:");
  const deferred = Q.defer();
  const options = {};
  if(util.isDefined(parametrosModificar._usuario_creacion)) {
    delete parametrosModificar._usuario_creacion;
  }
  if (transaccion) {
    options.transaction = transaccion
  }
  obtenerRegistroPorId(model, id)
  .then(objetoRes => {
    if (objetoRes) {
      return objetoRes;
    } else {
      deferred.reject(new Error("No se ha encontrado el registro solicitado."));
    }
  })
  .then(objetoRes => objetoRes.updateAttributes(parametrosModificar, options))
  .then(objetoRes => {
    deferred.resolve(objetoRes);
  })
  .catch(error => {
    deferred.reject(new Error(error.message));
  });
  return deferred.promise;
};



// ======================== Elimina un registro =============================
// TODO: Verificar los parametros para la eliminacion, verificar que "parametro" sea array
const eliminarRegistro = (model, parametro, transaccion) => {
  console.log("Eliminando objeto:");
  const deferred = Q.defer();
  const options = {};
  if (transaccion) {
    options.transaction = transaccion;
  }
  // Es un parametro
  if (parametro && parametro.where) {
    console.log(Object.keys(parametro).length);
    if (transaccion) {
      parametro.transaction = transaccion;
    }
    //
    model.destroy(parametro)
    .then(objetoRes => {
      deferred.resolve(objetoRes);
    })
    .catch(error => {
      deferred.reject(new Error(error.message));
    });
  // Es un ID
  } else {
    obtenerRegistroPorId(model, parametro)
    .then(objetoRes => {
      if (objetoRes) {
        return objetoRes;
      } else {
        deferred.reject(new Error("No se ha encontrado el registro solicitado."));
      }
    })
    .then(objetoRes => objetoRes.destroy(options))
    .then(objetoRes => {
      deferred.resolve(objetoRes);
    })
    .catch(error => {
      deferred.reject(new Error(error.message));
    });
  }
  return deferred.promise;
};



// ===================== Obtiene una lista de registros =======================
const listarRegistros = (model, parametros) => {
  console.log("Listando registros:");
  const paginado = parametros.page != null && typeof parametros.page !== undefined;
  const deferred = Q.defer();
  if (paginado === true) {
    if(parametros.limit && parametros.page){
      parametros.offset = (parametros.page - 1) * parametros.limit;
    }
    if (parametros.order) {
      //evitando que salga error al hacer un order anidado
      try {
        if (parametros.order.charAt(0) == '-') {
          parametros.order = `${parametros.order.substring(1, parametros.order.length)} DESC`;
        }
      } catch(error) {
        console.log("Este es un order anidado");
      }
    }
    model.findAndCountAll(parametros)
    .then(result => {
      deferred.resolve(result);
    })
    .catch(error => {
      deferred.reject(new Error(error.message));
    });
  } else {
    model.findAll(parametros)
    .then(result => {
      deferred.resolve(result);
    })
    .catch(error => {
      deferred.reject(new Error(error.message));
    });
  }
  return deferred.promise;
};



// ========== Obtienen un registro según la lista de parametros ==============
const obtenerRegistro = (model, parametros) => {
  console.log("Listando registros:");
  const deferred = Q.defer();
  model.findOne(parametros)
  .then(result => {
    deferred.resolve(result);
  })
  .catch(error => {
    console.log(error);
    deferred.reject(new Error(error.message));
  });
  return deferred.promise;
};



// ========== Obtiene registro por ID y parametros si es necesario ==========
const obtenerRegistroPorId = (model, id, parametros) => {
  console.log("Obteniendo registro por ID:");
  const deferred = Q.defer();
  model.findById(id, parametros)
    .then(result => {
      deferred.resolve(result);
    })
    .catch(error => {
      deferred.reject(new Error(error.message));
    });
  return deferred.promise;
};

// ========== Cuenta las ocurrencias de elementos en una tabla  ==========
const contarRegistros = (model, parametros) => {
  console.log("Contando registros de un modelo:");
  const deferred = Q.defer();
  model.count(parametros)
    .then(result => deferred.resolve(result))
    .catch(error => deferred.reject(new Error(error.message)));
  return deferred.promise;
};

const obtenerMaximoValor = (model, columna, parametros) => {
  console.log("Obteniendo registro máximo:");
  const deferred = Q.defer();
  model.max(columna, parametros)
    .then(result => {
      deferred.resolve(result);
    })
    .catch(error => {
      deferred.reject(new Error(error.message));
    });
  return deferred.promise;
};

const obtenerSuma = (model, columna, parametros) => {
  console.log("Obteniendo suma:");
  const deferred = Q.defer();
  model.sum(columna, parametros)
    .then(sum => {
      sum = isNaN(sum)? 0 : sum;
      deferred.resolve(sum);
    })
    .catch(error => {
      deferred.reject(new Error(error.message));
    });
  return deferred.promise;
};


module.exports = {
  crearRegistro,
  modificarRegistro,
  eliminarRegistro,
  listarRegistros,
  obtenerRegistro,
  obtenerRegistroPorId,
  contarRegistros,
  obtenerMaximoValor,
  obtenerSuma,
}
