import { Link } from 'react-router-dom';

// Navbar component - appears on every page
function Navbar() {
  return (
    <nav classname ="navbar">
      <h2 classname="logo">Skyline</h2>

      <div classname="nav-link">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/add">Add City</Link></li>
        </div>
    </nav>
  );
}

export default Navbar;