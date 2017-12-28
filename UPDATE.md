# Actualización de la SIMM-Portal Mineria (BACKEND)

## Actualización de la Aplicación

A continuación se presentan los pasos necesarios para actualizar la aplicación en PRODUCCIÓN.

## Backup de la Base de Datos

Esta instalación require:
- Realizar un backup de la base de datos en caso de que suceda cualquier excepción.

### Actualización de código fuente

Para actualizar el código fuente del repositorio ejecutar el siguiente comando:

```sh
$ git pull origin master
```

Para configurar el ambiente de producción de forma global en la máquina en donde se vaya a instalar la aplicación es necesario ejecutar el siguiente comando en la consola:
```sh
$ export NODE_ENV=production
```

Para usar node
```sh
$ nvm use 6.12.0
```
##### Ejecutar seeders

Ejecutar los seeders.

```
$ npm run seeders
```

##### Revisar el archivo config/app.json

Revisar el contenido del archivo config/app.json

##### Configuración de Servicios de Interoperabilidad

El presente sistema cuenta con los siguientes servicios de interoperabilidad:

- Servicio Web SEGIP
- Servicio Web de Impuestos Nacionales (SIN)
- Fundempresa

Favor revisar el archivo `config/app.json` para verificar si la configuración es correcta:

También revisar si los directorios están configurados correctamente y si existen.

##### **`Sólo para ambiente de producción`**

Para configurar el ambiente de producción de forma global en la máquina en donde se vaya a instalar la aplicación es necesario ejecutar el siguiente comando en la consola:
```sh
$ export NODE_ENV=production
```

## Reiniciar "supervisor" (Si ya se configuró)

Reiniciar el servicio "supervisor" para que se actualice la aplicación:
```sh
$ sudo /etc/init.d/supervisor restart
```

O reiniciar sólo el proceso correspondiente con:

```sh
$ sudo supervisorctl
> restart nombreDelProcesoBackend
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
mineria-backend                  RUNNING    pid 42943, uptime 0:03:13
```
