import { Source_Serif_4, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const display = Source_Serif_4({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'Biblioteca Normal Superior Santa Clara Almaguer',
  description: 'Inventario del material bibliográfico de la biblioteca escolar.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <header className="site-header">
          <div>
            <h1>
              <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>
                📚 Biblioteca Escolar
              </a>
            </h1>
            <div className="subtitle">Normal Superior Santa Clara Almaguer</div>
          </div>
          <a href="/libros/nuevo" className="btn btn-outline">
            + Agregar libro
          </a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
