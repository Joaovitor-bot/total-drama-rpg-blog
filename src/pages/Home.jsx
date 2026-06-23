import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import { posts } from "../data";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <main>
        <section className="section container">
          <div className="section-heading">
            <p className="eyebrow">Últimas atualizações</p>
            <h2>Notícias do acampamento</h2>
            <p>
              Uma área para publicar revelações, provas, confusões, rankings e recados oficiais da produção.
            </p>
          </div>

          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section className="section container two-columns">
          <article className="panel poll-panel">
            <p className="eyebrow">Enquete</p>
            <h2>Quem é seu favorito?</h2>
            <p>
              Use esta área para colocar a votação da semana, igual ao clima do Blogger, só que com visual mais moderno.
            </p>
            <div className="fake-poll">
              <span>Participante 01</span>
              <div><i style={{ width: "72%" }} /></div>
              <span>Participante 08</span>
              <div><i style={{ width: "54%" }} /></div>
              <span>Participante 15</span>
              <div><i style={{ width: "41%" }} /></div>
            </div>
          </article>

          <article className="panel notice-panel">
            <p className="eyebrow">Mural da produção</p>
            <h2>Recados rápidos</h2>
            <ul>
              <li>Atualize os nomes reais dos participantes no arquivo <code>src/data.js</code>.</li>
              <li>Coloque imagens dos personagens quando os cards estiverem prontos.</li>
              <li>Use a página de eliminados para registrar a ordem de saída.</li>
            </ul>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
