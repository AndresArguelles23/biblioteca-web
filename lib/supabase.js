import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  // Esto solo aparece si faltan las variables de entorno en Vercel/local.
  console.warn(
    'Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
    'Revisa el archivo .env.local o las variables de entorno en Vercel.'
  );
}

// Se usan valores de respaldo solo para que el proceso de "build" no truene
// si las variables aún no están configuradas. Si faltan de verdad, las
// páginas fallarán al pedir datos en tiempo real (no durante el build),
// con un mensaje claro en pantalla en vez de tumbar todo el despliegue.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-key'
);
