# Backend de Administracion

## Configurar servidor

En esta sección se explicarán los pasos antes de iniciar el servicidor

- [Crear base de datos](#crear-base-de-datos)
- [Configurar las variables de entorno](#configurar-las-variables-de-entorno)
- [Instalar dependencias](#instalar-dependencias)
- [Ejecutar las migraciones](#ejecutar-las-migraciones)

### Crear base de datos

Antes de iniciar el servidor se deberá crear la base de datos en el motor PostgreSQL.

### Configurar las variables de entorno

Para configurar nuestras variables de entorno, debemos seguir los siguientes pasos:

- Debemos crear un archivo **.env**
- Copiamos las variables y las colocamos en el archivo **.example.env**
- Debemos rellenar las variables con nuestros datos

Nos debería quedar algo parecido a esto:

```
SERVER_PORT=3000

DB_PORT=5432
DB_HOST=localhost
DB_USER=postgres
DB_PASS=postgres
DB_NAME=emails

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
```

### Instalar dependencias

La aplicación funciona con una serie de dependencias, las cuales deberemos instalar con el siguiente comando:

```
pnpm install
```

### Ejecutar las migraciones

Las migraciones nos crearan las tablas de nuestra base de datos. Solo deberemos ejecutarlas con uno de los siguientes comandos.

```
pnpm migration:run
```

**_NOTA: Estos comandos solo funcionaran si es que se usan el motor de base de datos PostgreSQL y la librería [TypeORM](https://typeorm.io/), es posible que falle si reemplazo alguno_**

# Encender el servidor

Después de configurar nuestro servidor, podemos encenderlo con el siguiente comando

```
pnpm dev
```
