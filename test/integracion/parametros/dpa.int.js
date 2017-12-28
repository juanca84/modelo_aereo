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

describe('====================== APIREST DPA ======================', () => { // nos autenticamos inicialmente
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
  it('>>> 1. Debería listar todos los departamentos', (done) => {
    request(server)
      .get(`/api/v1/departamento`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        done();
      });
  });
  it('>>> 2. Debería listar todas las provincias', (done) => {
    request(server)
      .get(`/api/v1/provincia`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        done();
      });
  });
  it('>>> 3. Debería listar todos los municipios', (done) => {
    request(server)
      .get(`/api/v1/municipio`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        done();
      });
  });
  it('>>> 4. Debería Buscar un elemento DPA', (done) => {
    request(server)
      .get(`/api/v1/dpa/162`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        done();
      });
  });
  it('>>> 5. Debería devolver error con datos fuera de la tabla', (done) => {
    request(server)
      .get(`/api/v1/dpa/590`)
      .set('Authorization', `Bearer ${token}`)
      .expect(412)
      .end((err, res) => {
        res.body.finalizado.should.be.equal(false);
        res.body.mensaje.should.be.equal("No se encuentran datos relacionados al id");
        done();
      });
  });
  it('>>> 6. Debería devolver los hijos de un elemento seleccionado', (done) => {
    request(server)
      .get(`/api/v1/dpa/hijos/8`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        done();
      });
  });
  it('>>> 7. Debería lanzar error con datos fuera de la tabla', (done) => {
    request(server)
      .get(`/api/v1/dpa/hijos/500`)
      .set('Authorization', `Bearer ${token}`)
      .expect(412)
      .end((err, res) => {
        res.body.finalizado.should.be.equal(false);
        res.body.mensaje.should.be.equal("No existe el id enviado");
        done();
      });
  });
  it('>>> 8. Debería lanzar error con registros sin hijos', (done) => {
    request(server)
      .get(`/api/v1/dpa/hijos/320`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.datos.should.be.equal("El elemento no tiene hijos");
        done();
      });
  });
});
