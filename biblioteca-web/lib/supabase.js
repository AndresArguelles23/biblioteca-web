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

export const supabase = createClient(url, key);
