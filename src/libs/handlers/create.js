const transform = require('./parsers/transform');

module.exports = init;

function init(model) {
  return [
    transform,
    create,
  ];

  function create(req, res, next) {
    const body = req.body;

    delete body._fecha_creacion;
    delete body._fecha_modificacion;

    model
    .create(body)
    .then(respond)
    .catch(next);

    function respond(row) {
      res
      .status(201)
      .send({
        finalizado: true,
        mensaje: `Creación de ${model.name || 'datos'} exitosa.`,
        datos: res.transform(row),
      });
    }
  }
};
