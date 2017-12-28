const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');

const listarTramiteRum = (query) => {
  return new Promise((resolve, reject) => {
    let dataResp, idxProductos, prod;
    const qProductos = Util.filterQuery(query);
    const qInsumos = {};
    const configApp = require('konfig')().app;
    // Ordena acorde a los parametros solicitados
    if (qProductos.order != null) {
      switch (qProductos.order[0][0]) {
        case 'matricula_comercio': qProductos.order[0] = [{ model: models.unidad_productiva, as: 'unidad_productiva' }, qProductos.order[0][0], qProductos.order[0][1]]; break;
        case 'razon_social': qProductos.order[0] = [{ model: models.unidad_productiva, as: 'unidad_productiva' }, qProductos.order[0][0], qProductos.order[0][1]]; break;
        case 'ruta_imagen': qProductos.order[0] = ['imagen_producto', qProductos.order[0][1]]; break;
        case 'fid_formulario': qProductos.order[0] = [{ model: models.certificacion, as: 'certificacion' }, qProductos.order[0][0], qProductos.order[0][1]]; break;
        case 'cuce': qProductos.order[0] = [{ model: models.certificacion, as: 'certificacion' }, qProductos.order[0][0], qProductos.order[0][1]]; break;
        default: ; break;
      }
    } else {
      qProductos.order = [
        ['estado', 'ASC'],
        ['_fecha_creacion', 'DESC'],
      ];
    }
    // qProductos.attributes = ['id_producto', 'nombre_producto', 'nombre_img_producto', 'estado', '_fecha_creacion'];
    qProductos.include = [
      {
        model: models.certificacion,
        as: 'certificacion',
        // required: true,
        attributes: ['id_certificacion', 'cuce', 'fid_unidad_productiva', 'observaciones', 'fid_formulario'],
        include: [
          {
            model: models.formulario,
            as: 'formulario',
            attributes: ['id_formulario', 'tipo'],
            where: { ambito: "PROMUEVE" },
          },
        ],
        where: {},
      },
      {
        model: models.unidad_productiva,
        as: 'unidad_productiva',
        // required: true,
        attributes: ['id_unidad_productiva', 'razon_social', 'matricula_comercio'],
        where: {},
      },
    ];

    qProductos.where = {
      shb: {
        $eq: false,
      },
    };

    switch (query.origenBandeja) {
      case 'solicitudes': qProductos.where.estado = { $in: ['ENVIADO', 'OBSERVADO', 'APROBADO', 'RECHAZADO'] }; break;
      case 'rechazados': qProductos.where.estado = { $in: ['CERTIFICADO'] }; break;
      default: reject('Falta el parametro origen de bandeja'); break;
    }

    if (query.origenBandeja == 'solicitudes' && query.estado == "PENDIENTE") query.estado == "ENVIADO";

    if (query.origenBandeja == 'rechazados') {
      qProductos.include[0].where.ruta_certificado = { $ne: null };
    }

    if (query.nombre_producto) {
      qProductos.where.nombre_producto = { $ilike: `%${query.nombre_producto}%` };
    }
    if (query.razon_social) {
      qProductos.include[1].where.razon_social = { $ilike: `%${query.razon_social}%` };
    }
    if (query.matricula_comercio) {
      qProductos.include[1].where.matricula_comercio = { $ilike: `%${query.matricula_comercio}%` };
    }
    if (query.estado && query.origenBandeja == 'solicitudes' && ['ENVIADO', 'OBSERVADO', 'APROBADO', 'RECHAZADO'].indexOf(query.estado) > -1) {
      qProductos.where.estado = query.estado;
    }

    if (query.estado && query.origenBandeja == 'rechazados' && ['CERTIFICADO'].indexOf(query.estado) > -1) {
      qProductos.where.estado = query.estado;
    }

    if (query.fid_formulario) {
      qProductos.include[0].where.fid_formulario = query.fid_formulario;
    }

    if (query.cuce) {
      qProductos.include[0].where.cuce = query.cuce;
    }

    models.producto.findAndCountAll(qProductos)
      .then(rowProductos => {
        idxProductos = {}; // indices de productos
        dataResp = {};
        dataResp.count = rowProductos.count;
        dataResp.results = rowProductos.rows.map((it, i) => {
          idxProductos[it.id_producto] = i;
          return {
            id_unidad_productiva: it.unidad_productiva.id_unidad_productiva,
            id_producto: it.id_producto,
            razon_social: it.unidad_productiva.razon_social,
            matricula_comercio: it.unidad_productiva.matricula_comercio,
            nombre_producto: it.nombre_producto,
            estado: (query.origenBandeja == "solicitudes" && it.estado == "ENVIADO") ? "PENDIENTE" : it.estado,
            fid_formulario: it.certificacion.fid_formulario,
            cuce: it.certificacion.cuce,
            _fecha_creacion: it._fecha_creacion,
            ruta_imagen: `${configApp.hosts.ruta_rest_backend}promueve/productos/${it.nombre_img_producto}`,
            data: {
              ins: it.ins,
              indice: it.indice,
              certificacion: it.certificacion,
              unidad_productiva: it.unidad_productiva,
              fid_unidad_productiva: it.fid_unidad_productiva,
              insumos: [],
            },
          }
        });
        qInsumos.attributes = ['fid_producto', "tipo_item", "nacional", "descripcion", "unidad", "unidad_medida", "valor", "cantidad"];
        qInsumos.where = {
          fid_producto: { $in: Object.keys(idxProductos) },
          nacional: true,
          tipo_item: 'MATERIALES',
        };
        return models.insumo.findAll(qInsumos);
      })
      .then(rowInsumos => {
        rowInsumos.forEach(it => {
          prod = dataResp.results[idxProductos[it.fid_producto]];
          prod.data.insumos.push(it.dataValues);
        })
        resolve(dataResp);
      })
      .catch(error => reject(error))
  })
};

module.exports = {
  listarTramiteRum
};