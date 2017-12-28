module.exports = {
    up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('tramite', [
        { // 1
          codigo: 101,
          denominacion: 'Registro Único Minero',
          abreviatura: 'RUM',
          descripcion: 'Inscripción al Registro Único Minero',
          costo: null,
          vigencia_meses: 12,
          nro_cuenta_bancaria: null,
          _usuario_creacion: 1,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad: 1,
          estado: 'ACTIVO'
        },
        { //2
          codigo: 201,
          denominacion: 'Contrato Administrativo Minero',
          abreviatura: 'CAM',
          descripcion: 'El Contrato Administrativo Minero (CAM) es un acuerdo legal por el cual el Estado Plurinacional de Bolivia, en representación del pueblo boliviano, mediante la Autoridad Jurisdiccional Administrativa Minera (AJAM) otorga a un Actor Productivo Minero (APM): empresa pública, privada o cooperativa la facultad de realizar actividades de exploración, explotación, concentración, fundición, comercialización y/o industrialización.',
          costo: null,
          vigencia_meses: 12,
          nro_cuenta_bancaria: null,
          _usuario_creacion: 1,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad: 3,
          estado: 'ACTIVO'
        },
        { //3
          codigo: 301,
          denominacion: 'Número de Identificación Minera',
          abreviatura: 'NIM',
          descripcion: 'Es el documento que están obligados a obtener del SENARECOM todos los actores productivos mineros (cooperativas, empresas privadas y empresas estatales) que explotan, procesan, funden y comercializan minerales y metales, este es un requisito básico para la comercialización interna y externa de dichos recursos. La vigencia es de un año.',
          costo: 340,
          vigencia_meses: 12,
          nro_cuenta_bancaria: '10000004678625',
          _usuario_creacion: 1,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad: 4,
          estado: 'ACTIVO'
        },
        { //4
          codigo: 302,
          denominacion: 'Formulario de compra y venta interna',
          abreviatura: 'M02',
          descripcion: 'La declaración del formulario de compra y venta interna de minerales y metales es de carácter obligatorio por parte del (Comprador), como hace referencia el DS. 29165, ya que el comprador se consagra en Agente de Retención de Aportes a corto plazo de la Caja Nacional de Salud - CNS y de la Corporación Minera de Bolivia - COMIBOL en caso de existir arrendamiento.',
          costo: 25,
          vigencia_meses: null,
          nro_cuenta_bancaria: '10000004678625',
          _usuario_creacion: 1,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad: 4,
          estado: 'ACTIVO'
        },
        { //5
          codigo: 303,
          denominacion: 'Formulario único de exportación',
          abreviatura: 'M03',
          descripcion: 'La declaración del Formulario Único de Exportación de Minerales y Metales es de carácter obligatorio por parte del exportador como hace referencia el DS. 29165.',
          costo: 35,
          vigencia_meses: null,
          nro_cuenta_bancaria: '10000004678625',
          _usuario_creacion: 4,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad: 4,
          estado: 'ACTIVO'
        },
        { //6
          codigo: 401,
          denominacion: 'Planes de trabajo y desarrollo',
          abreviatura: 'PTD',
          descripcion: 'Los Planes de Trabajo e Inversión para los actores productivos mineros estatales y privados o Planes de Trabajo y Desarrollo para las cooperativas mineras, requeridos en la presente Ley, se elaborarán y presentarán tomando en cuenta la ubicación, características geológicas, mineras, metalúrgicas, de acuerdo a lo que corresponda al actor productivo minero, según lo establecido en el Artículo 128 y en el inciso d) del Parágrafo II del Artículo 140 de la presente Ley. Estarán acompañados de u presupuesto y cronograma de actividades iniciales propuestas.',
          costo: null,
          vigencia_meses: null,
          nro_cuenta_bancaria: null,
          _usuario_creacion: 1,
          _fecha_creacion: new Date(),
          _fecha_modificacion: new Date(),
          fid_entidad: 5,
          estado: 'ACTIVO'
        },
    ], {});
  },

  down (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
