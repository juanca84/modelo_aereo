/**
* Tests de integración para Parámetros
*/
'use strict';
const request = require('supertest');
const should = require('should');
const sequelize = require('sequelize');

require('../../registrarBabel');
let token = '';
let usuarioCreado = {};
const user = { nit: "494937017", usuario: "biotec", contrasena: "biotec"};

describe('====================== APIREST PERSONA ======================', () => { // nos autenticamos inicialmente
  before((done) => {
    request(server)
      .post('/autenticar')
      .send(user)
      .end((err, res) => {
        const result = res.body;
        token = result.token;
        done();
      });
  });

  let tokenNuevo = null;
  it('>>> 1. Debería guardar una persona buscando mediante servicio SEGIP ', (done) => {
    console.log("TOKEN: "+token);
    const objSend = {
      ci: "4047003",
      fecha_nacimiento: "1976/21/09"
    };
    request(server)
      .post(`/api/v1/persona/servicio/segip`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        personaCreada = res.body.datos;
        // usuarioCreado.estado.should.be.equal(ESTADO_PENDIENTE);
        // usuarioCreado.id_rol.should.be.equal(ROL_ACTOR_PRODUCTIVO_MINERO);
        // tokenNuevo = res.body.token,
        done();
      });
  });
});
