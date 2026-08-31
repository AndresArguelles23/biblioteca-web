import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 30;

// Solo las columnas que la lista realmente muestra: la consulta viaja más
// liviana y la página carga más rápido (antes traía también la descripción
// completa de cada libro aunque no se usara en esta vista).
const LIST_COLUMNS = 'id,clase,titulo,autor,anio,categoria,estado,revisar';

async function getCategorias() {
  const { data } = await supabase.from('libros').select('categoria');
  const set = new Set((data || []).map((r) => r.categoria).filter(Boolean));
  return Array.from(set).sort();
}

async function getStats() {
  const [{ count: total }, { count: revisar }] = await Promise.all([
    supabase.from('libros').select('id', { count: 'exact', head: true }),
    supabase.from('libros').select('id', { count: 'exact', head: true }).eq('revisar', true),
  ]);
  return { total: total || 0, revisar: revisar || 0 };
}

async function getLibros(params) {
  const page = Math.max(parseInt(params.page || '1', 10), 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase.from('libros').select(LIST_COLUMNS, { count: 'exact' });

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

const ESTADO_LABEL = { B: 'Bueno', R: 'Regular', M: 'Malo' };

export default async function HomePage({ searchParams }) {
  const params = searchParams || {};
  const [categorias, stats, { data: libros, count, page, error }] = await Promise.all([
    getCategorias(),
    getStats(),
    getLibros(params),
  ]);

  const totalPages = Math.max(Math.ceil(count / PAGE_SIZE), 1);
  const hasFilters = params.q || params.categoria || params.estado || params.revisar;

  return (
    <>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{stats.total.toLocaleString('es-CO')}</div>
          <div className="stat-label">Libros en el inventario</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{categorias.length}</div>
          <div className="stat-label">Categorías</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.revisar.toLocaleString('es-CO')}</div>
          <div className="stat-label">Pendientes de revisar</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{count.toLocaleString('es-CO')}</div>
          <div className="stat-label">Resultados de esta búsqueda</div>
        </div>
      </div>

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
        <label className="check-field" htmlFor="revisar">
          <input
            type="checkbox"
            id="revisar"
            name="revisar"
            value="1"
            defaultChecked={params.revisar === '1'}
          />
          Solo pendientes de revisar
        </label>
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>

      <div className="summary-bar">
        <span>
          {count} {count === 1 ? 'libro encontrado' : 'libros encontrados'}
        </span>
        {hasFilters && <a href="/">Limpiar filtros</a>}
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
        <div className="book-table-wrap">
          <table className="book-table">
            <thead>
              <tr>
                <th style={{ width: 110 }}>Clase</th>
                <th>Título</th>
                <th style={{ width: 160 }}>Categoría</th>
                <th style={{ width: 70 }}>Año</th>
                <th style={{ width: 140 }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {libros.map((libro) => (
                <tr key={libro.id} className="row-link">
                  <td data-label="Clase">
                    <a className="row-anchor" href={`/libros/${libro.id}`}>
                      <span className="clase-badge mono">{libro.clase || '—'}</span>
                    </a>
                  </td>
                  <td data-label="Título">
                    <a className="row-anchor" href={`/libros/${libro.id}`}>
                      <div className="td-titulo">{libro.titulo || '(sin título)'}</div>
                      <div className="td-sub">{libro.autor || 'Autor desconocido'}</div>
                    </a>
                  </td>
                  <td data-label="Categoría">
                    <a className="row-anchor" href={`/libros/${libro.id}`}>
                      {libro.categoria || '—'}
                    </a>
                  </td>
                  <td data-label="Año">
                    <a className="row-anchor" href={`/libros/${libro.id}`}>
                      {libro.anio || '—'}
                    </a>
                  </td>
                  <td data-label="Estado">
                    <a className="row-anchor" href={`/libros/${libro.id}`}>
                      <div className="badges">
                        {libro.estado && (
                          <span className={`badge badge-${libro.estado}`}>
                            {ESTADO_LABEL[libro.estado] || libro.estado}
                          </span>
                        )}
                        {libro.revisar && <span className="badge badge-revisar">Revisar</span>}
                      </div>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pagination">
        <a href={qs(params, { page: page - 1 })} className={page <= 1 ? 'disabled' : ''}>
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
