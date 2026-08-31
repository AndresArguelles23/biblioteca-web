import { Manrope, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const display = Manrope({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
});

const body = Inter({
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
  title: 'Biblioteca Escolar — Normal Superior Santa Clara Almaguer',
  description: 'Inventario del material bibliográfico de la biblioteca escolar.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <header className="site-header">
          <a href="/" style={{ textDecoration: 'none' }}>
            <div className="brand-mark">
              <div className="brand-icon">BE</div>
              <div>
                <h1>Biblioteca Escolar</h1>
                <div className="subtitle">Normal Superior Santa Clara Almaguer</div>
              </div>
            </div>
          </a>
          <a href="/libros/nuevo" className="btn btn-primary">
            + Agregar libro
          </a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
