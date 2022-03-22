## Descripción

API de mensajería con gestión de contactos y mensajes. El repo está [aquí](https://github.com/borj4/mcfly-nestjs.git).

## Instalación

```bash
$ git clone https://github.com/borj4/mcfly-nestjs.git
$ npm install
```

## Prerrequisitos

```bash
# lanzar mongodb en la terminal de linux
$ systemctl stop mongod.service
```
## Lanzar la API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Observaciones

En la raíz del repositorio se encuentra la colección de postsman, o bien [aquí](mcfly-nestjs.postman_collection.json).

Hay que precisar que se ha prescindido deliberadamente de proteger variables de entorno para facilitar su manejo.

Para generar el token, primero hay que crear un usuario. Posteriormente haremos login y retornará un token que hay que utilizar para consultar el resto de los endpoints.

Happy coding!