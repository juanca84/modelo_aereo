const
  _ = require('lodash'),
  qs = require('./parsers/qs'),
  transform = require('./parsers/transform');

module.exports = init;

function init(model) {
  return [
    transform,
    filter,
    query,
  ];

  function filter(req, res, next) {
    let options = {};
    const keys = {};

    model = req.model || model;

    keys.model = _.keys(model.rawAttributes);
    keys.query = _.keys(req.query);
    keys.filters = _.intersection(keys.model, keys.query);

    options.attributes = qs.fields(req.query.fields);
    options.limit = qs.limit(req.query.limit) || 50;
    if (req.query.limit=='un') delete options.limit;

    if(options.attributes && _.intersection(keys.model, options.attributes).length!=options.attributes.length){
      req.options = null;
      next();
    }

    if( req.query.filter !== undefined  && req.query.page !== undefined  && req.query.order !== undefined){

      options.offset = (req.query.limit * ((req.query.page || 1) - 1)) || 0;
      options.order = qs.sort(req.query.order);
      options.where = qs.filters(_.pick(req.query, keys.filters)) || {};

      if(req.query.searchPro==1 && req.query.fIni && req.query.fFin){
        if(req.query.fSel)
          options.where[req.query.fSel] = { $between:[new Date(req.query.fIni) || fAct, new Date(req.query.fFin) || fAct] };
        else
          options.where._fecha_modificacion = { $between:[new Date(req.query.fIni) || fAct, new Date(req.query.fFin) || fAct] };
      }

      if(req.query.filter !== ''){
        model.describe().then( (fields) => {
          const xfilter = [];
          let x;
          for (const i in fields) {
            const field = fields[i];
            const obj = {};
            let buscar = (options.attributes === null)? true : options.attributes.indexOf(i)!=-1;
            if(req.query.searchPro==1 && buscar && req.query.tipoBus=='campo') buscar = req.query.campoSel==i;

            if(buscar){
              switch (field.type) {
              case 'INTEGER':
                x = parseInt(req.query.filter);
                if(!isNaN(x) && req.query.filter.indexOf("/") == -1){
                  obj[i] = x;
                  xfilter.push(obj);
                }
                break;
              case 'USER-DEFINED':
                x = req.query.filter;
                for (const j in field.special) {
                  // console.log("j",field.special[j]);
                  if(field.special[j].toLowerCase().indexOf(x.toLowerCase()) === 0){
                    obj[i] = field.special[j];
                    xfilter.push(obj);
                  }
                }
                break;
              case 'TIMESTAMP WITH TIME ZONE':
                // Busqueda de fechas del tipo: 2016-10-20, 2016/10/20, 20-10-2016, 20/10/2016.
                // TODO: No se puede buscar por el mes.
                const consulta=procesarFecha(req.query.filter);
                if(consulta !== false){
                  obj[i]=procesarFecha(req.query.filter);
                  xfilter.push(obj);
                }
                break;
              case 'CHARACTER VARYING':
                obj[i] = { $ilike:`%${req.query.filter}%` };
                xfilter.push(obj);
                break;
              case 'TEXT':
                obj[i] = { $ilike:`%${req.query.filter}%` };
                xfilter.push(obj);
                break;
            //   default:
            //     obj[i] = req.query.filter;
            //     xfilter.push(obj);
              }
            }
            // console.log(i," ",fields[i]);
          }
          //   console.log(xfilter);
          for (const i in xfilter[0]) {
            if (i.indexOf("id_") === 0) {
              xfilter.shift();//descatamos el id
            }
          }
          options.where.$or = xfilter;
          options = _.omitBy(options, _.isNull);
          req.options = options;
          next();
        });
      }else {
        options = _.omitBy(options, _.isNull);
        req.options = options;
        next();
      }
    }else {
      //consulta por defecto de sequelize-handlers
      options.offset = qs.offset(req.query.offset);
      options.order = qs.sort(req.query.sort);
      options.where = qs.filters(_.pick(req.query, keys.filters));

      options = _.omitBy(options, _.isNull);

      req.options = _.merge({}, options, req.options);

      next();
    }
  }

  function query(req, res, next) {
    const options = req.options;

    if(!req.options) res.status(412).json({ msg: "Especifique los campos a seleccionar." });
    else {
      model
      .findAndCountAll(options)
      .then(respond)
      .catch(next);

      function respond(result) {
        const
          count = result.count,
          start = options.offset;
        let  end = options.offset + options.limit;

        if (end >= count) {
          end = count;
          res.status(200);
        } else {
          res.status(206);
        }

        res
        .set('Content-Range', `${start}-${end}/${count}`)
        .send({
          finalizado: true,
          mensaje: "Obtención de datos exitosa.",
          datos: {
            count: result.count,
            rows: res.transform(result.rows),
          },
        });
      }
    }
  }






  /**
  Funcion que procesa una cadena, verifica si tiene el formato de una fecha.
  @param {pCadena} Cadena de texto con formato de fecha.
  @return Retorna:
  EXITO -> un objeto de consulta con formato sequelize.
  FALLO -> false.
  */
  function procesarFecha(pCadena){

    let fecha = new Date(pCadena);
    let anio = null, inicio = null, fin = null;

    // Identifica el operador usando en la cadena para separar los datos.
    const operador = pCadena.indexOf('-')>-1? '-': pCadena.indexOf('/')>-1?'/':null;

    // Si existe un operador valido en la cadena.
    if(operador !== null){

      // Si la cadena no es valida como fecha, se la invierte.
      if(fecha == 'Invalid Date') {
        fecha =new Date(((pCadena.split(operador)).reverse()).join("-"));
      }
      // Obtine el año.
      anio=fecha.getFullYear();

      // Si existe el año.
      if(anio !== null){
        const vector=pCadena.split(operador);

        // Si la longitud del vector es igual a 3.
        if(vector.length==3){
          const indice=vector.indexOf(anio.toString());

          // Si el año existe dentro del vector de la cadena.
          if(indice>-1){

            // Armado de la fecha inicio y fecha fin.
            if(indice === 0){
              inicio=`${vector[0]}-${vector[1]}-${vector[2]}`;
              fin=`${vector[0]}-${vector[1]}-${parseInt(vector[2])+1}`;
            }
            else if(indice==2) {
              inicio=`${vector[2]}-${vector[1]}-${vector[0]}`;
              fin=`${vector[2]}-${vector[1]}-${parseInt(vector[0])+1}`;
            }

            // Armado de la respuesta a retornar.
            const respuesta={
              $gte: inicio,
              $lt: fin,
            };
            return respuesta;
          }
          else return false; // Fin condicional indice.
        }
        else return false; // Fin condicional longitud vector.
      }
      else return false; // Fin condicional existencia año.
    }
    else return false; // Fin condicional existencia operador.
  }
}

/**
var tipos = {
    "INTEGER":{//INTEGER
        "fieldType": "input",
        "templateType": "number",
    },
    "CHARACTER VARYING":{//STRING
        "fieldType": "input",
        "templateType": "text",
    },
    "CHARACTER":{//CHAR
        "fieldType": "input",
        "templateType": "text",
    },
    "TEXT":{//TEXT
        "fieldType": "textarea",
        "templateType": "",
    },
    "BIGINT":{//BIGINT
        "fieldType": "input",
        "templateType": "number",
    },
    "DOUBLE PRECISION":{//FLOAT, DOUBLE
        "fieldType": "input",
        "templateType": "number",
        'step': 'any',
    },
    "REAL":{//REAL
        "fieldType": "input",
        "templateType": "number",
    },
    "NUMERIC":{//DECIMAL
        "fieldType": "input",
        "templateType": "number",
    },
    "BOOLEAN":{//BOOLEAN
        "fieldType": "checkbox",
        "templateType": "",
    },
    "TIME WITHOUT TIME ZONE":{//TIME
        "fieldType": "input",
        "templateType": "time",
    },
    "TIMESTAMP WITH TIME ZONE":{//DATE
        //"fieldType": "input",
        "fieldType": "datepicker",
        "templateType": "datetime-local",
    },
    "DATE":{//DATEONLY
        //"fieldType": "input",
        "fieldType": "datepicker",
        "templateType": "date",
    },
    "JSON":{//JSON
        //"fieldType": "input",
        "fieldType": "textarea",
        "templateType": "",
    },
    "BYTEA":{//BLOB
        "fieldType": "textarea",
        "templateType": "",
    },
    "USER-DEFINED":{//ENUM
        "fieldType": "select",
        "templateType": "",
    },
};
**/
