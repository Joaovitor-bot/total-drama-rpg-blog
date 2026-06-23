import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <article className={`post-card ${post.featured ? "featured" : ""}`}>
      <div className="post-image" aria-hidden="true">{post.image}</div>
      <div className="post-content">
        <div className="post-meta">
          <span>{post.category}</span>
          <span>{post.date}</span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <Link className="read-more" to={`/post/${post.id}`}>
          Ler matéria completa
        </Link>
      </div>
    </article>
  );
}

export default PostCard;
