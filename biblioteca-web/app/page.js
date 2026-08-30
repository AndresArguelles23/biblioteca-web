import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 30;

async function getCategorias() {
  const { data } = await supabase.from('libros').select('categoria');
  const set = new Set((data || []).map((r) => r.categoria).filter(Boolean));
  return Array.from(set).sort();
}

async function getLibros(params) {
  const page = Math.max(parseInt(params.page || '1', 10), 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase.from('libros').select('*', { count: 'exact' });

  if (params.q) {
    const q = params.q.trim();
    query = query.or(
      `titulo.ilike.%${q}%,autor.ilike.%${q}%,clase.ilike.%${q}%,isbn.ilike.%${q}%`
    );
  }
  if (params.categoria) {
    query = query.eq('categoria', params.categoria);
  }
  if (params.estado) {
    query = query.eq('estado', params.estado);
  }
  if (params.revisar === '1') {
    query = query.eq('revisar', true);
  }

  query = query.order('clase', { ascending: true }).range(from, to);

  const { data, count, error } = await query;
  return { data: data || [], count: count || 0, page, error };
}

function qs(params, overrides) {
  const merged = { ...params, ...overrides };
  const usp = new URLSearchParams();
  Object.entries(merged).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') usp.set(k, v);
  });
  const s = usp.toString();
  return s ? `/?${s}` : '/';
}

export default async function HomePage({ searchParams }) {
  const params = searchParams || {};
  const [categorias, { data: libros, count, page, error }] = await Promise.all([
    getCategorias(),
    getLibros(params),
  ]);

  const totalPages = Math.max(Math.ceil(count / PAGE_SIZE), 1);

  return (
    <>
      <form className="filters" method="GET">
        <div className="field" style={{ flex: '1 1 220px' }}>
          <label htmlFor="q">Buscar</label>
          <input
            id="q"
            name="q"
            placeholder="Título, autor, clase o ISBN..."
            defaultValue={params.q || ''}
          />
        </div>
        <div className="field">
          <label htmlFor="categoria">Categoría</label>
          <select id="categoria" name="categoria" defaultValue={params.categoria || ''}>
            <option value="">Todas</option>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="estado">Estado</label>
          <select id="estado" name="estado" defaultValue={params.estado || ''}>
            <option value="">Todos</option>
            <option value="B">Bueno</option>
            <option value="R">Regular</option>
            <option value="M">Malo</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="revisar">
            <input
              type="checkbox"
              id="revisar"
              name="revisar"
              value="1"
              defaultChecked={params.revisar === '1'}
              style={{ marginRight: 6 }}
            />
            Solo pendientes de revisar
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>

      <div className="summary-bar">
        <span>
          {count} {count === 1 ? 'libro encontrado' : 'libros encontrados'}
        </span>
        {(params.q || params.categoria || params.estado || params.revisar) && (
          <a href="/">Limpiar filtros</a>
        )}
      </div>

      {error && <p className="notas">Error consultando la base de datos: {error.message}</p>}

      {libros.length === 0 && !error ? (
        <div className="empty-state">
          <p>No hay libros que coincidan con esta búsqueda.</p>
          <a href="/libros/nuevo" className="btn btn-primary" style={{ marginTop: 10 }}>
            + Agregar el primer libro
          </a>
        </div>
      ) : (
        <div className="book-list">
          {libros.map((libro) => (
            <a href={`/libros/${libro.id}`} className="book-row" key={libro.id}>
              <span className="spine mono">{libro.clase || '—'}</span>
              <div className="book-main">
                <div className="titulo">{libro.titulo || '(sin título)'}</div>
                <div className="meta">
                  {libro.autor || 'Autor desconocido'}
                  {libro.anio && <span className="sep">·</span>}
                  {libro.anio}
                  {libro.categoria && <span className="sep">·</span>}
                  {libro.categoria}
                </div>
              </div>
              <div className="badges">
                {libro.estado && (
                  <span className={`badge badge-${libro.estado}`}>{libro.estado}</span>
                )}
                {libro.revisar && <span className="badge badge-revisar">Revisar</span>}
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="pagination">
        <a
          href={qs(params, { page: page - 1 })}
          className={page <= 1 ? 'disabled' : ''}
        >
          ← Anterior
        </a>
        <span>
          Página {page} de {totalPages}
        </span>
        <a
          href={qs(params, { page: page + 1 })}
          className={page >= totalPages ? 'disabled' : ''}
        >
          Siguiente →
        </a>
      </div>
    </>
  );
}
