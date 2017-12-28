// TODO: posiblemente considerarlo como test unitario, de ser así cambiarle el nombre a dao.uni.js o dao.int.js
/**
* Tests de integración para proyectos
*/
'use strict';
const request = require('supertest');
const should = require('should');
server = require('../../../index');
const dao = require('../../../src/dao/dao');
const sequelize = require('sequelize');

require('../../registrarBabel');

describe('====================== DAO ======================', () => { // nos autenticamos inicialmente
  before((done) => {
    console.log(dao);
    done();
  });

  it('Debería existir el objeto DAO', (done) => {
    dao.should.be.instanceOf(Object)
    done();
  });

  it('Debería contar registros de una tabla', (done) => {
    const grupo = server.src.db.models.persona;
    dao.contarRegistros(grupo, {})
    .then(respuesta => {
      if(!respuesta) {
        done(new Error('respuesta vacía'));
      }
      else {
        console.log(respuesta);
        respuesta.should.be.a.Number();
        done();
      }
    })
    .catch(error => done(error));

  });


});
