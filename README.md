# Sistema Marca País

## Introducción
El Sistema Marca País tiene por objetivo principal establecer el procedimiento para realizar el registro de declaraciones juradas de Entidades Constituidas y proveer certficaciones para el derecho de uso del logo Marca País.

### Objetivos secundarios

- Transparencia y control de los procesos.
- Reducción de la cantidad de papel empleado.
- Interoperabilidad con otras Instituciones.

## Módulos e Interoperabilidad

### Módulos
Se han identificado los siguientes módulos:
* Módulo de Autenticación / Autorización
* Módulo de Generación de Declaraciones Juradas Marca País
* Módulos Administrativos (Paramétricas)

### Interoperabilidad
Para el presente sistema presenta interoperabilidad con los siguientes sistemas:
* SEGIP.- para validar los datos de las personas con cédula de identidad.
* FUNDEMPRESA.- para validar los datos de las empresas.
* SIN.- para validar los usuarios de impuestos.

## Las tecnologías utilizadas son:

- **Express** como servidor web ejecutar como npm start
- **Sequelize** como ORM
- **Passport** jwt como mecanismo de autenticacion
- **Mocha** como framework de de testing ejecutar como npm testing
- **ApiDoc** documentacion del apiRest ejecutar como npm run apidoc
- **Babel** como compilador de ecma6 a ecma 5
- **eslint** como validador del codigo fuente
- **jsdoc** como validador de la documentación

## Configuración del Servidor
Para una correcta instalación, el servidor debe tener las configuraciones necesarias, para ello se recomienda revisar el siguiente enlace:

> [SERVER.md](SERVER.md)

## Instalación de la Aplicación
Para instalar la aplicación se recomienda revisar el siguente enlace:

> [INSTALL.md](INSTALL.md)