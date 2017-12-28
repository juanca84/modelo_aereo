/**
 * Lógica del Negocio -> ConfiguracionBL
 */

const dao = require('../../dao/dao');
const Q = require('q');

const cargarMenu = (idRolSuperior, models) => {
  const deferred = Q.defer();
  const modificarObj = {};

  let condicion = null;
  if(idRolSuperior){
    condicion = idRolSuperior;
  }

  let menuEntrar = '';
  const parametrosRolMenu = {
    attributes: ['method_get', 'method_post', 'method_put', 'method_delete'],
    where: {
      fid_rol: condicion,
      estado: ESTADO_ACTIVO,
    },
    order: '"menu.menu_padre".orden ASC, menu.orden ASC',
    include: [{
      model: models.menu,
      as: 'menu',
      attributes: [
        ['nombre', 'label'],
        ['ruta', 'url'],
        ['icono', 'icon'], 'fid_menu_padre', 'visible',
      ],
      where: {estado: ESTADO_ACTIVO},
      include: [{
        model: models.menu,
        as: 'menu_padre',
        where: {estado: ESTADO_ACTIVO},
        attributes: ['id_menu', ['nombre', 'label'],
          ['ruta', 'url'],
          ['icono', 'icon'], 'visible',
        ],
      }],
    }],
  };
  // deferred.resolve(respuestaMod)
  dao.listarRegistros(models.rol_menu, parametrosRolMenu, false)
  .then(roles_menus_res => {
    const menusDevolverAux = [];
    for (const rm in roles_menus_res) {
      if(roles_menus_res[rm].menu.menu_padre){
        // Obteniendo al padre
        const padre = roles_menus_res[rm].menu.menu_padre;
        const objPadre = JSON.stringify(padre);
        let existe = false;
        for (let i = 0; i < menusDevolverAux.length; i++) {
          if (JSON.stringify(menusDevolverAux[i]) == objPadre) {
            existe = true;
            break;
          }
        }
        if (!existe) {
          menusDevolverAux.push(padre);
        }
      }
      else {
        let existe = false;
        for (let i = 0; i < menusDevolverAux.length; i++) {
          if (JSON.stringify(menusDevolverAux[i]) == roles_menus_res[rm].menu) {
            existe = true;
            break;
          }
        }
        if (!existe) {
          menusDevolverAux.push(roles_menus_res[rm].menu);
        }
      }

    } // End if

    const menusDevolver = [];
    for (const i_padre in menusDevolverAux) {
      const padre = JSON.parse(JSON.stringify(menusDevolverAux[i_padre]));
      padre.submenu = [];
      for (const i_rm in roles_menus_res) {
        if(roles_menus_res[i_rm].menu.fid_menu_padre){
          //padre.submenu = [];
          if (padre.id_menu == roles_menus_res[i_rm].menu.fid_menu_padre) {
            const hijo = JSON.parse(JSON.stringify(roles_menus_res[i_rm].menu));
            delete hijo.menu_padre;
            hijo.permissions = {};
            hijo.permissions.read = roles_menus_res[i_rm].method_get;
            hijo.permissions.create = roles_menus_res[i_rm].method_post;
            hijo.permissions.update = roles_menus_res[i_rm].method_put;
            hijo.permissions.delete = roles_menus_res[i_rm].method_delete;
            padre.submenu.push(hijo);
            if (!menuEntrar) {
              menuEntrar = `${hijo.url}`;
            }
          }
        }
        else{
          padre.permissions = {};
          padre.permissions.read = roles_menus_res[i_rm].method_get;
          padre.permissions.create = roles_menus_res[i_rm].method_post;
          padre.permissions.update = roles_menus_res[i_rm].method_put;
          padre.permissions.delete = roles_menus_res[i_rm].method_delete;
          if (!menuEntrar) {
            menuEntrar = `${padre.url}`;
          }
        }
      }
      menusDevolver.push(padre);
    }
    deferred.resolve({menu: menusDevolver, menuEntrar});
    // Aqui buscar al Menu de usuario
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

module.exports = {
  cargarMenu,
}
