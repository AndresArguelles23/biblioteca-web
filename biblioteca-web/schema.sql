-- Esquema para el inventario de la biblioteca
-- Ejecuta esto en Supabase: panel del proyecto -> SQL Editor -> New query -> pega y dale "Run"

create table if not exists libros (
  id bigint generated always as identity primary key,
  categoria text,
  subcategoria text,
  clase text,
  autor text,
  titulo text,
  edicion integer,
  ciudad text,
  anio integer,
  editorial text,
  pagina integer,
  ilustrador text,
  isbn text,
  cantidad integer default 1,
  estado text check (estado in ('B','R','M')),
  ubicacion text,
  revisar boolean default false,
  notas_revision text,
  texto_original text,
  created_at timestamp with time zone default now()
);

-- Búsqueda rápida por título, autor o clase
create index if not exists libros_titulo_idx on libros using gin (to_tsvector('spanish', coalesce(titulo,'')));
create index if not exists libros_autor_idx on libros (autor);
create index if not exists libros_clase_idx on libros (clase);
create index if not exists libros_categoria_idx on libros (categoria);
