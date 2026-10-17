
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load posts');
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch(() => setError('Unable to load posts. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="message">Loading posts...</p>;
  }

  if (error) {
    return <p className="message">{error}</p>;
  }

  return (
    <main className="container">
      <h1>Explore Posts</h1>
      <p>Find a story that interests you.</p>

      <input
        type="text"
        placeholder="Search posts by title..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="search-input"
      />

      <div className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </main>
  );
}

export default Posts;
