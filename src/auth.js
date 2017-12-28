const passport2 = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
module.exports = app => {
  const  cfg = app.src.config.config;
  const params= {
    secretOrKey:cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
  };
  const strategy= new Strategy(params, (payload,done) => {
    Funcionarios.findByUid(payload.id)
    .then(funcionario => {
      if(funcionario){
        return done(null,{
          id:funcionario.uid,
        });
      }
      return done(null,false);
    })
  .catch(error => {;
    done(error,null);
  });
  });

  passport2.use(strategy);

  return {
    initialize: () =>  passport2.initialize() ,
    authenticate: () => passport2.authenticate("jwt", cfg.jwtSession),
  };
};
