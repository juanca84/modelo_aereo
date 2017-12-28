/**
 * UTILS
 */

const Q = require('q');
const dao = require('../dao/dao');
const moment = require('moment');
  // ============================= MENSAJES DE ERROR ============================

const mensajeError = (res, mensajeError, codigo, datos) => {
  const codigoEnviar = codigo ? codigo : 412;
  if(typeof mensajeError === 'object'&&mensajeError.errors)
  {
    mensajeError = (mensajeError.errors.map(function(x){return x.message;})).join("<br/>");
  }
  else if(typeof mensajeError==="string")
  {
    mensajeError = mensajeError.replace(/notNull Violation/g, '');
    mensajeError = mensajeError.replace(/\n: /g, '');
    mensajeError = mensajeError.replace(/: /g, '');
    mensajeError = mensajeError.replace(/Validation error:/g, '');
    mensajeError = mensajeError.replace(/\n/g, '');
    mensajeError = mensajeError.replace(/cannot be null/g, 'es un dato obligatorio');
    mensajeError = mensajeError.replace(/Validation isNumeric failed/g, 'El dato introducido no es un valor numérico válido');
    mensajeError = mensajeError.replace(/Validation error/g, '');
    mensajeError = mensajeError.replace(/llave duplicada viola restricción de unicidad «pago_codigo_deposito_key/g, 'El código de depósito ya existe.');
  }
  else if(mensajeError.message)
  {
    mensajeError = mensajeError.message;
  }

  return res.status(codigoEnviar).
    json({
      finalizado: false,
      mensaje: mensajeError,
      datos: datos ? datos : null,
    });
}

const mensajeExito = (res, mensajeExito, codigo, datos) => {
  const codigoEnviar = codigo ? codigo : 200;
  return res.status(codigoEnviar).
    json({
      finalizado: true,
      mensaje: mensajeExito,
      datos: datos ? datos : null,
      fecha: moment().format(),
    });
}

const mensajeFile = (res, mensajeExito, codigo, datos) => {
  console.log('mensajeeee file', datos);
  const codigoEnviar = codigo ? codigo : 200;
    // res.writeHead(codigoEnviar, {"Content-Type": "application/pdf"})
    //   .write(datos)
    //   .end();
    return res.send(datos)
}


module.exports = {
  mensajeError,
  mensajeExito,
  mensajeFile,
}
