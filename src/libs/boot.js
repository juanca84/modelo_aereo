const http = require('http');

module.exports = app => {
  const config = app.src.config.config;

  process.env.TZ = config.timezone;


  if (process.env.NODE_ENV !== "test") {
    app.src.db.sequelize.sync().done(() => {
      if (process.env.FORCE || false) {
        process.exit(0);
      } else {
        const server = app.listen(app.get("port"), () => {
          console.log(`
                                            \\
                                            _\\,,
                                           "-=\\~
                                            _ \\\\~
                                            _\\|/\\
                                            \\  \\ \\
                                                ( )~~~
                                                | \\
                                     juanca    /  /

                      `);
          console.log(`Frame levantado y funcionando en el puerto  ${app.get('port')} `);
        });
      }
    });
  } else if (typeof(global.server) === 'undefined') {
    app.src.db.sequelize.sync().done(() => {
      if (process.env.FORCE || false) {
        process.exit(0);
      }
    });
  }
};
