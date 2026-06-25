import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { participantes } from "../data";

function Eliminated() {
  const eliminados = participantes
    .filter(
      (participante) =>
        participante.status?.toLowerCase() === "eliminado"
    )
    .sort((a, b) => {
      const ordemA = a.ordemEliminacao || 999;
      const ordemB = b.ordemEliminacao || 999;

      return ordemA - ordemB;
    });

  return (
    <>
      <Navbar />

      <main className="page eliminated-page">
        <div className="page-header">
          <p className="eyebrow">Fora do jogo</p>
          <h1>Eliminados</h1>

          <p className="page-description">
            Confira quem deixou a competição.
          </p>
        </div>

        {eliminados.length === 0 && (
          <div className="empty-state eliminated-empty">
            <div>🔥</div>
            <h2>Ninguém foi eliminado ainda</h2>
            <p>
              Quando alguém sair da competição, aparecerá aqui automaticamente.
            </p>
          </div>
        )}

        {eliminados.length > 0 && (
          <section className="eliminated-simple-grid">
            {eliminados.map((participante) => (
              <article className="eliminated-simple-card" key={participante.id}>
                <div className="eliminated-simple-image">
                  <img src={participante.imagem} alt={participante.nome} />
                </div>

                <div className="eliminated-simple-info">
                  <span className="status-pill status-eliminated">
                    Eliminado
                  </span>

                  <h2>{participante.nome}</h2>

                  <strong className="eliminated-position">
                    {participante.posicao || "Posição não informada"}
                  </strong>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Eliminated;