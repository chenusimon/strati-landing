import logo from '../assets/images/logo.svg';
import instagramIcon from '../assets/images/social/instagram.png';
import youtubeIcon from '../assets/images/social/youtube.png';
import xIcon from '../assets/images/social/x.png';
import './Footer.css';

const MAP_QUERY = 'Cafeter%C3%ADa%20Strati';
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;

// Cada ícono lleva a la página principal de la red social.
const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/', icon: instagramIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/', icon: youtubeIcon },
  { name: 'X', href: 'https://x.com/', icon: xIcon },
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
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label={social.name}
              >
                <img src={social.icon} alt="" />
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
    </footer>
  );
}
