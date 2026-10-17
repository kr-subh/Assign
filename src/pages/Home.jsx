
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="home">
      <p className="tagline">YOUR DAILY DOSE OF IDEAS</p>

      <h1>Welcome to Blogify ✍️</h1>

      <p>
        Discover interesting stories, explore new ideas,
        and enjoy reading posts from different authors.
      </p>

      <Link to="/posts" className="button">
        Read Posts →
      </Link>
    </main>
  );
}

export default Home;
