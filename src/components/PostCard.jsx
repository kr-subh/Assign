
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <article className="post-card">
      <p className="post-number">POST #{post.id}</p>

      <h2>{post.title}</h2>

      <p>{post.body.slice(0, 80)}...</p>

      <Link to={`/posts/${post.id}`} className="read-link">
        Read full post →
      </Link>

      <p>
        <Link to={`/users/${post.userId}`} className="author-link">
          View author
        </Link>
      </p>
    </article>
  );
}

export default PostCard;
