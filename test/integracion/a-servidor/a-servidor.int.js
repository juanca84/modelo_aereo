

/**
* Tests para la obtencion de parametros
*/

"use strict";

const request = require('supertest');
const should = require('should');
global.server = {};
require('../../registrarBabel');
require('babel-polyfill');

describe('Empezando a ejecutar los test, prueba del entorno de test... ', () => {
  before((done) => {
    server = require('../../../index');
    done();
  });


  let token = '';
  const user = { usuario: "admin", contrasena: "Developer", tipo: "OPERADOR", pathLogin: "login" };
  it('====== Prueba de Autenticación con el Admin: /autenticar', (done) => {
    request(server)
      .post('/autenticar')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('token');
        res.body.should.have.property('user');
        const result = JSON.parse(res.text);
        token = result.token;
        done();
      });

  });
});
