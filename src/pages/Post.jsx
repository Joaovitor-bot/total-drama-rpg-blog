import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { posts } from "../data";

function Post() {
  const { id } = useParams();
  const post = posts.find((item) => item.id === id);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="page-shell container">
          <section className="empty-state">
            <div>❓</div>
            <h1>Post não encontrado</h1>
            <p>Esse post ainda não existe ou o endereço foi alterado.</p>
            <Link className="button primary" to="/">Voltar ao início</Link>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="article-shell container">
        <Link className="back-link" to="/">← Voltar para o blog</Link>
        <article className="article-card">
          <div className="article-emoji" aria-hidden="true">{post.image}</div>
          <p className="eyebrow">{post.category} • {post.date}</p>
          <h1>{post.title}</h1>
          <p className="article-lead">{post.excerpt}</p>
          <div className="article-body">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export default Post;
