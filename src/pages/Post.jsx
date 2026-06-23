import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { client, postBySlugQuery } from "../sanity";

function formatDate(date) {
  if (!date) return "Sem data";

  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function Post() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(postBySlugQuery, { slug })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar post:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="container article-shell">
          <p className="loading-message">Carregando post...</p>
        </main>

        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />

        <main className="container article-shell">
          <div className="empty-state">
            <div>❓</div>
            <h1>Post não encontrado</h1>
            <p>Esse post ainda não existe ou o endereço foi alterado.</p>
            <Link className="back-link" to="/">
              Voltar ao início
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container article-shell">
        <Link className="back-link" to="/">
          ← Voltar para o blog
        </Link>

        <article className="article-card">
          {post.imageUrl && (
            <div className="article-cover">
              <img src={post.imageUrl} alt={post.title} />
            </div>
          )}

          <p className="eyebrow">
            {post.categories?.[0] || "Blog"} • {formatDate(post.publishedAt)}
          </p>

          <h1>{post.title}</h1>

          <div className="article-body">
            <PortableText value={post.body} />
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

export default Post;