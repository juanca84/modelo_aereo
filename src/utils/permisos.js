const SequelizeBackend = require('acl-sequelize-backend');
const NodeAcl = require('acl');
const aclOptions = { sync: false };
const tablePrefix = 'acl_';

  // Función para agregar roles a los usuarios
const agregarUsuarioRol = (id_usuario, roles, sequelize) => {
  console.log("here......................................: ", id_usuario);
  console.log('roles: ', roles);
  const acl = new NodeAcl(new SequelizeBackend(sequelize, tablePrefix, aclOptions));
  return acl.addUserRoles(id_usuario, roles);
}

module.exports = {
  agregarUsuarioRol,
}
