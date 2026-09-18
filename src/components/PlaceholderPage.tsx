import { Link } from 'react-router-dom';
import './PlaceholderPage.css';

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
}

// Generic empty page. All the "Comprar ahora" / nav buttons that don't have
// real content yet land here with a different title. Build out the real
// page content in the specific route file when it's ready.
export default function PlaceholderPage({ title, subtitle }: PlaceholderPageProps) {
  return (
    <div className="placeholder">
      <Link to="/" className="placeholder__back">
        &larr; Volver al inicio
      </Link>
      <h1>{title}</h1>
      <p>{subtitle ?? 'Esta página todavía no tiene contenido.'}</p>
    </div>
  );
}
