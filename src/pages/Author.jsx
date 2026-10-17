
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';

function Author() {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAuthor() {
      setLoading(true);
      setError('');

      try {
        const [userResponse, postsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
          fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        ]);

        if (!userResponse.ok || !postsResponse.ok) {
          throw new Error('Failed to load author');
        }

        const userData = await userResponse.json();
        const postsData = await postsResponse.json();

        if (!userData.id) {
          throw new Error('Author not found');
        }

        setAuthor(userData);
        setPosts(postsData);
      } catch {
        setError('Unable to load author details.');
      } finally {
        setLoading(false);
      }
    }

    fetchAuthor();
  }, [id]);

  if (loading) {
    return <p className="message">Loading author...</p>;
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
    <main className="container">
      <section className="author-profile">
        <p className="post-number">AUTHOR PROFILE</p>
        <h1>{author.name}</h1>
        <p>Email: {author.email}</p>
        <p>Company: {author.company.name}</p>
      </section>

      <h2>Posts by {author.name}</h2>

      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}

export default Author;
