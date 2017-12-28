const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const parametroBL = require('../parametros/parametroBL');

const listarId = (id, models) => {
  const deferred = Q.defer();
  let objParametros = {};
  const parametros = { attributes: ["id_seguimiento_tramite", "fid_tramite", "fid_apm"] };
  dao.obtenerRegistroPorId(models.seguimiento_tramite,id,parametros)
    .then(respuesta => {
      if(respuesta) {
        if (respuesta.fid_tramite == 1) {
          objParametros = {
            attributes: ["id_apm", "nit", "rum", "razon_social", "matricula_comercio", "fid_par_sector", "fid_par_clase", "nro_afcoop", "fecha_afcoop",
              "nro_asociado", "denominacion", "actividad_matricula", "estado", "estado_rum", "fid_par_tipo_societario","fid_par_clase","fid_par_sector",
              "fid_par_tipo_organizacion", "fid_par_tipo_entidad_publica", "fid_par_tipo_apm", "ruta_certificado",
              "ruta_asociados", "ruta_federacion_cooperativa"],
            include: [{
              attributes: ["id_persona", "documento_identidad", "fecha_nacimiento", "nombres", "primer_apellido", "segundo_apellido", "correo_electronico"],
              model: models.persona,
              as: 'representante',
              through: {
                attributes: ["celular"],
                model: models.representante_legal,
                where: {"apm_id_apm":respuesta.fid_apm},
              },
            }, {
              attributes: ["id_persona", "documento_identidad", "fecha_nacimiento", "nombres", "primer_apellido", "segundo_apellido", "telefono", "correo_electronico", "direccion"],
              model: models.persona,
              as: 'asociado',
              through: {attributes: [], model: models.asociado, where:{"estado":'ACTIVO'}},
            }, {
              attributes: ["id_parametro", "sigla"],
              model: models.parametro,
              as: 'actividad',
              through: {attributes: [], model: models.actividad_apm},
            }, {
              model: models.ubicacion,
              as: 'ubicaciones'
            }, {
              attributes: ["id_mineral", "grupo", "nombre", "descripcion", "orden"],
              model: models.mineral,
              through: {attributes: [], model: models.mineral_apm,},
            }, {
              attributes: ["id_dpa", "nombre"],
              model: models.dpa,
              as: 'dpa',
              through: {attributes: [], model: models.dpa_apm},
            }],
            where: {"id_apm": respuesta.fid_apm},
          };
          dao.obtenerRegistro(models.apm, objParametros)
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        }
        if (respuesta.fid_tramite == 3) {
          objParametros = {
            include: [{
              attributes: ["id_apm", "nit", "rum", "razon_social", "matricula_comercio", "fid_par_sector", "fid_par_clase", "nro_afcoop", "fecha_afcoop",
                "nro_asociado", "denominacion", "actividad_matricula", "estado", "estado_rum", "fid_par_tipo_societario","fid_par_clase","fid_par_sector",
                "fid_par_tipo_organizacion", "fid_par_tipo_entidad_publica", "fid_par_tipo_apm", "ruta_certificado",
                "ruta_asociados", "ruta_federacion_cooperativa"],
              model: models.apm,
              as: 'apm',
              include:
                [{
                  attributes: ["id_persona", "documento_identidad", "fecha_nacimiento", "nombres", "primer_apellido", "segundo_apellido", "correo_electronico"],
                  model: models.persona,
                  as: 'representante',
                  through: {
                    attributes: ["celular"],
                    model: models.representante_legal,
                    where: {"apm_id_apm":respuesta.fid_apm},
                  },
                }, {
                  attributes: ["id_persona", "documento_identidad", "fecha_nacimiento", "nombres", "primer_apellido", "segundo_apellido", "telefono", "correo_electronico", "direccion"],
                  model: models.persona,
                  as: 'asociado',
                  through: {attributes: [], model: models.asociado,where:{"estado":'ACTIVO'}},
                }, {
                  attributes: ["id_parametro", "sigla"],
                  model: models.parametro,
                  as: 'actividad',
                  through: {attributes: [], model: models.actividad_apm},
                }, {
                  model: models.ubicacion,
                  as: 'ubicaciones',
                  where: {$or:[{"tipo":'CENTRAL'},{"tipo":'SUCURSAL'}]},
                }, {
                  attributes: ["id_mineral", "grupo", "nombre", "descripcion", "orden"],
                  model: models.mineral,
                  through: {attributes: [], model: models.mineral_apm,},
                }, {
                  attributes: ["id_dpa", "nombre"],
                  model: models.dpa,
                  as: 'dpa',
                  through: {attributes: [], model: models.dpa_apm},
                }],
              },{
              attributes: ["id_deposito","nro_movimiento","fecha_movimiento","monto","descripcion","tipo_movimiento","detalle"],
              model: models.deposito,
              as: 'deposito'
            }],
            where: {"fid_apm": respuesta.fid_apm},
          };
          dao.obtenerRegistro(models.nim, objParametros)
            .then(respuesta => deferred.resolve(respuesta))
            .catch(error => deferred.reject(error));
        }
      }
    })
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const ubicacionRepresentante = (id,models)=>{
  const deferred = Q.defer();
  const objParametros = {
    attributes : [],
    include: [{
      model: models.ubicacion,
      as: 'ubicacion',
    }],
    where: {"id_representante_legal":id}
  };
  dao.obtenerRegistro(models.representante_legal, objParametros)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));

  return deferred.promise;
}

const crearPdf = (body, models) => {
  const deferred = Q.defer();
  const html = "src/reports/promueve/certificado.html";
  const pdf = require('../../libs/pdf_generator');
  var f = new Date();
  const codigo_archivo = new Date().getTime();
  const config_pagina = {
    format: 'Letter',
    orientation: 'portrait',
    border: { top: "0cm",left: "0cm",right: "0cm",bottom: "0cm",},
  };
  let respuesta = listarId(body.id_seguimiento_tramite, models)
    .then(respuesta => {
      if (respuesta) {
      if(body.audit_usuario.id_rol==2) {
          const datos = {
            nit: respuesta.nit,
            rum: respuesta.rum,
            razon_social: respuesta.razon_social,
            matricula: respuesta.matricula_comercio,
            nro_afcoop: respuesta.nro_afcoop,
            fecha_afcoop: respuesta.fecha_afcoop,
            representante: respuesta.representante[0].nombres + ' ' + respuesta.representante[0].primer_apellido + ' ' + respuesta.representante[0].segundo_apellido,
            documento_identidad: respuesta.representante[0].documento_identidad,
            telefono: respuesta.representante[0].telefono,
            direccion: respuesta.representante[0].direccion,
            numero:respuesta.fid_par_tipo_apm,
            rol:body.audit_usuario.id_rol,
            fecha:f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate(),
          };
          var routePath = 'src/reports/rum/'+codigo_archivo+'.pdf';
          pdf.generarPDFaFile(html, datos, routePath, config_pagina)
            .then(filePDF => filePDF);
          dao.modificarRegistro(models.apm,respuesta.id_apm,{ruta_certificado:routePath})
            .then(respuesta => deferred.resolve("PDF creado correctamente"))
            .catch(error => deferred.reject(error));
        }
        if(body.audit_usuario.id_rol==4) {
          const datos = {
            nit: respuesta.apm.nit,
            rum: respuesta.apm.rum,
            razon_social: respuesta.apm.razon_social,
            matricula: respuesta.apm.matricula_comercio,
            nro_afcoop: respuesta.apm.nro_afcoop,
            fecha_afcoop: respuesta.apm.fecha_afcoop,
            representante: respuesta.apm.representante[0].nombres + ' ' + respuesta.apm.representante[0].primer_apellido + ' ' + respuesta.apm.representante[0].segundo_apellido,
            documento_identidad: respuesta.apm.representante[0].documento_identidad,
            telefono: respuesta.apm.representante[0].telefono,
            direccion: respuesta.apm.representante[0].direccion,
            ruex: respuesta.ruex,
            numero:respuesta.apm.fid_par_tipo_apm,
            rol:body.audit_usuario.id_rol,
            fecha:f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate(),
          };
          var routePath = 'src/reports/nim/'+codigo_archivo+'.pdf';
          pdf.generarPDFaFile(html, datos, routePath, config_pagina)
            .then(filePDF => filePDF);
          dao.modificarRegistro(models.nim,respuesta.id_nim,{ruta_certificado:routePath})
            .then(respuesta => deferred.resolve("PDF creado correctamente"))
            .catch(error => deferred.reject(error));
        }
        deferred.resolve("SE CREO EL PDF");
      }
      else {
        throw new Error("NO EXISTE NINGUN REGISTRO");
      }
    })
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

const crearFirma = (body, models) => {
  const deferred = Q.defer();
  const parametros = {
    attributes: ["id_seguimiento_tramite", "fid_tramite", "fid_apm"],
    where: {"id_seguimiento_tramite":body.id_seguimiento_tramite}
  };
  dao.obtenerRegistro(models.seguimiento_tramite,parametros)
    .then(respuesta => {
      if(respuesta) {
        dao.modificarRegistro(models.seguimiento_tramite, body.id_seguimiento_tramite, {"transicion": 'FIRMADO'})
          .then(respuesta1 => {
            if(respuesta1 && respuesta.fid_tramite==1){
              dao.modificarRegistro(models.apm, respuesta.fid_apm, {"estado_rum": 'FIRMADO'})
                .then(respuesta2 => deferred.resolve("datos modificados"))
                .catch(error => deferred.reject(error));
            }
            if(respuesta1 && respuesta.fid_tramite==3){
              const parametros = {
                attributes: ["id_nim"],
                where: {"fid_apm":respuesta.fid_apm}
              };
              dao.obtenerRegistro(models.nim,parametros)
                .then(respuesta3 => {
                  if(respuesta3){
                    dao.modificarRegistro(models.nim, respuesta3.id_nim, {"estado_nim": 'FIRMADO'})
                      .then(respuesta3 => deferred.resolve("datos modificados"))
                      .catch(error => deferred.reject(error));
                  }
                })
            }
          })
          .catch(error => deferred.reject(error));
      }
    })
    .catch(error => deferred.reject(error));
  return deferred.promise;
};

module.exports = {
  listarId,
  ubicacionRepresentante,
  crearPdf,
  crearFirma,
};