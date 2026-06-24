import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { client, postsQuery } from "../sanity";

function formatDate(date) {
  if (!date) return "Sem data";

  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getExcerpt(post) {
  if (post.excerpt) return post.excerpt;

  const firstTextBlock = post.body?.find((block) => block._type === "block");
  const text = firstTextBlock?.children?.map((child) => child.text).join(" ");

  if (!text) return "Clique para ler a publicação completa.";

  return text.length > 150 ? `${text.slice(0, 150)}...` : text;
}

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(postsQuery)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Últimas atualizações</p>
            <h2>Notícias do acampamento</h2>
            <p>
              Aqui aparecem os posts publicados no painel do Sanity. 
            </p>
          </div>

          {loading && <p className="loading-message">Carregando posts...</p>}

          {!loading && posts.length === 0 && (
            <div className="empty-state">
              <div>📝</div>
              <h2>Nenhum post publicado ainda</h2>
              <p>
                Publique o primeiro post no painel do Sanity para ele aparecer aqui.
              </p>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="posts-grid">
              {posts.map((post, index) => (
                <article
                  className={`post-card ${index === 0 ? "featured" : ""}`}
                  key={post._id}
                >
                  <div className="post-image">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.title} />
                    ) : (
                      <span>🏕️</span>
                    )}
                  </div>

                  <div className="post-content">
                    <div className="post-meta">
                      <span>{post.categories?.[0] || "Blog"}</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>

                    <h3>{post.title}</h3>
                    <p>{getExcerpt(post)}</p>

                    <Link
                      className="read-more"
                      to={`/post/${post.slug?.current}`}
                    >
                      Ler mais
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container two-columns">
          <div className="panel">
            <p className="eyebrow">Enquete</p>
            <h2>Quem é seu favorito?</h2>
            <p>
              Essa área depois pode virar votação real. Por enquanto, ela fica
              como destaque visual da temporada.
            </p>

            <div className="fake-poll">
              <span>Participante 01</span>
              <div>
                <i style={{ width: "72%" }}></i>
              </div>

              <span>Participante 08</span>
              <div>
                <i style={{ width: "51%" }}></i>
              </div>

              <span>Participante 15</span>
              <div>
                <i style={{ width: "36%" }}></i>
              </div>
            </div>
          </div>

          <div className="panel notice-panel">
            <p className="eyebrow">Mural da produção</p>
            <h2>Recados rápidos</h2>

            <ul>
              <li>Posts agora vêm direto do Sanity.</li>
              <li>Seu namorado pode publicar sem mexer no código.</li>
              <li>Você continua cuidando do visual pelo VS Code.</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;