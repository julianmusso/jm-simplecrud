# Simple CRUD Task Manager

Este es un ejemplo de una aplicación CRUD simple para manejar tareas. La aplicación permite crear, leer, actualizar y eliminar tareas.

## Requerimientos
- Node.js (versión 12 o superior)
- MongoDB (versión 4 o superior)

## Instalación
1. Clonar este repositorio.
2. Instalar las dependencias con `npm install`.
3. Crear un archivo `.env` en la raíz del proyecto y configurar las siguientes variables de entorno:

MONGODB_URI= `Indica la URL de tu MongoDB.` Recuerda envolver la URL entre comillas.
NEXT_PUBLIC_API_URL= `Indica la URL de tu app.` Puedes utilizar `'http://localhost:3000'` para proyectos en tu máquina local.

4. Iniciar la aplicación con `npm start`.

## Uso
- Para crear una nueva tarea, ir a `/tasks/new`.
- En la pantalla de inicio `/`, se muestran todas las tareas. Se puede hacer clic en el botón "ver" para ver una tarea individualmente o en el botón "borrar" para eliminar una tarea.
- Para editar una tarea, hacer clic en el botón "ver" y luego en el botón "editar".
- Para eliminar una tarea, hacer clic en el botón "borrar" en la pantalla de inicio.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para más detalles.