
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentCard from '../components/CommentCard';

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPostDetails() {
      setLoading(true);
      setError('');

      try {
        const [postResponse, commentsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        ]);

        if (!postResponse.ok || !commentsResponse.ok) {
          throw new Error('Failed to load post details');
        }

        const postData = await postResponse.json();
        const commentsData = await commentsResponse.json();

        if (!postData.id) {
          throw new Error('Post not found');
        }

        setPost(postData);
        setComments(commentsData);
      } catch {
        setError('Unable to load this post. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchPostDetails();
  }, [id]);

  if (loading) {
    return <p className="message">Loading post...</p>;
  }

  if (error) {
    return (
      <main className="container">
        <p className="message">{error}</p>
        <Link to="/posts">Back to posts</Link>
      </main>
    );
  }

  return (
    <main className="container detail-page">
      <Link to="/posts" className="back-link">
        ← Back to posts
      </Link>

      <article className="full-post">
        <p className="post-number">POST #{post.id}</p>
        <h1>{post.title}</h1>
        <p>{post.body}</p>

        <Link to={`/users/${post.userId}`} className="author-link">
          View author
        </Link>
      </article>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </section>
    </main>
  );
}

export default PostDetails;
