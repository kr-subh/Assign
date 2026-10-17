
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails';
import NotFound from './pages/NotFound';
import Author from './pages/Author';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/users/:id" element={<Author />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
