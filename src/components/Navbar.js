import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
<<<<<<< HEAD
      <Link to="/" className="logo">
        Skyline
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/add">Add City</Link>
        </li>
=======
      {/* App logo/name - links to dashboard */}
      <Link className="navbar-logo" to="/">Skyline</Link>

      {/* Navigation links */}
      <ul className="navbar-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/add">Add City</Link></li>
>>>>>>> 8801e2660a659c79ccccad9f39620bfd3300cb1f
      </ul>
    </nav>
  );
}

export default Navbar;