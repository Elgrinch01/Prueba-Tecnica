# Panel administrativo de e-commerce

Aplicación React + Vite para administrar inventario de productos con autenticación simulada, rutas protegidas, listado desde MockAPI y CRUD básico.

## Funcionalidades

- Login mock con almacenamiento en `localStorage`.
- Rutas protegidas para el panel.
- Listado de productos desde MockAPI.
- Búsqueda por nombre o categoría.
- Crear, editar y eliminar productos.
- Confirmación de borrado con SweetAlert2.
- Estados de carga y error.

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

## Flujo de uso

1. Abre la app en el navegador.
2. Ingresa cualquier nombre de usuario y cualquier PIN.
3. Revisa el inventario.
4. Usa el formulario para crear o editar productos.
5. Elimina productos con confirmación.

## Despliegue

### Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Usa el comando de build: `npm run build`.
4. Usa el directorio de salida: `dist`.
5. No agregues variables de entorno; no son necesarias.

### Netlify

1. Sube el proyecto a GitHub.
2. Conecta el repositorio en Netlify.
3. Usa el comando de build: `npm run build`.
4. Publica la carpeta `dist`.
5. Verifica que la ruta base funcione en producción.

## Estructura principal

- `src/pages/LoginPage.jsx`
- `src/pages/ProductsPage.jsx`
- `src/services/api.js`
- `src/routes/ProtectedRoute.jsx`
- `src/layouts/DashboardLayout.jsx`
- `src/auth/storage.js`

## Notas

- El login es simulado y usa `localStorage`.
- Los campos numéricos se normalizan antes de mostrar o guardar.
- La experiencia visual está pensada para escritorio y móvil.
