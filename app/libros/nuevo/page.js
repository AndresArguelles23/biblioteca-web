import BookForm from '@/components/BookForm';
import { addBook } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default function NuevoLibroPage() {
  return (
    <>
      <a href="/" className="back-link">
        ← Volver al inventario
      </a>
      <h2 style={{ marginBottom: 16 }}>Agregar libro</h2>
      <BookForm action={addBook} submitLabel="Guardar libro" />
    </>
  );
}
