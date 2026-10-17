
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Blogify ✍️</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/posts">Read Posts</Link>
      </div>
    </nav>
  );
}

export default Navbar;
