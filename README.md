# Agenda-React
<img width="1561" height="696" alt="Captura de pantalla 2026-11-03 193950" src="https://github.com/user-attachments/assets/a743c8e5-3062-4c21-a61c-e4df4d1fcd94" />
Aplicación web desarrollada con React para la gestión de contactos telefónicos, correspondiente a la Tarea 4. Permite consultar y registrar contactos consumiendo una API externa mediante peticiones HTTP asíncronas.

Arquitectura de Componentes

La aplicación está modularizada en tres componentes principales:

App (Componente Padre): Gestiona el estado global de la aplicación (lista de contactos, estados de carga y notificaciones) y coordina la sincronización con la API remota.
FormularioContacto: Componente encargado de capturar y validar los datos de los nuevos contactos (nombre, apellido y teléfono) para su posterior registro.
ListaContactos: Componente responsable de renderizar el listado de contactos registrados, incorporando búsqueda en tiempo real y paginación.
Tecnologías Utilizadas
React
JavaScript (ES6+)
CSS3
Vite
API REST (GET y POST)
Instrucciones de Ejecución
Clonar o descargar el repositorio.
Instalar las dependencias del proyecto:
bash
npm install
Iniciar el servidor de desarrollo:
bash
npm run dev

Adicionalmente, se incluye el archivo agenda-standalone.html, el cual permite abrir y probar la aplicación directamente en cualquier navegador web sin requerir pasos de compilación ni dependencias locales.
