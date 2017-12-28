process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const config = require('konfig')();

const Client = require('node-rest-client').Client;
const client = new Client();
const Q = require('q');

const messages = {
  '404': 'No se pudo encontrar el servicio solicitado.',
  '508': 'El servicio no responde',
  '503': 'El servicio no está disponible en estos momentos.',
  '502': 'Bad Gateway.',
  '504': 'El tiempo para la respuesta ha expirado.',
  '501': 'No implementado.',
  '200': 'Datos recuperados correctamente.',
  '400': 'Petición incorrecta.',
  '401': 'No se encontraron resultados.',
  '500': 'Error interno en el servidor.',
};

const servicios = {
  obtenerPersona: (ci, fecha_nacimiento) => {
    const deferred = Q.defer();
    console.log(`ci: ${ci}`);
    console.log(`fecha_nacimiento: ${fecha_nacimiento}`);
    //argumentos para consultar al servicio
    const url = config.app.servicio_segip.host;
    const endpoint_estado = config.app.servicio_segip.endpoint_estado;
    const endpoint_consumo = config.app.servicio_segip.endpoint_consumo;
    const token = config.app.servicio_segip.token;
    const query_fecha = `?fecha_nacimiento=${fecha_nacimiento}`;
    // header
    const args = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    };
    // client.get(url + endpoint_estado + endpoint_personas + ci + endpoint_fecha + fecha_nacimiento, args, (data, response) => {
    client.get(url + endpoint_estado, args, (data, response) => {
      // console.log(data);
      if (data && data.estado && data.estado == 'El servicio de SEGIP se encuentra disponible' && response.statusCode === 200) {
        console.log(url + endpoint_consumo + ci + query_fecha);
        client.get(url + endpoint_consumo + ci + query_fecha, args, (data, response2) => {

          // ENCONTRO DATOS
          if (data && data.ConsultaDatoPersonaEnJsonResult && data.ConsultaDatoPersonaEnJsonResult.DatosPersonaEnFormatoJson && data.ConsultaDatoPersonaEnJsonResult.DatosPersonaEnFormatoJson != "null" && data.ConsultaDatoPersonaEnJsonResult.DatosPersonaEnFormatoJson != "undefined") {
            const persona = JSON.parse(data.ConsultaDatoPersonaEnJsonResult.DatosPersonaEnFormatoJson);
            if (!persona) {
              deferred.reject(new Error("No se encontraron resultados coincidentes para su consulta. Por favor verifique sus datos."));
              return;
            }
            const fechaNacimiento = persona.FechaNacimiento.split('/');
            persona.FechaNacimiento = new Date(`${fechaNacimiento[2]}-${fechaNacimiento[1]}-${fechaNacimiento[0]}T04:00:00.000Z`);
            deferred.resolve(persona);
          }

          // NO HAY DATOS
          if (data && data.res) {
            deferred.reject(new Error("No se encontraron resultados coincidentes para su consulta. Por favor verifique sus datos."));
            return;
          }

          // OTROS ERRORES
          if (data.ConsultaDatoPersonaEnJsonResult == 'undefined') {
            deferred.reject("Error con el servicio web SEGIP");
            return;
          }

          if ((data && data.ConsultaDatoPersonaEnJsonResult && data.ConsultaDatoPersonaEnJsonResult.DatosPersonaEnFormatoJson === "null") ||
              (data && data.ConsultaDatoPersonaEnJsonResult && data.ConsultaDatoPersonaEnJsonResult.DatosPersonaEnFormatoJson === 'undefined') ||
              (data && data.DatosPersonaEnFormatoJson === "null") ||
              (data && data.DatosPersonaEnFormatoJson === "undefined")) {
            deferred.resolve({
              codigo: response.statusCode,
              datos: {
                estado: data.CodigoRespuesta ? data.CodigoRespuesta : data.ConsultaDatoPersonaEnJsonResult.CodigoRespuesta,
                estado_mensaje: data.DescripcionRespuesta ? data.DescripcionRespuesta : data.ConsultaDatoPersonaEnJsonResult.DescripcionRespuesta,
              },
              mensaje: messages[`${response.statusCode}`],
            });
            return;
          }

          deferred.reject(new Error("No se encontraron resultados coincidentes para su consulta. Por favor verifique sus datos."));
          return;

        }).on('error', (err) => {
          deferred.reject(new Error("Ocurrieron problemas de conexión con el servicio del SEGIP, por favor consulte con el Administrador del sistema si el problema persiste."));
        });
      } else {
        deferred.reject(new Error("Ocurrieron problemas de conexión con el servicio del SEGIP, por favor consulte con el Administrador del sistema si el problema persiste."));
      }
    }).on('error', (err) => {
      deferred.reject(new Error("Ocurrieron problemas de conexión con el servicio del SEGIP, por favor consulte con el Administrador del sistema si el problema persiste."));
    });
    //fin del servicio

    return deferred.promise;
  },
};
module.exports = servicios;
