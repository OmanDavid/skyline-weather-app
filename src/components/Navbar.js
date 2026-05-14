import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
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
      </ul>
    </nav>
  );
}

export default Navbar;