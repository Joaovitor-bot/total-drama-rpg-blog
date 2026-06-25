import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { participantes } from "../data";

function Participants() {
  const [participanteAberto, setParticipanteAberto] = useState(null);

  function fecharModal() {
    setParticipanteAberto(null);
  }

  useEffect(() => {
    function fecharComEsc(event) {
      if (event.key === "Escape") {
        fecharModal();
      }
    }

    window.addEventListener("keydown", fecharComEsc);

    return () => {
      window.removeEventListener("keydown", fecharComEsc);
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="page">
        <h1>Participantes</h1>

        <p className="page-description">
          Conheça os 24 competidores oficiais da primeira temporada.
        </p>

        <section className="cards-grid">
          {participantes.map((participante) => {
            const eliminado =
              participante.status?.toLowerCase() === "eliminado";

            return (
              <article
                className={`full-card ${eliminado ? "is-eliminated" : ""}`}
                key={participante.id}
              >
                <button
                  className="participant-image-button"
                  onClick={() => setParticipanteAberto(participante)}
                  aria-label={`Abrir card de ${participante.nome}`}
                >
                  <img src={participante.imagem} alt={participante.nome} />
                </button>

                <div className="card-info">
                  <h2>{participante.nome}</h2>
                  <p>{participante.subtitulo}</p>

                  <span
                    className={`status-pill ${
                      eliminado ? "status-eliminated" : "status-playing"
                    }`}
                  >
                    {eliminado ? "Eliminado" : "Em jogo"}
                  </span>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      {participanteAberto && (
        <div className="image-modal" onClick={fecharModal}>
          <button
            className="modal-close"
            onClick={fecharModal}
            aria-label="Fechar imagem"
          >
            ×
          </button>

          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={participanteAberto.imagem}
              alt={participanteAberto.nome}
            />

            <h2>{participanteAberto.nome}</h2>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Participants;