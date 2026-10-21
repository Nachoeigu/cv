# CV · Ignacio Eiguren

Sitio de una sola página (CV interactivo) con Vite + React + TypeScript y Recharts.

## Comandos

```bash
npm run dev     # dev server en 0.0.0.0:5173
npm run build   # tsc --noEmit && vite build  → dist/
npm run preview # sirve dist/
```

## Arquitectura

- `src/data.ts` — **única fuente de contenido**, en dos idiomas: `content.en` y `content.es` (tipo `Site`). Cada uno tiene `profile`, `ui` (títulos, botones, aria-labels), `toolGroups`, `jobs`, `projects`, `education`, `certs`, `treemap`, `focus` y `radar`. Para cambiar textos, editar sólo este archivo — **siempre en los dos idiomas**.
- Idioma: `App.tsx` guarda `lang` (`"en" | "es"`), lo persiste en `localStorage["cv-lang"]`, actualiza `document.documentElement.lang` y `document.title`, y lo cambia con el switch EN/ES del header. El default es `en`.
- `src/App.tsx` — layout bento + modales (Experience / Projects / Education / Certifications). El modal de experiencia colapsa los bullets (3 en el trabajo destacado, 2 en el resto) con un botón "+N more" por trabajo, y muestra chips de `job.tech`.
- `src/styles.css` — tema oscuro con acento dorado (`--gold`). Grid de 12 columnas; `.c5/.c6/.c7` son los anchos de panel. La foto tiene `aspect-ratio:4/5` fijo: sin eso la columna se estira a la altura del panel y `object-fit:cover` hace zoom sobre la cara.
- `public/photo.png` — foto de perfil; `public/favicon.svg` — ícono del sitio.
- Fuentes: `@fontsource/*` importadas en `src/main.tsx` (nada por CDN, así funciona offline y en la preview).

## Convenciones

- Las etiquetas de las celdas del treemap (`Cell`) nunca se cortan con "…": se achica la fuente y, si no entra, se usa la primera palabra; si tampoco entra, no se dibuja etiqueta (el `<title>` da el nombre completo al hover).
- Los `[X%]` / `[N]` en `data.ts` son placeholders a completar con números reales.

## Verificación

`npm run build` debe pasar. Para revisar la UI, usar Playwright contra `http://localhost:5173` (desktop 1280 y móvil 390).
