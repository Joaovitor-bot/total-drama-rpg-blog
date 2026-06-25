import { Link } from "react-router-dom";
import FavoritePoll from "./FavoritePoll";

function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-grid hero-with-poll">
        <div className="hero-copy hero-copy-with-image">
          <p className="eyebrow">Blog oficial da temporada</p>

          <div className="hero-main-image">
            <img
              src="/season1-capa.png"
              alt="Total Drama RPG - Season 1"
            />
          </div>

          <p className="hero-text">
            Notícias, participantes, enquetes, eliminações e todos os barracos
            do acampamento em um portal mais bonito, moderno e organizado.
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

        <FavoritePoll />
      </div>
    </section>
  );
}

export default Hero;