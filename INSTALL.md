# Instalación de la Aplicación Backen Exámen


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

postgres=# CREATE USER agetic WITH PASSWORD 'agetic';
```
Para crear la base de datos, ejecutar el siguiente comando dentro de la línea de comandos de postgres:
```sh
postgres=# CREATE DATABASE backend_db WITH OWNER agetic;
```

## Instalación de nodejs

Para instalar nodejs se necesita nvm, por favor seguir las instrucciones del siguiente link https://github.com/creationix/nvm para instalar nvm.

Una vez que tengamos instalado nvm, hacemos correr las siguientes instrucciones para instalar la versión correcta:
```sh
nvm install 8.9.0
```
Selccionamos como default la version instalada con la siguiente instrucción:

```sh
nvm alias default 8.9.0
```
## Instalación

Para instalar el proyecto:

Ingresar al directorio del proyecto descargado del correo.

###### Instalar dependencias del proyecto

Ejecutar el comando `npm install` que instalará todas las dependencias que el proyecto necesita:
```sh
$ npm install
```

## Archivos de Configuración

Crear el archivo ./config/config.js, usar el archivo ./config/config.js.sample como ejemplo.

Por ejemplo:
```
$ cp config/config.js.sample config/config.js
```
Posteriormente colocar las credenciales correspondientes de la base de datos en el ambiente correspondiente.

```
$ nano config/config.js
```

##### Configuración para seeders

Crear el archivo ./src/config/config.development.js o ./src/config/config.test.js o ./src/config/config.production.js, dependiendo del ambiente en que quiera ejecutar la aplicación.
Puede usar los archivos ./src/config/config.development.js.sample o ./src/config/config.development.js.sample o ./src/config/config.development.js.sample dependiendo del ambiente.

Por ejemplo:
```
$ cp src/config/config.development.js.sample src/config/config.development.js
```
Posteriormente, abrir el archivo y poner las credenciales de la base de datos.

```
$ nano src/config/config.development.js
```

Ejemplo de las variables que se configuran:

- username.- nombre de usuario de la base de datos
- password.- contraseña del usuario de la base de datos
- database.- nombre de la base de datos
- host.- host en el que se encuentra la base de datos
- demás variables.

## Iniciar la aplicación

Las opciones de ejecución son las siguientes:

- Genera o regenera las tablas necesarias en la base de datos y ejecuta los seeders.
```
$ npm run setup
```
#### `**Es decir se regenerá la base de datos, este comando debería ser ejecutado sólo una vez  en el ambiente de producción, al instalar la aplicación. Si se ejecuta nuevamente y el sistema ya estaba en uso se perderán todos los datos.**`

- Levanta el sistema.
```
$ npm start
```

## Configuración de supervisor
Si se desea hacer correr la aplicación mediante `supervisor` se debe realizar la siguiente configuración:

Navegar hasta la ruta:
```sh
$ cd /etc/supervisor/conf.d/
```
Crear un archivo para hacer correr la aplicación de backend, en este ejemplo, se definirá el archivo bajo el nombre de `backendDEV`:
```sh
$ sudo touch backendDEV.conf
```
Y colocar el siguiente contenido:

##### Ambiente de desarrollo

```sh
[program:backendDEV]
command=/home/usuario/.nvm/versions/node/v6.9.0/bin/npm start
directory=/home/usuario/proyectos/marcapais/DEV/mincomunicacion-marca_pais-backend
autostart=true
autorestart=true
stderr_logfile=/var/log/backendDEV.err.log
stdout_logfile=/var/log/backendDEV.out.log
user=usuario
```

##### Ambiente de producción

```sh
[program:backendDEV]
command=/home/usuario/.nvm/versions/node/v6.9.0/bin/npm start
directory=/home/usuario/proyectos/marcapais/DEV/mincomunicacion-marca_pais-backend
autostart=true
autorestart=true
environment=NODE_ENV=production
stderr_logfile=/var/log/backendDEV.err.log
stdout_logfile=/var/log/backendDEV.out.log
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

backendDEV                   RUNNING    pid 4617, uptime 3 days, 21:41:05
```
