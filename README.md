# Biblioteca Escolar — Normal Superior Santa Clara Almaguer

Aplicación web para consultar, buscar, agregar, editar y eliminar libros del
inventario de la biblioteca. Corre gratis en Vercel + Supabase (base de datos).

No necesitas instalar Linux ni pagar nada para usar esto.

---

## Paso 1 — Crear la base de datos gratis en Supabase

1. Entra a **https://supabase.com** y crea una cuenta gratis (puedes usar tu cuenta de GitHub o Google).
2. Crea un **New Project**. Elige cualquier nombre (ej. "biblioteca") y una contraseña para la base de datos (guárdala, no la necesitarás seguido pero es buena tenerla).
3. Espera 1-2 minutos mientras Supabase crea el proyecto.
4. En el menú lateral, entra a **SQL Editor** → **New query**.
5. Abre el archivo `schema.sql` que viene en esta carpeta, copia todo su contenido, pégalo ahí y dale click a **Run**. Esto crea la tabla `libros` donde vivirán todos los datos.

## Paso 2 — Importar tu inventario ya limpio

1. En el menú lateral de Supabase, entra a **Table Editor**.
2. Selecciona la tabla `libros`.
3. Haz click en el botón **Insert** → **Import data from CSV**.
4. Sube el archivo `inventario_para_supabase.csv` que viene en la carpeta `data/` de este proyecto.
5. Confirma que las columnas del CSV coincidan con las columnas de la tabla (deberían coincidir automáticamente por nombre) y dale a importar.
6. Deberías ver tus 4,481 libros ya cargados en la tabla.

## Paso 3 — Obtener las claves de conexión

1. En Supabase, ve a **Project Settings** (ícono de engranaje) → **API**.
2. Copia dos valores:
   - **Project URL**
   - **anon public key**
3. Los vas a necesitar en el Paso 5.

## Paso 4 — Subir el código a GitHub

Si nunca has usado GitHub, la forma más fácil es con **GitHub Desktop** (https://desktop.github.com), que es una aplicación con botones, sin usar la terminal:

1. Crea una cuenta gratis en **https://github.com** si no tienes una.
2. Instala GitHub Desktop y entra con tu cuenta.
3. En GitHub Desktop: **File → Add Local Repository** y selecciona esta carpeta (`biblioteca-web`).
4. Si te pide inicializar un repositorio, acepta.
5. Dale un mensaje al commit (ej. "Primera versión") y haz click en **Commit to main**.
6. Haz click en **Publish repository** (puede ser privado, no importa).

## Paso 5 — Desplegar en Vercel (gratis)

1. Entra a **https://vercel.com** y crea una cuenta gratis con tu mismo usuario de GitHub.
2. Haz click en **Add New → Project**.
3. Selecciona el repositorio `biblioteca-web` que acabas de publicar.
4. Antes de darle a "Deploy", despliega la sección **Environment Variables** y agrega:
   - `NEXT_PUBLIC_SUPABASE_URL` → pega el Project URL del Paso 3
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → pega el anon public key del Paso 3
5. Haz click en **Deploy**. En 1-2 minutos tendrás tu aplicación en una dirección tipo `https://biblioteca-web-tuusuario.vercel.app`.

¡Listo! Esa dirección ya la puedes compartir con quien necesite consultar el inventario.

---

## Uso diario de la aplicación

- **Buscar un libro:** usa la barra de búsqueda (busca por título, autor, clase o ISBN) y los filtros por categoría/estado.
- **Ver los pendientes de revisar:** marca la casilla "Solo pendientes de revisar" — son los 2,310 libros que el proceso de limpieza no pudo completar automáticamente (ver `Notas de revisión` en cada uno).
- **Agregar un libro:** botón "+ Agregar libro" arriba a la derecha.
- **Editar o eliminar un libro:** haz click sobre cualquier libro de la lista.

## Si quieres probarlo en tu computadora antes de publicarlo

Necesitas tener instalado **Node.js** (https://nodejs.org, descarga la versión LTS, instalador normal de Windows).

```
npm install
```

Copia `.env.local.example` a `.env.local` y completa con tus datos de Supabase (Paso 3). Luego:

```
npm run dev
```

Abre `http://localhost:3000` en tu navegador.

## Siguientes mejoras posibles (no incluidas todavía)

- Protección con contraseña para que solo el bibliotecario pueda editar/eliminar (los demás solo consultan).
- Exportar reportes en PDF o Excel desde la propia web.
- Código de barras / lector para préstamos.

Si quieres que agreguemos alguna de estas, dime y seguimos desde aquí.
