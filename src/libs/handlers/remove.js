const HttpStatusError = require('./errors/HttpStatusError');

module.exports = init;

function init(model) {
  return [
    remove,
  ];

  function remove(req, res, next) {
    const options = req.options || {};

    options.where = options.where || {};
    options.where[model.primaryKeyAttribute] = req.params.id;

    model
    .findOne(options)
    .then(destroy)
    .then(respond)
    .catch(next);

    function destroy(row) {
      if (!row) {
        throw new HttpStatusError(404, 'Not Found');
      } else {
        row.estado = 'INACTIVO';
        return row.update();
      }
    }

    function respond(row) {
      res
      .status(200)
      .send({
        finalizado: true,
        mensaje: `Eliminación de ${model.name || 'datos'} exitosa.`,
        datos: res.transform(row),
      });
    }
  }
};
