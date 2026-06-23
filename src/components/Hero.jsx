import { Link } from "react-router-dom";
import { seasonStats } from "../data";

function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Blog oficial da temporada</p>
          <h1>Total Drama RPG - Season 1</h1>
          <p className="hero-text">
            Notícias, participantes, enquetes, eliminações e todos os barracos do acampamento em um portal mais bonito, moderno e organizado.
          </p>

          <div className="hero-actions">
            <Link className="button primary" to="/participantes">
              Ver participantes
            </Link>
            <Link className="button ghost" to="/eliminados">
              Ver eliminações
            </Link>
          </div>
        </div>

        <aside className="hero-card" aria-label="Destaque da temporada">
          <span className="camp-tag">AO VIVO DO ACAMPAMENTO</span>
          <div className="host-card">
            <div className="host-avatar">🎤</div>
            <div>
              <h2>Amber no comando</h2>
              <p>A apresentadora está pronta para anunciar provas, tretas e reviravoltas.</p>
            </div>
          </div>

          <div className="stats-grid">
            {seasonStats.map((stat) => (
              <div className="stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;
