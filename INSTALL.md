# Instalación de la Aplicación MARCAPAIS (BACKEND)


## Configuración del Servidor

Para una correcta instalación, el servidor debe tener las siguientes configuraciones obligatoriamente:

> [SERVER.md](SERVER.md)


Después recién llevar a cabo los siguientes pasos, que son necesarios para instalar la aplicación.

## Creación de la Base de Datos
Se debe crear la base de datos para la ejecución del backend, para ello conectarse con el siguiente comando (sólo el primero):
```sh
$ psql -U postgres
Password for user postgres:
psql (9.4.6)
Type "help" for help.

postgres=#
```
Crear un usuario gestor de la base de datos que se creará para el sistema:
```sh

postgres=# CREATE USER marcapais_user WITH PASSWORD 'Developer';
```
Para crear la base de datos, ejecutar el siguiente comando dentro de la línea de comandos de postgres:
```sh
postgres=# CREATE DATABASE marcapais_db WITH OWNER marcapais_user;
```
## Intalación de postgis

Se debe instalar postgis mediante uno de los siguiente comandos, dependiendo de la versión de postgres que tenga
```sh
$ sudo apt-get install postgis postgresql-9.4-postgis-2.1
```
o
```sh
$ sudo apt-get install postgis
```
Finalmente se debe reiniciar el servicio e importarlo a nuestra base de datos:
```sh
$ /etc/init.d/postgresql restart
$ sudo -u postgres psql -d marcapais_db -c "CREATE EXTENSION IF NOT EXISTS postgis;"
```
## Instalación

Para instalar el proyecto:

Clonarlo:

- **Opción 1:** Si se generó llave SSH: (En los pasos del archivo SERVER.md)
  ```sh
  $ git clone git@gitlab.geo.gob.bo:agetic/mincomunicacion-marca_pais-backend.git
  ```

- **Opción 2:** Si se quiere clonar el proyecto por HTTPS:
  ```sh
  $ git clone https://usuario@gitlab.geo.gob.bo:agetic/mincomunicacion-marca_pais-backend.git
  ```
  Es posible que al descargar el proyecto con HTTPs, nos lance el siguiente error:
  ```sh
  Cloning into 'nombre-del-proyecto'...
  fatal: unable to access 'https://url-del-proyecto.git/': server certificate verification failed. CAfile: /etc/ssl/certs/ca-certificates.crt CRLfile: none
  ```
  ```sh
  $ git config --global http.sslverify false
  $ git clone https://usuario@gitlab.geo.gob.bo:agetic/mincomunicacion-marca_pais-backend.git
  ```

**Después de clonar con cualquiera de las opciones anteriores:**

Ingresar a la carpeta:
```sh
$ cd mincomunicacion-marca_pais-backend
```
Podemos verificar que estamos en el branch master:
```sh
$ git status
```
Nos devolverá:
```sh
- On branch master
```

`(Opcional)` Si necesitamos trabajar un branch específico (en este ejemplo, el nombre del branch es nombre_del_branch) ejecutamos:
```sh
$ git checkout nombre_del_branch
```

Al volver a verificar con git status:
```sh
$ git status
```
Se obtiene como respuesta que el proyecto se sitúa en el branch elegido:
```sh
- On branch nombre_del_branch
```
Para instalar la aplicación, se tienen las siguientes opciones:

###### Instalar dependencias del proyecto

Ejecutar el comando `npm install` que instalará todas las dependencias que el proyecto necesita:
```sh
$ npm install
```

## Archivos de Configuración

Existen dos tipos de archivos de configuración: un primer tipo de configuración utilizado por **sequelize** para leer la configuración necesaria para ejecutar las migraciones y los seeders y un segundo tipo de configuración para cada entorno o environment, siendo los posibles: development, test y production.

##### Configuración para migrations y seeders

Es necesario hacer una copia del archivo de ejemplo. Para esto lanzar:

```
$ cp config/config.js.sample config/config.js
```
Posteriormente, abrir el nuevo archivo creado utilizando un editor de preferencia (en este caso se prosigue con nano):

```
$ nano config/config.js
```

Ahora, en el nuevo archivo `config/config.js` reemplazar los valores con los de la conexión elegida según el ambiente a utilizarse:

`**NO OLVIDE REVISAR EL CONTENIDO DEL ARCHIVO!**`

Ejemplo de las variables que se configuran:

- username.- nombre de usuario de la base de datos
- password.- contraseña del usuario de la base de datos
- database.- nombre de la base de datos
- host.- host en el que se encuentra la base de datos
- demás variables.

**NOTA**
Se recomienda borrar las siguientes variables del archivo config/config.js, si se va a hacer `npm run setup` en varias ocasiones y se necesita reiniciar la base, sino, no volverán a correr todos los seeders necesarios:
```sh
"seederStorage": "sequelize"
"seederStorageTableName": "sequelize_seeders"
```

##### Otras variables en app.json

Duplicar el archivo app.json.sample y renombrarlo bajo el nombre app.json.
Configurar las variables necesarias de acuerdo al ambiente en el que se hará correr la aplicación.

`**NO OLVIDE REVISAR EL CONTENIDO DEL ARCHIVO, EL SIGUIENTE CONTENIDO ESTÁ PARA MOTIVOS DE EJEMPLO!**`

Ejemplo:


```sh
"urlNotificacionCorreo": "",
"urlNotificacionSms": "",
"urlSistema": "http://localhost:8080",
"urlLoginAdmin": "http://localhost:8080/#!/loginAdmin",
"urlActivacion": "http://localhost:8080/#!/confirmarCuenta",
"urlRecuperar": "http://localhost:8080/#!/restaurar",
"rutaInscripcion": "/inscripcion",
"urlLogoMinisterio": "http://www.senapi.gob.bo/swf/nuevoLogoMinisterio.png",
"rutaCertficado": "http://localhost:8080/#!/verificacion?codigo=",
"hosts":
{
    "ruta_rest_backend":"http://[host rest backend]"
},
"directorios": {
  "ruta_fotos_producto": "[ruta_raiz]/uploads/promueve/productos/",
  "ruta_certificaciones_promueve": "[ruta_raiz]/uploads/promueve/certificaciones/",
  "ruta_probolivia": "[ruta_raiz]/uploads/probolivia/",
  "ruta_csv": "[ruta_raiz]/uploads/probolivia/csv/"
},
```


- [ruta_raiz]: se refiere a la ruta del proyecto.

##### Configuración de Servicios de Interoperabilidad

En general, para poder utilizar los servicios de interoperabilidad satisfactoriamente se debe duplicar el archivo config/app.json.sample bajo el nombre config/app.json (si es que no se ha duplicado aún). Y modificar los atributos: servicio_segip, sin, fundempresa con las credenciales de acceso correctas.

El presente sistema cuenta con los siguientes servicios de interoperabilidad:

##### Servicio Web SEGIP

Este proyecto realiza el consumo del servicio web del SEGIP, para obtener y validar los datos de las personas que se registren en el sistema. En el archivo config/app.json se encuentra bajo el nombre de servicio `servicio_segip`.

`**NO OLVIDE REVISAR EL CONTENIDO DEL ARCHIVO, EL SIGUIENTE CONTENIDO ESTÁ PARA MOTIVOS DE EJEMPLO!**`

```sh
"servicio_segip": {
  "host": "http://test.local.agetic.gob.bo/kong/fake",
  "token": "Bearer abc.def.ghi",
  "endpoint_estado": "/segip/v2/status/",
  "endpoint_consumo": "/segip/v2/personas/"
}
```
##### Servicio Web de Impuestos Nacionales (SIN)

Este proyecto realiza el consumo del servicio web del Servicio de Impuestos Nacionales, para autenticar a usuarios del SIN. En el archivo config/app.json se encuentra bajo el nombre de servicio `sin`.

`**NO OLVIDE REVISAR EL CONTENIDO DEL ARCHIVO, EL SIGUIENTE CONTENIDO ESTÁ PARA MOTIVOS DE EJEMPLO!**`

```sh
"sin":
{
    "jwt": "abc.def.ghi",
    "url_status": "http://test.local.agetic.gob.bo/kong/fake/impuestos/v1/status",
    "url": "http://test.local.agetic.gob.bo/kong/fake/impuestos/v1/login"
},
```

##### Fundempresa

Este proyecto realiza el consumo del servicio web de Fundempresa, para obtener datos de empresas según el NIT. En el archivo config/app.json se encuentra bajo el nombre de servicio `fundempresa`.

`**NO OLVIDE REVISAR EL CONTENIDO DEL ARCHIVO, EL SIGUIENTE CONTENIDO ESTÁ PARA MOTIVOS DE EJEMPLO!**`

```sh
"fundempresa": {
    "jwt": "abc.def.ghi",
    "url_status": "http://test.local.agetic.gob.bo/kong/fake/fundempresa/v1/status",
    "servicios": {
        "obtener_matriculas": "http://test.local.agetic.gob.bo/kong/fake/fundempresa/v1/nit/",
        "info_matricula": "http://test.local.agetic.gob.bo/kong/fake/fundempresa/v1/matriculas/",
        "buscar_representante": "http://test.local.agetic.gob.bo/kong/fake/fundempresa/v1/matriculas/{num_matricula}/representantes/"
    }
}
```


#### Configuración del entorno
Existen tres entornos: development, test y production. Para esta versión son utilizados los dos primeros. Para configurar cada uno de ellos es necesario realizar una acción similar a la configuración anterior. Para ello se cuentan con los siguientes archivos de ejemplo `src/libs/config.development.js.sample` y `src/libs/config.test.js.sample`. Ambos deben ser copiados en dos nuevos archivos de la siguiente manera:

```
$ cp src/config/config.development.js.sample src/config/config.development.js
$ cp src/config/config.test.js.sample src/config/config.test.js
```
Luego editar cada archivo. Primero con el archivo de configuración del entorno development:
```
$ nano src/config/config.development.js
```
Reemplazar con los valores necesarios en: database, username, y password y demás variables de configuración.

> **Deben mantenerse con los valores que ya se encuentran establecidos para los ambientes de TEST y DESARROLLO.**

`**NO OLVIDE REVISAR EL CONTENIDO DEL ARCHIVO!**`


Posteriormente, se realiza una acción idéntica pero con el archivo de configuración del entorno de test. Si esta acción no se realiza, los test no podrán ser ejecutados:
```
$ nano src/config/config.test.js
```

Para el entorno de producción, se realiza una acción idéntica pero con el archivo de configuración del entorno de producción:
```
$ cp src/config/config.production.js.sample src/config/config.production.js
$ nano src/config/config.production.js
```

Reemplazar con los valores necesarios en: database, username, y password y demás variables de configuración.

`**NO OLVIDE REVISAR EL CONTENIDO DEL ARCHIVO!**`
> **Cambiar la configuración por los valores propios de producción.**

Para modificar el acceso (proteccion via CORS)

- `src/libs/middlewares.js`

##### **`Sólo para ambiente de producción`**

Para configurar el ambiente de producción de forma global en la máquina en donde se vaya a instalar la aplicación es necesario ejecutar el siguiente comando en la consola:
```sh
$ export NODE_ENV=production
```

## Iniciar la aplicación

Las opciones de ejecución son las siguientes:

- Genera o regenera las tablas necesarias en la base de datos y ejecuta los seeders y migrations.
```
$ npm run setup
```
#### `**Es decir se regenerá la base de datos, este comando debería ser ejecutado sólo una vez  en el ambiente de producción, al instalar la aplicación. Si se ejecuta nuevamente y el sistema ya estaba en uso se perderán todos los datos.**`

- Levanta el sistema en modo developer, se reinicia en cada cambio realizado en los archivos.
```
$ npm run startdev
```

- Levanta el sistema.
```
$ npm start
```

- Ejecuta el sistema y las pruebas unitarias y/o de integración en su propia base de datos de acuerdo a configuración.
```
$ npm test
```

- Ejecuta el eslint para verificar el estandar de programacion, actualmente esta basado en: `https://github.com/airbnb/javascript`
```
$ npm run lint
```

- Genera el apidoc del apirest y se lo encuentra en la carpeta public.
```
$ npm run apidoc
```


**Para ejecutar los seeders y las migraciones, ejecutar el siguiente comando, en el path del proyecto:**

Si se está iniciando la aplicacón por `primera vez` o si se necesita regenerar la base de datos ejecutar:

```sh
$ npm run setup
```
Esto realizará las siguientes acciones:
- Regenerar la base de datos (lo que significa que eliminará todos los datos que antes pudieron haber existido)

- Ejecutar los seeders

- Ejecutar las migraciones


Para iniciar la aplicación, ejecutar:
```sh
$ npm start
```

**RAM**

NodeJS por defecto utiliza 1.76GB en máquinas de 64 bits, para aumentar este parámetro es necesario utilizar el siguiente comando: "--max_old_space_size=<size>".

Para hacer esto, se debe modificar el archivo package.json, en la opción **start**, línea 7 aproximadamente, por ejemplo para utilizar 4GB de RAM cambiar por:

```sh
...
...
  "scripts": {
    "start": "babel-node --max_old_space_size=4096 index.js",
    ...
  }
...
...
```
Referencia:
> http://prestonparry.com/articles/IncreaseNodeJSMemorySize/

## Configuración de supervisor
Si se desea hacer correr la aplicación mediante `supervisor` se debe realizar la siguiente configuración:

Navegar hasta la ruta:
```sh
$ cd /etc/supervisor/conf.d/
```
Crear un archivo para hacer correr la aplicación de backend, en este ejemplo, se definirá el archivo bajo el nombre de `marcapaisBackendDEV`:
```sh
$ sudo touch marcapaisBackendDEV.conf
```
Y colocar el siguiente contenido:

##### Ambiente de desarrollo

```sh
[program:marcapaisBackendDEV]
command=/home/usuario/.nvm/versions/node/v6.9.0/bin/npm start
directory=/home/usuario/proyectos/marcapais/DEV/mincomunicacion-marca_pais-backend
autostart=true
autorestart=true
stderr_logfile=/var/log/marcapaisBackendDEV.err.log
stdout_logfile=/var/log/marcapaisBackendDEV.out.log
user=usuario
```

##### Ambiente de producción

```sh
[program:marcapaisBackendDEV]
command=/home/usuario/.nvm/versions/node/v6.9.0/bin/npm start
directory=/home/usuario/proyectos/marcapais/DEV/mincomunicacion-marca_pais-backend
autostart=true
autorestart=true
environment=NODE_ENV=production
stderr_logfile=/var/log/marcapaisBackendDEV.err.log
stdout_logfile=/var/log/marcapaisBackendDEV.out.log
user=usuario
```

Considerar que el nombre del usuario del equipo puede variar.
Considerar que la ruta real en la que se encuentra la aplicación puede variar.
Considerar que de acuerdo a la versión de node la la ruta de npm puede variar.



### Reiniciar "supervisor"
Cuando se hagan cambios y se requiere reiniciar el servicio "supervisor" para que se ejecute la aplicación:
```sh
$ sudo /etc/init.d/supervisor restart
```
Para verificar que la aplicación este efectivamente corriendo, se puede ejecutar el siguiente comando, y verificar que la aplicación este corriendo en el puerto configurado:
```sh
$ netstat -ltpn

Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      -               
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -               
tcp        0      0 0.0.0.0:5432            0.0.0.0:*               LISTEN      -               
tcp6       0      0 :::4000                 :::*                    LISTEN      32274/nodejs
tcp6       0      0 :::3000                 :::*                    LISTEN      4381/gulp
```

Ó se puede revisar las tareas del `supervisor`, buscar el nombre de la tarea y su respectivo estado:
```sh
$ sudo supervisorctl

marcapaisBackendDEV                   RUNNING    pid 4617, uptime 3 days, 21:41:05
marcapaisFrontendDEV                  RUNNING    pid 4380, uptime 3 days, 21:41:36
```
