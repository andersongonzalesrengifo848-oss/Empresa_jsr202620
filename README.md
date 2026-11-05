# SistemaN

Sistema de gestión para un taller o negocio de servicios, diseñado para centralizar la atención al cliente, la recepción de vehículos, el control del taller, el inventario y la administración de usuarios.

## Descripción

Esta aplicación web permite gestionar procesos clave de un taller de servicios, incluyendo:

- Dashboard general con indicadores y accesos rápidos
- Recepción de vehículos y tickets
- Seguimiento de trabajos en taller
- Portal para clientes con seguimiento de estado
- Gestión de garantías y autorizaciones
- Control de inventario y repuestos
- Reportes y estadísticas
- Administración de usuarios y configuración del sistema

La aplicación está desarrollada con JavaScript puro y utiliza Vite como entorno de desarrollo y compilación.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES Modules
- Vite
- Three.js
- jsPDF
- QRCode
- Lucide icons

## Estructura del proyecto

```text
SistemaN/
├── index.html
├── package.json
├── src/
│   ├── main.js
│   ├── components/
│   ├── modules/
│   ├── services/
│   └── styles/
└── README.md
```

### Carpetas principales

- `src/components`: componentes reutilizables de la interfaz
- `src/modules`: módulos principales del sistema
- `src/services`: lógica de autenticación, almacenamiento y utilidades
- `src/styles`: estilos globales de la aplicación

## Requisitos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js v18 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
```

Esto levantará la aplicación en el puerto por defecto de Vite, normalmente:

```text
http://localhost:5173
```

## Compilación para producción

```bash
npm run build
```

## Uso

Al iniciar la aplicación, el sistema usa datos simulados para autenticación y almacenamiento local. Puedes acceder al flujo principal del sistema desde la vista de login y luego navegar entre los distintos módulos disponibles en la barra de navegación.

## Nota

Este proyecto parece estar orientado a una demo o prototipo funcional de gestión de taller/servicios, con datos mock y lógica frontend sin backend real.

## Autor

Proyecto desarrollado para un sistema de gestión de servicios y taller.
