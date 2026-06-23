import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { participants } from "../data";

function Participants() {
  return (
    <>
      <Navbar />
      <main className="page-shell container">
        <section className="page-title">
          <p className="eyebrow">Elenco oficial</p>
          <h1>Participantes</h1>
          <p>
            Esta página foi preparada para receber os cards oficiais dos personagens do seu RPG.
          </p>
        </section>

        <section className="participants-grid">
          {participants.map((person) => (
            <article className="participant-card" key={person.id}>
              <div className="participant-photo">
                <span>{person.badge}</span>
              </div>
              <div className="participant-info">
                <span className="status-pill">{person.status}</span>
                <h2>{person.name}</h2>
                <p className="archetype">{person.archetype}</p>
                <blockquote>“{person.quote}”</blockquote>
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
