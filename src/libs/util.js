console.log("archivo util");

const isEmpty = (obj) => {
  if (obj == null) return true; // nulos y undefined son vacios

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

const isDefined = (obj) => obj != null && typeof (obj) !== undefined;
const isUndefined = (obj) => !isDefined(obj)


/**
 * Promesa para iterar un array. El metodo va iterando todos los elementos
 * pero si falla uno se cancela la iteracion y retorna cath de la promesa
 * La funciones que llamen a esta promesa deveran implementar el metodo
 * callbackProcesarItem(item,callbackContinuar,callbackError)
 *
 * @param {type} array El array de elementos a iterar
 * @param {type} callbackProcesarItem la funcion para procesar el item
 * @returns {Promise} Retorna una promesa
 */
const iterarArray = (array, callbackProcesarItem) =>  new Promise((resolve, reject) => {
  const callbackError = function (error) {
    reject(error);
  };
  let indice = 0;
  const LIMITE_ARRAY = array.length;
  if (LIMITE_ARRAY === 0) {
    resolve();
    return;
  }

  const arrayResult = new Array();
  const callbakContinuarIteracion = function () {
    indice++;
    if (indice < LIMITE_ARRAY) {
      const aa = callbackProcesarItem(array[indice], callbakContinuarIteracion, callbackError);
      arrayResult.push(aa);
    } else {
      resolve(arrayResult);
    }
  };
  const cc = callbackProcesarItem(array[indice], callbakContinuarIteracion, callbackError);
  arrayResult.push(cc);
});


module.exports = {
  isEmpty,
  isDefined,
  isUndefined,
  iterarArray,
};
