var create = require('./handlers/create'),
    get = require('./handlers/get'),
    list = require('./handlers/list'),
    remove = require('./handlers/remove'),
    update = require('./handlers/update');

module.exports = {
    create: create,
    get: get,
    query: list,
    remove: remove,
    update: update
};
