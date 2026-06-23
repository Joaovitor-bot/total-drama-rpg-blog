import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { client, postBySlugQuery, urlFor } from "../sanity";
import Comments from "../components/Comments";

function formatDate(date) {
  if (!date) return "Sem data";

  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getYouTubeId(url) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.replace("/", "");
    }

    if (parsedUrl.pathname.includes("/shorts/")) {
      return parsedUrl.pathname.split("/shorts/")[1]?.split("?")[0];
    }

    if (parsedUrl.pathname.includes("/embed/")) {
      return parsedUrl.pathname.split("/embed/")[1]?.split("?")[0];
    }

    return parsedUrl.searchParams.get("v");
  } catch {
    return null;
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      return (
        <figure className="article-image">
          <img
            src={urlFor(value).width(1200).auto("format").url()}
            alt={value.alt || "Imagem do post"}
          />

          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },

    youtube: ({ value }) => {
      const videoId = getYouTubeId(value.url);

      if (!videoId) return null;

      return (
        <figure className="video-embed">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={value.title || "Vídeo do YouTube"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

          {value.title && <figcaption>{value.title}</figcaption>}
        </figure>
      );
    },
  },

  block: {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2 className="article-heading">{children}</h2>,
    h3: ({ children }) => <h3 className="article-subheading">{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },

  marks: {
    link: ({ children, value }) => {
      return (
        <a href={value.href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    },
  },
};

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
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          </div>
        </article>

        <Comments />
      </main>

      <Footer />
    </>
  );
}

export default Post;