'use client';

export default function DeleteButton({ action, titulo }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        const ok = window.confirm(
          `¿Eliminar "${titulo || 'este libro'}" del inventario? Esta acción no se puede deshacer.`
        );
        if (!ok) e.preventDefault();
      }}
    >
      <button type="submit" className="btn btn-danger">
        Eliminar este libro
      </button>
    </form>
  );
}
