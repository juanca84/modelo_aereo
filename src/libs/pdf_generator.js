
    const generarPDFaFile = (urlEjsPlantilla,objParametros,rutaSalidaPDF,config) => {
        // console.log("vvvvvvvv");
        return new Promise(function(resolve,reject)
       {
            var ejs = require("ejs");
        //     console.log("ffffff");
            ejs.renderFile(urlEjsPlantilla,objParametros, function (error, result) {
                //     console.log("Errorrr",error);
                    if (result) {
                            var pdf = require("html-pdf");
                            var options = config?config:
                            {
                              format: 'Letter',
                              orientation: 'portrait',
                              border:
                              {
                                top: "2cm",
                                left: "1.5cm",
                                right: "1.5cm",
                                bottom: "2cm"
                              }
                            };
                            options.filename = rutaSalidaPDF;
                            pdf.create(result, options).toFile(function (errorGen, bufferPDF) {
                                    if (errorGen) 
                                    {
                                      console.log("AAAA",errorGen);
                                        reject(errorGen);
                                        return;
                                    }
                                    resolve(bufferPDF);
                            });
                    }
                    else
                    {
                      console.log("EEEE",error);
                      reject(error);
                    }
                        
            });
       });
    };
    
    const generarPDFaBuffer = (urlEjsPlantilla,objParametros,config) => {
        // console.log("vvvvvvvv");
        return new Promise(function(resolve,reject)
       {
            var ejs = require("ejs");
        //     console.log("ffffff");
            ejs.renderFile(urlEjsPlantilla,objParametros, function (error, result) {
                //     console.log("Errorrr",error);
                    if (result) {
                            var pdf = require("html-pdf");
                            var options = config?config:
                            {
                              format: 'Letter',
                              orientation: 'portrait',
                              border:
                              {
                                top: "2cm",
                                left: "1.5cm",
                                right: "1.5cm",
                                bottom: "2cm"
                              }
                            };
                            pdf.create(result, options).toBuffer(function (errorGen, bufferPDF) {
                                    if (errorGen) 
                                    {
                                        reject(errorGen);
                                        return;
                                    }
                                    resolve(bufferPDF);
                            });
                    }
                    else
                        reject(error);
            });
       });
    };
    
module.exports = {
  generarPDFaBuffer,
  generarPDFaFile,
};