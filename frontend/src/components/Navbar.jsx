import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">MISSING PERSON MATCHER</Link>
      <ul className="navbar-links">
        <li><Link to="/">Missing Persons</Link></li>
        <li><Link to="/report-missing">+ Report Missing</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
