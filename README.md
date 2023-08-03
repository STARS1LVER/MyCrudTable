# MyCrudTable

La CRUD Table App es una aplicación que te permite ingresar datos a una tabla y realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los datos.

# Instalación
- Antes de comenzar, asegúrate de tener instalado Node.js en tu sistema.

- Clona este repositorio o descárgalo como archivo ZIP.

- Navega hasta la carpeta del proyecto.

- Instala las dependencias de Angular y Angular Material utilizando el siguiente comando:

```   npm install @angular/cli@16.2.0 @angular/material@<16.2.0-next4> > ```

- Instala el servidor JSON backend utilizando el siguiente comando:

```  npm install -g json-server  ```
# Nota
debes  crear en el package.json un script llamado backend y agregarle el siguiente comando:
``` json-server --watch data/db.json ```

# Uso
Para ejecutar la aplicación, sigue los siguientes pasos:

- Inicia el servidor JSON backend ejecutando el siguiente comando:

```  npm run backend   ```

Esto iniciará el servidor JSON en http://localhost:3000, que servirá como backend para nuestra aplicación.

- En otra terminal, inicia la aplicación Angular utilizando el siguiente comando:

```    ng serve    ```

- Este proyecto utiliza las siguientes tecnologías y bibliotecas:

Angular - Versión 16.2.0
Angular Material - Versión <16.2.0-next4>
Bootstrap - Agregar el link al index
