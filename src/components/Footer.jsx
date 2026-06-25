import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-tag">Blog oficial da temporada</span>

          <h2>Total Drama RPG</h2>

          <p>
            Portal oficial da Season 1, criado para reunir notícias,
            participantes, enquetes, eliminações e todos os barracos do
            acampamento em um só lugar.
          </p>
        </div>

        <div className="footer-column">
          <strong>Navegação</strong>

          <nav className="footer-links">
            <Link to="/">Início</Link>
            <Link to="/participantes">Participantes</Link>
            <Link to="/eliminados">Eliminados</Link>
          </nav>
        </div>

        <div className="footer-column">
          <strong>Produção</strong>

          <p>
            Temporada produzida por criadores apaixonados por reality,
            estratégia, personagens caóticos e muito drama.
          </p>

          <div className="producer-links">
            <a
              href="https://kovaze.com/user/Maris"
              target="_blank"
              rel="noreferrer"
            >
              Produtor 1
            </a>

            <a
              href="https://kovaze.com/user/akaliuchis"
              target="_blank"
              rel="noreferrer"
            >
              Produtor 2
            </a>
          </div>

          <p className="footer-small">
            Season 1 • Enquetes, episódios e eliminações em atualização.
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {currentYear} Total Drama RPG — Site feito para acompanhar a
          temporada.
        </p>

        <span>🔥 O drama nunca tira folga.</span>
      </div>
    </footer>
  );
}

export default Footer;