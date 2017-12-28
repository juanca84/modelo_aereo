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
const user = { usuario: "admin", contrasena: "Developer"};

describe('====================== APIREST AUTENTICAR ======================', () => { // nos autenticamos inicialmente
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
  it('>>> 1. Debería autenticarse con un NIT de Impuestos y crear un usuario en estado PENDIENTE con ROL UNIDAD PRODUCTIVA ', (done) => {
    const objSend = {
      nit: "494937017",
      usuario: "biotec",
      contrasena: "biotec",
    };
    request(server)
      .post(`/autenticar`)
      .send(objSend)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        usuarioCreado = res.body.user;
        usuarioCreado.estado.should.be.equal(ESTADO_PENDIENTE);
        usuarioCreado.id_rol.should.be.equal(ROL_ACTOR_PRODUCTIVO_MINERO);
        tokenNuevo = res.body.token,
        done();
      });
  });

  it('>>> 2. Debería autenticarse con un usuario común (rol admin) a través de un usuario y contraseña ', (done) => {
    const objSend = {
      usuario: "admin",
      contrasena: "Developer",
      pathLogin: "login",
    };
    request(server)
      .post(`/autenticar`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        should(res.body.payload).be.ok;
        // res.body.payload.should.be.an.Object();
        // should(res.body.payload.usuario).be.ok;
        // res.body.payload.usuario.should.be.equal(objSend.usuario);
        // should(res.body.token).be.ok;
        // res.body.user.id_rol.should.be.equal(ROL_ADMINISTRADOR);
        done();
      });
  });

  it('>>> 3. Debería autenticarse con un usuario común (rol técnico PROBOLIVIA) a través de un usuario y contraseña ', (done) => {
    const objSend = {
      usuario: "tecnico1",
      contrasena: "Developer",
      pathLogin: "login",
    };
    request(server)
      .post(`/autenticar`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        should(res.body.payload).be.ok;
        // res.body.payload.should.be.an.Object();
        // should(res.body.payload.usuario).be.ok;
        // res.body.payload.usuario.should.be.equal(objSend.usuario);
        // should(res.body.token).be.ok;
        // res.body.user.id_rol.should.be.equal(ROL_TECNICO);
        done();
      });
  });

  it('>>> 4. Debería autenticarse con el usuario creado inicialmente en estado PENDIENTE con ROL UNIDAD PRODUCTIVA ', (done) => {
    const objSend = {
      nit: "494937017",
      usuario: "biotec",
      contrasena: "biotec",
    };
    request(server)
      .post(`/autenticar`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        usuarioCreado = res.body.user;
        usuarioCreado.estado.should.be.equal(ESTADO_PENDIENTE);
        usuarioCreado.id_rol.should.be.equal(ROL_ACTOR_PRODUCTIVO_MINERO);
        tokenNuevo = res.body.token,
        done();
      });
  });

  // it('>>> MODIFICACION de contraseña con error -> PUT usuario: /api/v1/usuarios/:id', (done) => {
  //   const usuarioModificar1 = {
  //     "contrasena": "aberazain@agetic.gob.bo",
  //     "contrasena_nueva": "aberazain@agetic.gob.bo",
  //   };
  //   request(server)
  //     .put(`/api/v1/mypass`)
  //     .set('Authorization', `Bearer ${tokenNuevo}`)
  //     .send(usuarioModificar1)
  //     .expect('Content-Type', /json/)
  //     .expect(412)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       res.body.mensaje.should.be.equal('No se puede cambiar la contraseña de un usuario que tiene acceso por Interoperabilidad.');
  //       done();
  //     });
  // });

  it('>>> 5. Debería autenticarse con un NIT de Impuestos y crear un usuario en estado PENDIENTE con ROL UNIDAD PRODUCTIVA ', (done) => {
    const objSend = {
      nit: "494937017",
      usuario: "biotec",
      contrasena: "biotec",
    };
    request(server)
      .post(`/autenticar`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        usuarioCreado = res.body.user;
        usuarioCreado.estado.should.be.equal(ESTADO_PENDIENTE);
        usuarioCreado.id_rol.should.be.equal(ROL_ACTOR_PRODUCTIVO_MINERO);
        done();
      });
  });

  it('>>> 6. Debería autenticarse con un NIT de Impuestos y crear un usuario en estado PENDIENTE con ROL UNIDAD PRODUCTIVA ', (done) => {
    const objSend = {
      nit: "494937017",
      usuario: "biotec",
      contrasena: "biotec",
    };
    request(server)
      .post(`/autenticar`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        usuarioCreado = res.body.user;
        usuarioCreado.estado.should.be.equal(ESTADO_PENDIENTE);
        usuarioCreado.id_rol.should.be.equal(ROL_ACTOR_PRODUCTIVO_MINERO);
        done();
      });
  });

  it('>>> 7. Debería autenticarse con un NIT de Impuestos y crear un usuario en estado PENDIENTE con ROL UNIDAD PRODUCTIVA ', (done) => {
    const objSend = {
      nit: "494937017",
      usuario: "biotec",
      contrasena: "naqwear",
    };
    request(server)
      .post(`/autenticar`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(412)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.finalizado.should.be.equal(false);
        done();
      });
  });

  it('>>> 8. Debería autenticarse con el número de RUM (nro_afcoop) y su contraseña ', (done) => {
    const objSend = {
      nro_afcoop: "rumsensual",
      contrasena: "Developer",
    };
    request(server)
      .post(`/autenticar`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        // res.body.mensaje.should.be.equal("error  trucho");
        if (err) {
          return done(err);
        }
        res.body.finalizado.should.be.equal(false);
        done();
      });
  });

});
