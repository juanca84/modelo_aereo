const
  _ = require('lodash'),
  HttpStatusError = require('./errors/HttpStatusError'),
  qs = require('./parsers/qs'),
  transform = require('./parsers/transform');

module.exports = init;

function init(model) {
  return [
    transform,
    get,
  ];

  function get(req, res, next) {
    const
      options = {},
      keys = {};

    keys.model = _.keys(model.rawAttributes);
    options.attributes = qs.fields(req.query.fields);
    options.where = {};
    options.where[model.primaryKeyAttribute] = req.params.id;

    if(options.attributes && _.intersection(keys.model, options.attributes).length!=options.attributes.length){
      res.status(412).json({ msg: "Especifique los campos a seleccionar." });
    } else {

      model
      .findOne(options)
      .then(respond)
      .catch(next);

      function respond(row) {
        if (row) {
          res
          .status(200)
          .send({
            finalizado: true,
            mensaje: `Obtención de ${model.name || 'datos'} exitosa.`,
            datos: res.transform(row),
          });
        } else {
          throw new HttpStatusError(404, 'Not Found');
        }
      }
    }
  }
};
