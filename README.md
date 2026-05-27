# Panel administrativo de e-commerce

Aplicación React + Vite para administrar inventario de productos con autenticación simulada, rutas protegidas, listado desde MockAPI y CRUD básico.

## Stack

- React 19
- Vite
- React Router DOM
- SweetAlert2
- CSS personalizado
- MockAPI

## Requisitos

- Node.js 18 o superior.
- npm.

## Instalación

```bash
npm install
```

También puedes clonar el repositorio localmente antes de instalar dependencias:

```bash
git clone https://github.com/Elgrinch01/Prueba-Tecnica.git
cd Prueba-Tecnica
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview del build

```bash
npm run preview
```

## API

La app consume este endpoint:

```text
https://69bbf31e0915748735babfd6.mockapi.io/Producto
```

No se necesitan variables de entorno para este proyecto.

## Despliegue

### Netlify

1. Sube el proyecto a GitHub.
2. En Netlify, crea un nuevo sitio y conéctalo a tu repositorio de GitHub.
3. Usa el comando de build: `npm run build`.
4. Usa el directorio de publicación: `dist`.
5. No agregues variables de entorno; no son necesarias.

## Enlaces

- **Aplicación desplegada:** https://prueba-tecnica-cesde.netlify.app/
- **Repositorio:** https://github.com/Elgrinch01/Prueba-Tecnica
