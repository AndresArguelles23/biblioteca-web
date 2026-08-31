export default function BookForm({ action, book, submitLabel }) {
  const b = book || {};
  return (
    <form action={action} className="form-card">
      <div className="form-grid">
        <div>
          <label htmlFor="clase">Clase (código)</label>
          <input id="clase" name="clase" defaultValue={b.clase || ''} placeholder="14-09-01" />
        </div>
        <div>
          <label htmlFor="categoria">Categoría</label>
          <input id="categoria" name="categoria" defaultValue={b.categoria || ''} placeholder="Ej. Artes y Bellas Artes" />
        </div>
        <div className="full">
          <label htmlFor="subcategoria">Subcategoría</label>
          <input id="subcategoria" name="subcategoria" defaultValue={b.subcategoria || ''} />
        </div>
        <div className="full">
          <label htmlFor="titulo">Título</label>
          <input id="titulo" name="titulo" defaultValue={b.titulo || ''} required />
        </div>
        <div>
          <label htmlFor="autor">Autor</label>
          <input id="autor" name="autor" defaultValue={b.autor || ''} placeholder="Apellido, Nombre" />
        </div>
        <div>
          <label htmlFor="ilustrador">Ilustrador</label>
          <input id="ilustrador" name="ilustrador" defaultValue={b.ilustrador || ''} />
        </div>
        <div>
          <label htmlFor="edicion">Edición</label>
          <input id="edicion" name="edicion" type="number" defaultValue={b.edicion ?? ''} />
        </div>
        <div>
          <label htmlFor="anio">Año</label>
          <input id="anio" name="anio" type="number" defaultValue={b.anio ?? ''} />
        </div>
        <div>
          <label htmlFor="ciudad">Ciudad</label>
          <input id="ciudad" name="ciudad" defaultValue={b.ciudad || ''} />
        </div>
        <div>
          <label htmlFor="editorial">Editorial</label>
          <input id="editorial" name="editorial" defaultValue={b.editorial || ''} />
        </div>
        <div>
          <label htmlFor="pagina">Páginas</label>
          <input id="pagina" name="pagina" type="number" defaultValue={b.pagina ?? ''} />
        </div>
        <div>
          <label htmlFor="isbn">ISBN</label>
          <input id="isbn" name="isbn" defaultValue={b.isbn || ''} />
        </div>
        <div>
          <label htmlFor="cantidad">Cantidad</label>
          <input id="cantidad" name="cantidad" type="number" min="0" defaultValue={b.cantidad ?? 1} />
        </div>
        <div>
          <label htmlFor="ubicacion">Ubicación</label>
          <input id="ubicacion" name="ubicacion" defaultValue={b.ubicacion || 'Biblioteca'} />
        </div>
        <div className="full">
          <label>Estado del ejemplar</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="estado" value="B" defaultChecked={b.estado === 'B' || !b.estado} /> Bueno
            </label>
            <label>
              <input type="radio" name="estado" value="R" defaultChecked={b.estado === 'R'} /> Regular
            </label>
            <label>
              <input type="radio" name="estado" value="M" defaultChecked={b.estado === 'M'} /> Malo
            </label>
          </div>
        </div>
        <div className="full">
          <label htmlFor="notas_revision">Notas de revisión (opcional)</label>
          <input id="notas_revision" name="notas_revision" defaultValue={b.notas_revision || ''} />
        </div>
        <div className="full">
          <label htmlFor="texto_original">Texto original / descripción completa</label>
          <textarea id="texto_original" name="texto_original" defaultValue={b.texto_original || ''} />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {submitLabel || 'Guardar'}
        </button>
        <a href="/" style={{ fontSize: '0.88rem' }}>
          Cancelar
        </a>
      </div>
    </form>
  );
}
