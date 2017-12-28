const konfig = require('konfig')();

module.exports = app => {
  const config = require('konfig')();
  const notificarHttp = (cuerpoPeticion) => new Promise((resolve, reject) => {   
//    var cuerpoPeticion = 
//    {
//      remitente: plantilla.remitente,
//      origen: plantilla.origen,
//      modo: 'html',
//      mensaje: template(data),
//      correos: [email],
//      asunto: plantilla.asunto,
//      adjuntos:arrayRutasCertificado
//    }
    
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    var jsonConfig = config.app.correo;
    var transporter = nodemailer.createTransport(smtpTransport(jsonConfig));
    
    var opciones = {
        to: cuerpoPeticion.correos,
        from: cuerpoPeticion.origen?cuerpoPeticion.origen:jsonConfig.origen,
        subject: cuerpoPeticion.asunto,
        text: cuerpoPeticion.modo!=='html'&&(cuerpoPeticion.modo!==null||cuerpoPeticion.modo!==undefined)? cuerpoPeticion.mensaje:undefined,
        html: cuerpoPeticion.modo==='html'||cuerpoPeticion.modo===null||cuerpoPeticion.modo===undefined? cuerpoPeticion.mensaje:undefined,
        attachments: cuerpoPeticion.adjuntos?cuerpoPeticion.adjuntos:null
    };
    transporter.sendMail(opciones, function (error, info) {
      if(error === null)
      {
          resolve(info);
      }
      else
      {
        if(error.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE")
          resolve(error);
        else
        {
          reject(error);
        }
      }
    });
  });
  
  
//  const notificarHttp = (cuerpoPeticion) => new Promise((resolve, reject) => {
//    const bolSms = cuerpoPeticion.bolSms;
//    delete cuerpoPeticion.bolSms;
//    const path = bolSms ? config.pathNotificacionSms : config.pathNotificacionCorreo;
//    const host = `${config.urlNotificaciones}${path}`;
//    cuerpoPeticion.mensaje = cuerpoPeticion.mensaje.replace('urlLogoMinisterio', konfig.app.urlLogoMinisterio)
//    cuerpoPeticion.headers = {
//      'Content-Type': 'application/json',
//      'Authorization':`Bearer ${config.tokenCorreo}`,
//    };
//    request.post(host, {json: cuerpoPeticion}, (error, response, body) => {
//      if(!error && response.statusCode == 200) resolve(body);
//      else reject(error);
//    });
//  });
  return notificarHttp;
};