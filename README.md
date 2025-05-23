# WP TLDraw Editor

Este proyecto es un editor simple creado con TLDraw, Next.js, TailwindCSS, Shadcn y tRPC.

## Requisitos

-   Node.js v23 o superior
-   Yarn

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/wilodev/wp-tldraw-editor.git
cd wp-tldraw-editor
```

2. Instala las dependencias:

```bash
yarn install
```

3. Inicia el servidor de desarrollo:

```bash
yarn dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Características

-   Editor TLDraw integrado
-   API tRPC tipo-segura para guardar y recuperar datos
-   Botón para modificar una forma
-   Interfaz de usuario con Shadcn y TailwindCSS

## API Endpoints

-   `GET /api/trpc/editor.getData` - Obtiene los datos del editor
-   `POST /api/trpc/editor.updateData` - Actualiza los datos del editor
-   `POST /api/trpc/editor.modifyShape` - Modifica una forma específica

## Estructura del proyecto

-   `/src/app` - Rutas y páginas de Next.js
-   `/src/app/components` - Componentes React
-   `/src/app/server` - Lógica del servidor y endpoints tRPC
-   `/src/app/utils` - Utilidades y configuraciones
