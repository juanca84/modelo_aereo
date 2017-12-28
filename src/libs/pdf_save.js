const pdfSave = (rutaArchivo, objParametros) => {
    return new Promise(function (resolve, reject) {
        var ejs = require("ejs");
        var pdf = require("html-pdf");
        ejs.renderFile(rutaArchivo, objParametros, function (error, result) {
            if (result) {
                var html = result;
                var options = {
                    format: 'Letter',
                    orientation: 'portrait',
                    border: "9",
                    type: "pdf"
                };
                pdf.create(html, options).toFile(rutaArchivo, function (errorCreacion) {
                    if (errorCreacion) {
                        reject("Error al guardar el certificado promueve en disco");
                        return;
                    }
                    resolve(true);
                });
            }
            else {
                reject("Error al generar el documento a partir de la plantilla");
            }
        });
    });
};

module.exports = {
    pdfSave
};