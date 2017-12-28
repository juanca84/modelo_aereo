/* global qr */
    /**
     * Genera el codigo qr de un texto en base 64.
     * @param {type} texto
     * @returns {unresolved}
     */
var qr = require('qr-image');
module.exports.GenerarQr = {
    base64: function(texto) {
        var code = qr.imageSync(texto, { type: 'png', margin: 1});
        var buffer = new Buffer(code);
        return buffer.toString('base64');
    }
};