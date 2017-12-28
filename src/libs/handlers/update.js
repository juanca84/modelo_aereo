const
  HttpStatusError = require('./errors/HttpStatusError'),
  transform = require('./parsers/transform');

module.exports = init;

function init(model) {
  return [
    transform,
    update,
  ];

  function update(req, res, next) {
    const
      body = req.body,
      options = req.options || {};

    delete body._fecha_creacion;
    delete body._fecha_modificacion;

    options.where = options.where || {};
    options.where[model.primaryKeyAttribute] = req.params.id;

    model
    .findOne(options)
    .then(updateAttributes)
    .then(respond)
    .catch(next);

    function updateAttributes(row) {
      if (!row) {
        throw new HttpStatusError(404, 'Not Found');
      } else {
        return row.updateAttributes(body);
      }
    }

    function respond(row) {
      res
      .status(200)
      .send({
        finalizado: true,
        mensaje: `Modificación de ${model.name || 'datos'} exitosa.`,
        datos: res.transform(row),
      });
    }
  }
}
