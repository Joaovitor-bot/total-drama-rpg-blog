import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { participantes } from "../data";

function Participants() {
  return (
    <>
      <Navbar />

      <main className="page">
        <h1>Participantes</h1>

        <p className="page-description">
          Conheça os 24 competidores oficiais da primeira temporada.
        </p>

        <section className="cards-grid">
          {participantes.map((participante) => (
            <article className="full-card" key={participante.id}>
              <img src={participante.imagem} alt={participante.nome} />

              <div className="card-info">
                <h2>{participante.nome}</h2>
                <p>{participante.subtitulo}</p>
                <span>{participante.status}</span>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Participants;