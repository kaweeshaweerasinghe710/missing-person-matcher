import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">MISSING PERSON MATCHER</Link>
      <ul className="navbar-links">
        <li><Link to="/">Missing Persons</Link></li>
        <li><Link to="/report-missing" style={{ color: '#e74c3c', fontWeight: 'bold' }}>+ Report Missing</Link></li>
        <li><Link to="/report-found" style={{ color: '#2ecc71', fontWeight: 'bold' }}> Report Found</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
