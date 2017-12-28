process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const config = require('konfig')();

const messages = {
  '401': 'No se pudo realizar la operación.',
  '403': 'Su sesión ha caducado o no tiene los permisos necesarios.',
  '404': 'No existe el recurso solicitado.',
  '407': 'Necesita configurar su Proxy para poder usar el sistema.',
  '408': 'El servidor no responde intente más tarde.',
  '409': 'Los datos no son válidos',
  '410': 'El recurso solicitado ya no está disponible y no lo estará de nuevo.',
  '500': 'Se produjo un error en el servidor, inténtelo más tarde.',
  '502': 'El sistema no está disponible en estos momentos, inténtelo más tarde.',
  '503': 'El sistema se encuentra en mantenimiento en estos momentos, vuelva a intentarlo más tarde por favor.',
  '504': 'Gateway timeout - Tiempo de espera agota.', // Esto debe ser implementado en el frontend para reintentar las peticiones
  'connection': 'No se pudo establecer conexión con el servidor.',
}

const uniqFilterAccordingToProp = function (prop) {//filtra objetos en un array segun un key especifico
  if (prop)
    return (ele, i, arr) => arr.map(ele => ele[prop]).indexOf(ele[prop]) === i
  else
    return (ele, i, arr) => arr.indexOf(ele) === i
}
/* Metodos para el SIN*/
/**
 * Metodo para validar un NIT de impuestos nacionales
 * @param {type} nit
 * @param {type} usuario
 * @param {type} contrasena
 * @param {type} callbackRespuesta
 * @param {type} callbackError
 * @returns {undefined}
 */
//SERVICIO IMPUESTOS (SIN) - nuevo octubre 14 2016 RHZ
const servicios = {
  validarNIT:  (nit, usuario, contrasena) =>  new Promise((resolve, reject) =>  {
    const request = require('request');
    const url_servicio = config.app.sin.url;
    const req = {
      url: url_servicio,
      body: { nit, usuario, clave: contrasena },
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.app.sin.jwt}`,
        'Content-Type': 'application/json',
      },
      timeout: config.app.sin.timeout,
      json: true,
    };
    request.post(req, (error, response, body) => {
      if (error) {
        if (error && error.code == 'ESOCKETTIMEDOUT') {
          reject(new Error("No es posible conectarse con el servicio de Impuestos Nacionales. Por favor vuelva a intentarlo o comuníquese con el Administrador del Sistema si el problema persiste."));
        } else {
          reject(error);
        }
        return;
      }
      if (response.statusCode === 200) {
        if (body.Autenticado && body.Autenticado === true) {
          resolve(
            {
              status: response.statusCode,
              mensaje: messages[`${response.statusCode}`],
              data: body,
            });
        }
        else {
          reject(
            {
              status: 412,
              mensaje: `No se encuentra el usuario con NIT ${nit}. Puede que su usuario no esté activo en la Base de Datos de Impuestos Nacionales o sus credenciales de ingreso sean incorrectas.`,
              data: body,
            });
        }
      } else {
        reject({
          status: response.statusCode,
          mensaje: messages[`${response.statusCode}`],
          data: body,
        });
      }
    }); // FIn post
  }) // Fin promesa
  ,
  /**
   * Metodo para obtener todas las matriculas de comercio asociadas a un NIT
   * @param {type} nit
   * @param {type} callbackRespuesta
   * @param {type} callbackError
   * @returns {undefined}
   */
  obtenerMatriculas: (nit) => new Promise((resolve, reject) => {

    const url_servicio = `${config.app.fundempresa.servicios.obtener_matriculas + nit}/matriculas/`;
    const request = require('request');
    const req = {
      url: url_servicio,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.app.fundempresa.jwt}`,
        'Content-Type': 'application/json',
      },
      timeout: config.app.fundempresa.timeout,
      json: true,
    };
    request.get(req, (error, response, body) => {
      if (error) {
        if (error && error.code == 'ESOCKETTIMEDOUT') {
          reject(new Error("No es posible conectarse con el servicio de FUNDEMPRESA. Por favor vuelva a intentarlo o comuníquese con el Administrador del Sistema si el problema persiste."));
        } else {
          reject(error);
        }
        return;
      }
      const lasmatriculas = [];
      if (body && body.SrvMatriculaConsultaNitResult && body.SrvMatriculaConsultaNitResult.MatriculasResult && body.SrvMatriculaConsultaNitResult.MatriculasResult.length) {
        body.SrvMatriculaConsultaNitResult.MatriculasResult.forEach((matricula) => {
          if (matricula["CtrResult"] && matricula["CtrResult"] === "D-EXIST") {
            lasmatriculas.push(
              {
                matricula: (parseInt(matricula.IdMatricula)).toString(),
                razon_social: matricula.RazonSocial,
              });
          }
        });
      }
      if (lasmatriculas.length === 0) {
        let mensaje = "";
        if (body === "The upstream server is timing out") {
          mensaje = "El servicio no esta disponible. Intente otra vez."
        } else {
          mensaje = body
        }
        resolve({
          status: 401,
          matriculas: lasmatriculas,
          mensaje: `El NIT ${nit} parece no contar con matrículas registradas o activas en FUNDEMPRESA`,
          data: mensaje,
        });
      }
      else {
        resolve(
          {
            status: response.statusCode === 404 ? 401 : response.statusCode,
            matriculas: lasmatriculas,
            mensaje: messages[`${response.statusCode}`],
            data: body,
          });
      }
    });
  }),
  /**
   *
   * @param {type} nroMatricula
   * @param {type} callbackRespuesta
   * @param {type} callbackError
   * @returns {undefined}
   */
  obtenerInformacionEmpresa: (nroMatricula) => new Promise((resolve, reject) => {

    const removerAcentos = function (text) {
      let strOut = '';
      if (text) {
        strOut = text;
      }
      strOut = strOut.replace(/á/gi, "a");
      strOut = strOut.replace(/é/gi, "e");
      strOut = strOut.replace(/í/gi, "i");
      strOut = strOut.replace(/ó/gi, "o");
      strOut = strOut.replace(/ú/gi, "u");

      strOut = strOut.replace(/Á/gi, "A");
      strOut = strOut.replace(/É/gi, "E");
      strOut = strOut.replace(/Í/gi, "I");
      strOut = strOut.replace(/Ó/gi, "O");
      strOut = strOut.replace(/Ú/gi, "U");
      return (strOut.toUpperCase());
    };

    const url_servicio = config.app.fundempresa.servicios.info_matricula + nroMatricula;
    const request = require('request');
    const req = {
      url: url_servicio,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.app.fundempresa.jwt}`,
        'Content-Type': 'application/json',
      },
      timeout: config.app.fundempresa.timeout,
      json: true,
    };
    request.get(req, (error, resonse, body) => {
      if (error) {
        if (error && error.code == 'ESOCKETTIMEDOUT') {
          reject(new Error("No es posible conectarse con el servicio de FUNDEMPRESA. Por favor vuelva a intentarlo o comuníquese con el Administrador del Sistema si el problema persiste."));
        } else {
          reject(new Error("Ocurrió un error al buscar su matrícula"));
        }
        return;
      }
      let info_empresa;
      if (resonse.statusCode === 200) {
        if (typeof body.SrvInfoMatriculaResult === 'undefined') {
          reject(new Error ("No se encontraron resultados."));
          return;
        }
        if (typeof body.SrvInfoMatriculaResult.infoMatricula === 'undefined') {
          reject(new Error ("No se encontró datos asociados a su matricula"));
          return;
        }
        if (!Array.isArray(body.SrvInfoMatriculaResult.infoMatricula)) {
          reject(new Error ("No se encontró datos asociados a su matricula."));
          return;
        }
        if (body.SrvInfoMatriculaResult.infoMatricula[0].CtrResult !== 'D-EXIST') {
          reject(new Error("No se encontró representantes asociados a su matrícula."))
          return;
        }
        info_empresa =
        {
          nit: null,
          matricula_comercio: null,
          razon_social: null,
          tipo_sociedad: null,
          fecha_inscripcion: null,
          sucursales: [],
        };
        const moment = require('moment');
        const matricula = body.SrvInfoMatriculaResult.infoMatricula[0];
        info_empresa.nit = `${parseInt(matricula.Nit)}`;
        info_empresa.matricula_comercio = (parseInt(matricula.IdMatricula)).toString(),
          info_empresa.razon_social = matricula.RazonSocial;
        info_empresa.tipo_sociedad = matricula.TipoSocietario;
          //                2017-01-24
        const date = moment(matricula.FechaInscripcion).format('YYYY-MM-DD');
        info_empresa.fecha_constitucion = date;
        info_empresa.desc_actividad_declarada = matricula.Actividad;
        info_empresa.actividad_declarada = matricula.ClaseCIIU;
          // Agregamos la sucursal CASA MATRIZ
        info_empresa.sucursales.push({
          nombre: matricula.RazonSocial,
          nro_sucursal: 0,
          avenida_calle: matricula.CalleAv,
          numero: matricula.Nro,
          zona: matricula.Zona ? matricula.Zona.toUpperCase() : null,
          uv: matricula.Uv,
          manzana: matricula.Mza,
          edificio: matricula.Edificio,
          piso: matricula.Piso,
          nro_oficina: matricula.NroOficina,
          nro_casilla_postal: null,
          municipio: matricula.Municipio.toUpperCase(),
          provincia: matricula.Provincia.toUpperCase(),
          departamento: removerAcentos(matricula.Departamento.toUpperCase()),
          telefonos: matricula.Telefono ? matricula.Telefono : null,
          fax: null,
          correos: matricula.CorreoElectronico,
          avenida_calle_referencia: matricula.EntreCalles,
          tipo_sucursal: '1',
          direccion_completa: null,
        });
          // Agregando sucursales de la matricula de comercio
        if (body.SrvInfoMatriculaResult.infoMatricula[0].MatriculaDatosSucList1 !== null) {
          const arraySucursales = body.SrvInfoMatriculaResult.infoMatricula[0].MatriculaDatosSucList1.MatriculaDatosSuc;
          for (const index in arraySucursales) {
            const sucursalFund = arraySucursales[index];
            info_empresa.sucursales.push(
              {
                nombre: sucursalFund.Sucursal,
                nro_sucursal: sucursalFund.IdSuc,
                municipio: sucursalFund.Municipio.toUpperCase(),
                zona: sucursalFund.Zona.toUpperCase(),
                provincia: null,
                tipo_sucursal: '2',
                departamento: removerAcentos(sucursalFund.Departamento.toUpperCase()),
                scompleto: sucursalFund.Representante,
                codigo_tipo_documento: sucursalFund.IdClase,
                nro_documento: sucursalFund.NumId,
                direccion_completa: sucursalFund.Direccion,
                telefonos: sucursalFund.Telefono,
                representante_legal:
                {
                  nombre_completo: sucursalFund.Representante,
                  codigo_tipo_documento: sucursalFund.IdClase,
                  nro_documento: sucursalFund.NumId,
                },
              });
          };
        }
        resolve(
          {
            status: resonse.statusCode,
            empresa: info_empresa,
            mensaje: messages[`${resonse.statusCode}`],
            data: body,
          });
      }
      else {
        resolve(messages[`${resonse.statusCode}`]);
      }
    }); // Fin del GET
  }) // Fin de la promesa
  ,
  // SERVICIO QUE OBTIENE LOS REPRESENTANTES LEGALES
  buscarRepresentantes: (nroMatricula) => new Promise((resolve, reject) => {

    const url_servicio = config.app.fundempresa.servicios.buscar_representante.replace("{num_matricula}", nroMatricula);
    const request = require('request');
    const req = {
      url: url_servicio,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.app.fundempresa.jwt}`,
        'Content-Type': 'application/json',
      },
      timeout: config.app.fundempresa.timeout,
      json: true,
    };
    request.get(req, (error, response, body) => {
      if (error) {
        reject(new Error(error));
        return;
      }
        // INICIANDO VALIDACIONES PARA LAS RESPUESTAS
      if (typeof body.SrvRepresentanteResult === 'undefined') {
        reject(new Error("No se encontró representantes asociados a su matrícula."))
        return;
      }
      if (typeof body.SrvRepresentanteResult.Representantes === 'undefined') {
        reject(new Error("No se encontró representantes asociados a su matrícula."))
        return;
      }
      if (body.SrvRepresentanteResult.Representantes.length === 0) {
        reject(new Error("No se encontró representantes asociados a su matrícula."))
        return;
      }
      if (body.SrvRepresentanteResult.Representantes[0].CtrResult !== 'D-EXIST') {
        reject(new Error("No se encontró representantes asociados a su matrícula."))
        return;
      }
      const representantes = [];
      body.SrvRepresentanteResult.Representantes.forEach((item, value) => {
        const datoRep = {  // datos de cada representante
          nombre_completo: item.NombreVinculo,
          codigo_tipo_documento: item.IdClase,
          nro_documento: item.NumId,
          tipo_vinculo: item.TipoVinculo,
        };
        if (isNaN(parseInt(datoRep.codigo_tipo_documento))) {
          datoRep.codigo_tipo_documento = parseInt(datoRep.codigo_tipo_documento);
        }
        representantes.push(datoRep);
      })
      const representantes2 = representantes.filter(uniqFilterAccordingToProp('nombre_completo')).sort((a, b) => a.nombre_completo > b.nombre_completo); //obtener rptes unicos por nombre y ordenar por nombre
      resolve(representantes2);
    })// Fin GET
  }) // Fin Promesa
  ,
  //servicio para obtener datos de un deposito en una determinada fecha
  obtenerInformacionDeposito: (deposito,fecha) => new Promise((resolve, reject) => {
    const url_servicio = config.app.banco_union.url+'?inicio='+fecha+'&fin='+fecha;
    const request = require('request');
    const req = {
      url: url_servicio,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.app.banco_union.jwt}`,
        'Content-Type': 'application/json',
      },
      json: true,
    };
    request.get(req, (error, response, body) => {
      if (error) {
        reject(new Error(error));
        return;
      }
      let valor = 0;
      body.forEach((item, value) => {
        if(item.monto>339 && item.numDocumento==deposito) { valor = 1; }
      })
      if(valor!=1){
        reject(new Error("Numero de deposito no valido"))
        return;
      }
      else {
        const respuesta = [];
        const url_servicio1 = config.app.banco_union.url+deposito;
        const request1 = require('request');
        const req = {
          url: url_servicio1,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${config.app.banco_union.jwt}`,
            'Content-Type': 'application/json',
          },
          json: true,
        };
        request1.get(req, (error, response, body1) => {
          if (error) {
            reject(new Error(error));
            return;
          }
          if (body1.utilizado==true){
            //reject(new Error('Numero de deposito ya utilizado'));
            //return;
            const datoRep = {
              id: body1.id,
              fechaMovimiento: body1.fechaMovimiento,
              numeroDocumento: body1.numDocumento,
              descripcion: body1.descripcion,
              tipoMovimiento: body1.tipoMovimiento,
              monto: body1.monto,
              numeroMovimiento: body1.numMovtoDiario,
              detalle: body1.detalle,
              utilizado: body1.utilizado
            };
            respuesta.push(datoRep);
            resolve(respuesta);
          }
          else {
            const datoRep = {
              id: body1.id,
              fechaMovimiento: body1.fechaMovimiento,
              numeroDocumento: body1.numDocumento,
              descripcion: body1.descripcion,
              tipoMovimiento: body1.tipoMovimiento,
              monto: body1.monto,
              numeroMovimiento: body1.numMovtoDiario,
              detalle: body1.detalle,
              utilizado: body1.utilizado
            };
            respuesta.push(datoRep);
            resolve(respuesta);
          }
        })

      }
    })// Fin GET
  }) // Fin Promesa
  ,
};
// FIN

// vuelve los elemenots de un un array en unicos
uniqFilterAccordingToProp:  (prop) => {//filtra objetos en un array segun un key especifico
  if (prop)
    return (ele, i, arr) => arr.map(ele => ele[prop]).indexOf(ele[prop]) === i
  else
        return (ele, i, arr) => arr.indexOf(ele) === i
}

module.exports = servicios;
