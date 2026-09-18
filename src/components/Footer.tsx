import logo from '../assets/images/logo.svg';
import './Footer.css';

// No API key required for this basic embed (Google Maps "no-key" embed via
// the /maps?output=embed endpoint). If you have a Google Maps Embed API key
// and want richer styling/markers, swap MAP_EMBED_SRC for:
//   https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=<address or lat,lng>
// See the README in this project for step-by-step instructions.
const MAP_QUERY = 'Cafeter%C3%ADa%20Strati';
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.5 9.2v5.6l5-2.8-5-2.8Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M13.5 21v-6.5h2.2l.3-2.6h-2.5V10.2c0-.75.2-1.26 1.28-1.26h1.37V6.6c-.24-.03-1.05-.1-2-.1-1.98 0-3.33 1.2-3.33 3.42v1.9H8.5v2.6h2.27V21"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img src={logo} alt="Strati" className="footer__logo" />
          <div className="footer__socials" aria-label="Redes sociales">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="footer__social-btn"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__map">
          <iframe
            title="Ubicación de Strati en el mapa"
            src={MAP_EMBED_SRC}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Strati Café. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
