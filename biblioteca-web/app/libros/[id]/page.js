import { supabase } from '@/lib/supabase';
import BookForm from '@/components/BookForm';
import DeleteButton from '@/components/DeleteButton';
import { updateBook, deleteBook } from '@/app/actions';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function LibroPage({ params }) {
  const { id } = params;
  const { data: libro, error } = await supabase
    .from('libros')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !libro) {
    notFound();
  }

  const boundUpdate = updateBook.bind(null, id);
  const boundDelete = deleteBook.bind(null, id);

  return (
    <>
      <a href="/" className="back-link">
        ← Volver al inventario
      </a>
      <h2 style={{ marginBottom: 4 }}>Editar libro</h2>
      <p style={{ color: '#4c5346', marginBottom: 16, fontSize: '0.85rem' }}>
        Clase <span className="mono">{libro.clase}</span>
      </p>

      {libro.notas_revision && (
        <div className="notas">Pendiente de revisar: {libro.notas_revision}</div>
      )}

      <BookForm action={boundUpdate} book={libro} submitLabel="Guardar cambios" />

      <div style={{ marginTop: 18 }}>
        <DeleteButton action={boundDelete} titulo={libro.titulo} />
      </div>
    </>
  );
}
