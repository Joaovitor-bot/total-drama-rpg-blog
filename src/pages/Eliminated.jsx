import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { eliminated } from "../data";

function Eliminated() {
  return (
    <>
      <Navbar />
      <main className="page-shell container">
        <section className="page-title">
          <p className="eyebrow">Ordem de saída</p>
          <h1>Eliminados</h1>
          <p>
            Aqui fica o histórico de quem saiu da competição, com episódio, motivo e posição final.
          </p>
        </section>

        {eliminated.length === 0 ? (
          <section className="empty-state">
            <div>🔥</div>
            <h2>Nenhum eliminado ainda</h2>
            <p>
              A temporada acabou de começar. Quando alguém sair, coloque as informações no arquivo <code>src/data.js</code>.
            </p>
          </section>
        ) : (
          <section className="eliminated-list">
            {eliminated.map((person) => (
              <article className="eliminated-card" key={person.id}>
                <strong>{person.position}</strong>
                <div>
                  <h2>{person.name}</h2>
                  <p>{person.reason}</p>
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
