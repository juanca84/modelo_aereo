/**
 * Lógica del Negocio -> ConfiguracionBL
 */
const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const fs = require('fs');
const path = require('path');
const config = require('konfig')();
const Util = require('../../utils/util');
const uuid = require('uuid');
// const pdf=require('pdftojson')

module.exports = app => {
  const sequelize = app.src.db.sequelize;
  const importarPoder = (id, valor, req, models) => {
  const codigo_archivo = new Date().getTime();
    const deferred = Q.defer();
    const audit_usuario = req.body.audit_usuario;
    if (!req.files) {
      deferred.reject(new Error(`Debe adjuntar un archivo pdf con la resolución del poder de representante legal`));
      return deferred.promise;
    }
    if (!req.files.file) {
      deferred.reject(new Error(`Debe adjuntar un archivo pdf con la resolución del poder de representante legal1`));
      return deferred.promise;
    }
    const archivo = req.files.file;
    const nombreOriginal = archivo.name;
    const extension = archivo.name.replace(/^.*\./, '');
    if (!(archivo.mimetype && (archivo.mimetype === MIMETYPE_PDF || extension === 'pdf'))) {
      deferred.reject(new Error(`El archivo que desea importar no responde al formato correcto. Por favor agregue un documento en formato pdf.`));
      return deferred.promise;
    }
    if (valor=='REPRESENTANTE') {
      const rutaArchivo = 'src/reports/representante/' + codigo_archivo + '.pdf';
      archivo.mv(rutaArchivo, err => {
        if (err) {
          deferred.reject(new Error(`No se pudo cargar el archivo.`));
          return deferred.promise;
        } else {
          dao.modificarRegistro(models.representante_legal, id, {"ruta_adjunta": rutaArchivo})
            .then(respuesta => deferred.resolve("Se guardó el documento:  " + nombreOriginal + "  correctamente."))
            .catch(error => deferred.reject(error));
        }
      })
    }
    if (valor=='AFCOOP') {
      const rutaArchivo = 'src/reports/afcoop/' + codigo_archivo + '.pdf';
      archivo.mv(rutaArchivo, err => {
        if (err) {
          deferred.reject(new Error(`No se pudo cargar el archivo.`));
          return deferred.promise;
        } else {
          dao.modificarRegistro(models.apm, id, {"ruta_resolucion_afcoop": rutaArchivo})
            .then(respuesta => deferred.resolve("Se guardó el documento:  " + nombreOriginal + "  correctamente."))
            .catch(error => deferred.reject(error));
        }
      })
    }
    if (valor=='ASOCIADOS') {
      const rutaArchivo = 'src/reports/asociados/' + codigo_archivo + '.pdf';
      archivo.mv(rutaArchivo, err => {
        if (err) {
          deferred.reject(new Error(`No se pudo cargar el archivo.`));
          return deferred.promise;
        } else {
          dao.modificarRegistro(models.apm, id, {"ruta_asociados": rutaArchivo})
            .then(respuesta => deferred.resolve("Se guardó el documento:  " + nombreOriginal + "  correctamente."))
            .catch(error => deferred.reject(error));
        }
      })
    }
    if (valor=='FEDERACION') {
      const rutaArchivo = 'src/reports/federacion/' + codigo_archivo + '.pdf';
      archivo.mv(rutaArchivo, err => {
        if (err) {
          deferred.reject(new Error(`No se pudo cargar el archivo.`));
          return deferred.promise;
        } else {
          dao.modificarRegistro(models.apm, id, {"ruta_federacion_cooperativa": rutaArchivo})
            .then(respuesta => deferred.resolve("Se guardó el documento:  " + nombreOriginal + "  correctamente."))
            .catch(error => deferred.reject(error));
        }
      })
    }
    if (valor=='MAE') {
      const rutaArchivo = 'src/reports/mae/' + codigo_archivo + '.pdf';
      archivo.mv(rutaArchivo, err => {
        if (err) {
          deferred.reject(new Error(`No se pudo cargar el archivo.`));
          return deferred.promise;
        } else {
          dao.modificarRegistro(models.apm, id, {"ruta_asignacion_mae": rutaArchivo})
            .then(respuesta => deferred.resolve("Se guardó el documento:  " + nombreOriginal + "  correctamente."))
            .catch(error => deferred.reject(error));
        }
      })
    }
    if (valor=='RUEX') {
      const rutaArchivo = 'src/reports/ruex_nim/' + codigo_archivo + '.pdf';
      archivo.mv(rutaArchivo, err => {
        if (err) {
          deferred.reject(new Error(`No se pudo cargar el archivo.`));
          return deferred.promise;
        } else {
          dao.modificarRegistro(models.nim, id, {"ruta_ruex": rutaArchivo})
            .then(respuesta => deferred.resolve("Se guardó el documento:  " + nombreOriginal + "  correctamente."))
            .catch(error => deferred.reject(error));
        }
      })
    }
    if (valor=='ACUERDO') {
      const rutaArchivo = 'src/reports/acuerdo_cam/' + codigo_archivo + '.pdf';
      archivo.mv(rutaArchivo, err => {
        if (err) {
          deferred.reject(new Error(`No se pudo cargar el archivo.`));
          return deferred.promise;
        } else {
          dao.modificarRegistro(models.derecho_minero, id, {"ruta_documento": rutaArchivo})
            .then(respuesta => deferred.resolve("Se guardó el documento:  " + nombreOriginal + "  correctamente."))
            .catch(error => deferred.reject(error));
        }
      })
    }
    return deferred.promise;
  };

  const representanteBL = {
    importarPoder,
  };

  return representanteBL;
};
