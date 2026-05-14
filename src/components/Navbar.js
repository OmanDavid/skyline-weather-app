import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      {/* App logo/name - links to dashboard */}
      <Link className="navbar-logo" to="/">Skyline</Link>

      {/* Navigation links */}
      <ul className="navbar-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/add">Add City</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;