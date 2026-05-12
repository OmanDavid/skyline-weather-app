import { Link } from 'react-router-dom';

// Navbar component - appears on every page
function Navbar() {
  return (
    <nav>
      {/* App logo/name - links to dashboard */}
      <Link to="/">Skyline</Link>

      {/* Navigation links */}
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/add">Add City</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;